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
from .models import Candidate, Recruiter, EmailOTP, Job, Internship, Notification
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
            Notification.objects.create(candidate=candidate,message=f"New job posted: {internship.job_title} at {internship.company_name}")


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
