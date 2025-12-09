from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import JobSerializer, InternshipSerializer, ContactSerializer, ResumeUploadSerializer,CandidateProfileSerializer
from django.utils import timezone
from .models import Candidate, Recruiter, EmailOTP, Job, Internship, Notification,Favorite, Application,ResumeUpload,CandidateProfile,ApplicationInternship
from django.conf import settings
class CandidateSendOtpView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        if Candidate.objects.filter(email=email).exists():
            return Response({"error": "Account already exists, please sign in"}, status=status.HTTP_400_BAD_REQUEST)
        otp = get_random_string(length=6, allowed_chars="0123456789")
        EmailOTP.objects.update_or_create(email=email,defaults={"otp": otp, "valid_until": timezone.now() + timezone.timedelta(minutes=10)})
        send_mail(subject="Your OTP Code",message=f"Your OTP is {otp}",from_email=settings.DEFAULT_FROM_EMAIL,recipient_list=[email],)
        return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

class CandidateVerifyOtpView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        username = request.data.get("username")
        password = request.data.get("password", "")
        mobile_number = request.data.get("mobile_number")
        if not all([email, otp, username, mobile_number]):
            return Response({"error": "All fields except password are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            otp_obj = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "OTP not sent"}, status=status.HTTP_400_BAD_REQUEST)
        if not otp_obj.is_valid() or otp_obj.otp != otp:
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
        candidate, created = Candidate.objects.get_or_create(
            email=email,
            defaults={"username": username,"password": password,"mobile_number": mobile_number,})
        otp_obj.delete()
        return Response({"message": "OTP verified, candidate registered successfully"}, status=status.HTTP_200_OK)

class RecruiterSendOtpView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        if Recruiter.objects.filter(email=email).exists():
            return Response({"error": "Account already exists, please sign in"}, status=status.HTTP_400_BAD_REQUEST)
        otp = get_random_string(length=6, allowed_chars="0123456789")
        EmailOTP.objects.update_or_create(email=email,defaults={"otp": otp, "valid_until": timezone.now() + timezone.timedelta(minutes=10)})
        send_mail(subject="Your OTP Code",message=f"Your OTP is {otp}",from_email=settings.DEFAULT_FROM_EMAIL,recipient_list=[email],)
        return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

class RecruiterVerifyOtpView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        username = request.data.get("username")
        password = request.data.get("password", "")
        mobile_number = request.data.get("mobile_number")
        organization_name = request.data.get("organization_name")
        if not all([email, otp, username, mobile_number, organization_name]):
            return Response({"error": "All fields except password are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            otp_obj = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "OTP not sent"}, status=status.HTTP_400_BAD_REQUEST)
        if not otp_obj.is_valid() or otp_obj.otp != otp:
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

        recruiter, created = Recruiter.objects.get_or_create(
            email=email,
            defaults={"username": username,"password": password,"mobile_number": mobile_number,"organization_name": organization_name,})
        otp_obj.delete()
        return Response({"message": "OTP verified, recruiter registered successfully"}, status=status.HTTP_200_OK)

class CandidateLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not all([email, password]):
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        if candidate.password != password:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": f"Welcome {candidate.username}!"}, status=status.HTTP_200_OK)


class RecruiterLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not all([email, password]):
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            recruiter = Recruiter.objects.get(email=email)
        except Recruiter.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if recruiter.password != password:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": f"Welcome {recruiter.username}!"}, status=status.HTTP_200_OK)

User = get_user_model()
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = []
    permission_classes = []

    def perform_create(self, serializer):
        email = self.request.data.get("email")
        if email:
            recruiter = Recruiter.objects.get(email=email)
            job = serializer.save(created_by=recruiter)
        else:
            job = serializer.save()
        candidates = Candidate.objects.all()
        for candidate in candidates:
            Notification.objects.create(candidate=candidate,message=f"New job posted: {job.job_title} at {job.company_name}")

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all().order_by('-created_at')
    serializer_class = InternshipSerializer
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = []
    permission_classes = []
    def perform_create(self, serializer):
        username = self.request.data.get("username")
        if username:
            recruiter = Recruiter.objects.get(username=username)
            internship = serializer.save(created_by=recruiter)
        else:
            internship = serializer.save()
        candidates = Candidate.objects.all()
        for candidate in candidates:
            Notification.objects.create(candidate=candidate,message=f"New internship posted: {internship.internship_title} at {internship.company_name}")



class MyJobsView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        username = request.GET.get("username")
        if not username:
            return Response({"error": "username is required"}, status=status.HTTP_400_BAD_REQUEST)
        qs = Job.objects.filter(created_by__username=username).order_by("-created_at")
        serializer = JobSerializer(qs, many=True)
        return Response(serializer.data)

class MyInternshipsView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        username = request.GET.get("username")
        if not username:
            return Response({"error": "username is required"}, status=status.HTTP_400_BAD_REQUEST)
        qs = Internship.objects.filter(created_by__username=username).order_by("-created_at")
        serializer = InternshipSerializer(qs, many=True)
        return Response(serializer.data)

class CandidateNotificationsView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        email = request.GET.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=status.HTTP_404_NOT_FOUND)
        notifications = candidate.notifications.order_by('-created_at')
        data = [
            {"id": n.id,"message": n.message,"is_read": n.is_read,"created_at": n.created_at} 
            for n in notifications
        ]
        return Response(data, status=status.HTTP_200_OK)
    
    def patch(self, request, id):
        try:
            notification = Notification.objects.get(id=id)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=404)
        is_read = request.data.get("is_read")
        if is_read is not None:
            notification.is_read = is_read
            notification.save()
        return Response({"message": "Updated successfully"})

class ToggleFavoriteView(APIView):
    def post(self, request):
        email = request.data.get("email")
        job_id = request.data.get("job_id")
        internship_id = request.data.get("internship_id")
        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return JsonResponse({"error": "Candidate not found"}, status=404)
        if job_id:
            try:
                job = Job.objects.get(id=job_id)
            except Job.DoesNotExist:
                return JsonResponse({"error": "Job not found"}, status=404)
            favorite, created = Favorite.objects.get_or_create(candidate=candidate, job=job)
        elif internship_id:
            try:
                internship = Internship.objects.get(id=internship_id)
            except Internship.DoesNotExist:
                return JsonResponse({"error": "Internship not found"}, status=404)
            favorite, created = Favorite.objects.get_or_create(candidate=candidate, internship=internship)
        else:
            return JsonResponse({"error": "job_id or internship_id is required"}, status=400)
        if not created:
            favorite.delete()
            return JsonResponse({"favorite": False})
        return JsonResponse({"favorite": True})

class FavoriteListView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"favorite_items": []}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"favorite_items": []})
        favorites = Favorite.objects.filter(candidate=candidate)
        favorite_items = []
        for fav in favorites:
            if fav.job:
                favorite_items.append({"type": "job", "id": fav.job.id})
            elif fav.internship:
                favorite_items.append({"type": "internship", "id": fav.internship.id})
        return Response({"favorite_items": favorite_items})

class ApplyJobView(APIView):
    def post(self, request):
        email = request.data.get("email")
        job_id = request.data.get("job_id")
        check_only = request.data.get("check_only", False)
        if not email or not job_id:
            return Response({"error": "Email and Job ID are required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=404)
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)
        if check_only:
            applied = Application.objects.filter(candidate=candidate, job=job).exists()
            return Response({"applied": applied})
        application, created = Application.objects.get_or_create(candidate=candidate,job=job,defaults={'profile_snapshot': {}})
        if not created:
            return Response({"message": "Already applied", "applied": True})
        try:
            profile = CandidateProfile.objects.get(email=email)
            profile_data = {"name": profile.name,"surname": profile.surname,"mobile": profile.mobile,"gender": profile.gender,"course_start": profile.course_start,"course_end": profile.course_end,"category": profile.category,"qualification": profile.qualification,"career_status": profile.career_status,"linkedin": profile.linkedin,"portfolio": profile.portfolio,"about": profile.about,"skills": profile.skills,"experiences": profile.experiences,"applied_at": timezone.now().isoformat(),}
        except CandidateProfile.DoesNotExist:
            profile_data = {"note": "Profile was empty at time of applying"}
        application.profile_snapshot = profile_data
        application.save()
        return Response({"message": "Applied successfully","applied": True})

    def delete(self, request):
        email = request.data.get("email")
        job_id = request.data.get("job_id")
        if not email or not job_id:
            return Response({"error": "Email and job_id required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
            job = Job.objects.get(id=job_id)
        except (Candidate.DoesNotExist, Job.DoesNotExist):
            return Response({"error": "Invalid request"}, status=400)
        deleted_count, _ = Application.objects.filter(candidate=candidate,job=job).delete()
        if deleted_count > 0:
            return Response({"message": "Application withdrawn and removed permanently", "applied": False})
        else:
            return Response({"message": "No application found to withdraw"}, status=404)
        
class AppliedJobsView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"applied_jobs": []}, status=200)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"applied_jobs": []}, status=200)
        applications = Application.objects.filter(candidate=candidate).select_related('job')
        applied_jobs = []
        for app in applications:
            applied_jobs.append({"job_id": app.job.id,"status": app.status,"applied_at": app.applied_at.isoformat(),"job_title": app.job.job_title,"company_name": app.job.company_name,})
        return Response({"applied_jobs": applied_jobs}, status=200)
    
class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            name = serializer.data['name']
            email = serializer.data['email']
            phone = serializer.data['phone']
            company = serializer.data.get('company', '')
            message = serializer.data['message']
            admin_message = f"""
            New Contact Enquiry:
            Name: {name}
            Email: {email}
            Phone: {phone}
            Company: {company}
            Message:
            {message}
"""
            send_mail(subject=f"New Contact Form Submission from {name}",message=admin_message,from_email="hajrasultana7075@gmail.com",recipient_list=["hajrasultana7075@gmail.com"],fail_silently=False,)
            send_mail(subject="Thanks for contacting us",
                message=(
                    "Thank you for reaching out to us.\n\n"
                    "We've received your message and our team has started reviewing your inquiry. "
                    "One of our support members will get back to you as soon as possible.\n\n"
                    "In the meantime, feel free to explore our platform for job listings, internships, "
                    "and other opportunities tailored to your needs.\n\n"
                    "Check out https://localhost:5173 while we resolve your request."
                ),from_email="hajrasultana7075@gmail.com",recipient_list=[email],fail_silently=False,)
            return Response({"message": "Message received and email sent"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResumeUploadView(APIView):
    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        return Response(serializer.errors, 400)

class ResumeListView(APIView):
    def get(self, request):
        email = request.query_params.get("email")
        if not email:return Response({"error": "Email required"}, 400)
        resumes = ResumeUpload.objects.filter(email=email).order_by("-uploaded_at")
        serializer = ResumeUploadSerializer(resumes, many=True)
        return Response(serializer.data, 200)

class ResumeDeleteView(APIView):
    def delete(self, request, resume_id):
        resume = get_object_or_404(ResumeUpload, resume_id=resume_id)
        resume.delete()
        return Response({"message": "Resume deleted"}, 200)

class ResumeUpdateView(APIView):
    def put(self, request, resume_id):
        resume = get_object_or_404(ResumeUpload, resume_id=resume_id)
        serializer = ResumeUploadSerializer(resume, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 200)
        return Response(serializer.errors, 400)

class ResumeDownloadView(APIView):
    def get(self, request, resume_id):
        resume = get_object_or_404(ResumeUpload, resume_id=resume_id)
        return Response({"download_url": resume.file.url})

class CandidateProfileView(APIView):
    def get(self, request):
        email = request.GET.get("email")
        try:
            profile = CandidateProfile.objects.get(email=email)
            serializer = CandidateProfileSerializer(profile)
            return Response(serializer.data)
        except CandidateProfile.DoesNotExist:
            return Response({})

    def post(self, request):
        email = request.data.get("email")
        profile, _ = CandidateProfile.objects.get_or_create(email=email)
        serializer = CandidateProfileSerializer(profile,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ChangePasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")
        if new_password != confirm_password:
            return Response({"error": "New passwords do not match"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "User not found"}, status=400)
        if candidate.password != current_password:
            return Response({"error": "Current password is incorrect"}, status=400)
        candidate.password = new_password
        candidate.save()
        return Response({"message": "Password changed successfully!"}, status=200)

class DeleteAccountView(APIView):
    def delete(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
            CandidateProfile.objects.filter(email=email).delete()
            Notification.objects.filter(candidate=candidate).delete()
            Favorite.objects.filter(candidate=candidate).delete()
            Application.objects.filter(candidate=candidate).delete()
            ResumeUpload.objects.filter(email=email).delete()
            candidate.delete()
            return Response({"message": "Account and ALL related data deleted permanently"}, status=200)

        except Candidate.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        except Exception as e:
            return Response({"error": "Something went wrong"}, status=500)

class JobApplicantsView(APIView):
    def post(self, request):
        job_id = request.data.get("job_id")
        recruiter_email = request.data.get("email")
        if not job_id or not recruiter_email:
            return Response({"error": "job_id and email are required"}, status=400)
        try:
            job = Job.objects.get(id=job_id, created_by__email=recruiter_email)
        except Job.DoesNotExist:
            return Response({"error": "Job not found or you don't own this job"}, status=404)
        applications = Application.objects.filter(job=job).select_related('candidate').order_by('-applied_at')
        applicants = []
        for app in applications:
            snapshot = app.profile_snapshot
            applicants.append({"candidate_email": app.candidate.email,"applied_at": app.applied_at.isoformat(),"name": snapshot.get("name", "N/A"),"surname": snapshot.get("surname", ""),"full_name": f"{snapshot.get('name','')} {snapshot.get('surname','')}".strip() or "Name not provided","mobile": snapshot.get("mobile", "N/A"),"gender": snapshot.get("gender", ""),"qualification": snapshot.get("qualification", "N/A"),"linkedin": snapshot.get("linkedin", ""),"portfolio": snapshot.get("portfolio", ""),"about": snapshot.get("about", ""),"skills": snapshot.get("skills", []),"experiences": snapshot.get("experiences", []),"applied_at_formatted": app.applied_at.strftime("%b %d, %Y"),"status": app.status,})
        return Response({"job_title": job.job_title,"company_name": job.company_name,"total_applicants": len(applicants),"applicants": applicants}, status=200)
    
class InternshipApplicantsView(APIView):
    def post(self, request):
        internship_id = request.data.get("internship_id")
        recruiter_email = request.data.get("email")
        if not internship_id or not recruiter_email:
            return Response({"error": "internship_id and email are required"}, status=400)
        try:
            intern = Internship.objects.get(id=internship_id, created_by__email=recruiter_email)
        except Internship.DoesNotExist:
            return Response({"error": "Internship not found or you don't own this internship"}, status=404)
        applications = ApplicationInternship.objects.filter(internship=intern).select_related('candidate').order_by('-applied_at')
        applicants = []
        for app in applications:
            snapshot = app.profile_snapshot
            applicants.append({"candidate_email": app.candidate.email,"applied_at": app.applied_at.isoformat(),"name": snapshot.get("name", "N/A"),"surname": snapshot.get("surname", ""),"full_name": f"{snapshot.get('name','')} {snapshot.get('surname','')}".strip() or "Name not provided","mobile": snapshot.get("mobile", "N/A"),"gender": snapshot.get("gender", ""),"qualification": snapshot.get("qualification", "N/A"),"linkedin": snapshot.get("linkedin", ""),"portfolio": snapshot.get("portfolio", ""),"about": snapshot.get("about", ""),"skills": snapshot.get("skills", []),"experiences": snapshot.get("experiences", []),"applied_at_formatted": app.applied_at.strftime("%b %d, %Y"),"status": app.status})
        return Response({"internship_title": intern.internship_title,"company_name": intern.company_name,"total_applicants": len(applicants),"applicants": applicants}, status=200)

class UpdateStatusView(APIView):
    def post(self, request):
        application_id = request.data.get("application_id")
        new_status = request.data.get("status")
        recruiter_email = request.data.get("recruiter_email")
        if not application_id or not new_status or not recruiter_email:
            return Response({"error": "Missing required fields"}, status=400)
        try:
            email, obj_id, app_type = application_id.split("-", 2)
            if app_type == "job":
                application = Application.objects.get(candidate__email=email,job_id=obj_id,job__created_by__email=recruiter_email)
            elif app_type == "internship":
                application = ApplicationInternship.objects.get(candidate__email=email,internship_id=obj_id,internship__created_by__email=recruiter_email)
            else:
                return Response({"error": "Invalid application type"}, status=400)
            application.status = new_status
            application.save()
            return Response({"success": True})
        except Exception as e:
            return Response({"error": "Not allowed or invalid application"}, status=400)
        
class ApplyInternshipView(APIView):
    def post(self, request):
        email = request.data.get("email")
        internship_id = request.data.get("internship_id")
        check_only = request.data.get("check_only", False)
        if not email or not internship_id:
            return Response({"error": "Email and Internship ID are required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=404)
        try:
            internship = Internship.objects.get(id=internship_id)
        except Internship.DoesNotExist:
            return Response({"error": "Internship not found"}, status=404)
        if check_only:
            applied = ApplicationInternship.objects.filter(candidate=candidate, internship=internship).exists()
            return Response({"applied": applied})
        application, created = ApplicationInternship.objects.get_or_create(candidate=candidate,internship=internship,defaults={'profile_snapshot': {}})
        if not created:
            return Response({"message": "Already applied", "applied": True})
        try:
            profile = CandidateProfile.objects.get(email=email)
            profile_data = {"name": profile.name,"surname": profile.surname,"mobile": profile.mobile,"gender": profile.gender,"course_start": profile.course_start,"course_end": profile.course_end,"category": profile.category,"qualification": profile.qualification,"career_status": profile.career_status,"linkedin": profile.linkedin,"portfolio": profile.portfolio,"about": profile.about,"skills": profile.skills,"experiences": profile.experiences,"applied_at": timezone.now().isoformat(),}
        except CandidateProfile.DoesNotExist:
            profile_data = {"note": "Profile was empty at time of applying"}
        application.profile_snapshot = profile_data
        application.save()
        return Response({"message": "Applied successfully", "applied": True})

    def delete(self, request):
        email = request.data.get("email")
        internship_id = request.data.get("internship_id")
        if not email or not internship_id:
            return Response({"error": "Email and internship_id required"}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
            internship = Internship.objects.get(id=internship_id)
        except (Candidate.DoesNotExist, Internship.DoesNotExist):
            return Response({"error": "Invalid request"}, status=400)
        deleted_count, _ = ApplicationInternship.objects.filter(candidate=candidate, internship=internship).delete()
        if deleted_count > 0:
            return Response({"message": "Application withdrawn and removed permanently", "applied": False})
        else:
            return Response({"message": "No application found to withdraw"}, status=404)

class AppliedInternshipsView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"applied_internships": []}, status=200)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"applied_internships": []}, status=200)
        applications = ApplicationInternship.objects.filter(candidate=candidate).select_related('internship')
        applied_internships = []
        for app in applications:
            applied_internships.append({"internship_id": app.internship.id,"status": app.status,"applied_at": app.applied_at.isoformat(),"internship_title": app.internship.internship_title,"company_name": app.internship.company_name,})
        return Response({"applied_internships": applied_internships}, status=200)
    
class EvaluatedCountView(APIView):
    def get(self, request):
        jobs_count = Application.objects.count()
        internships_count = ApplicationInternship.objects.count()
        total = jobs_count + internships_count
        return Response({"students_evaluated": total})
