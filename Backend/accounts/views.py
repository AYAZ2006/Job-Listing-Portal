from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import JobSerializer, InternshipSerializer
from django.utils import timezone
from .models import Candidate, Recruiter, EmailOTP, Job, Internship, Notification,Favorite, Application
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
        username = self.request.data.get("username")
        if username:
            recruiter = Recruiter.objects.get(username=username)
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
        application, created = Application.objects.get_or_create(candidate=candidate,job=job)
        if not created:
            return Response({"message": "Already applied", "applied": True})
        return Response({"message": "Applied successfully", "applied": True})

    def delete(self, request):
        email = request.data.get("email")
        job_id = request.data.get("job_id")
        try:
            candidate = Candidate.objects.get(email=email)
            job = Job.objects.get(id=job_id)
        except:
            return Response({"error": "Invalid request"}, status=400)
        Application.objects.filter(candidate=candidate, job=job).delete()
        return Response({"message": "Withdrawn", "applied": False})

class AppliedJobsView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"applied_jobs": []}, status=400)
        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"applied_jobs": []})
        applications = Application.objects.filter(candidate=candidate)
        job_ids = [app.job.id for app in applications]
        return Response({"applied_jobs": job_ids})

