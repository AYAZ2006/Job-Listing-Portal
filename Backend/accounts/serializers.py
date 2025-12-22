from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Job,Internship,Contact,ResumeUpload,CandidateProfile

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user
    

class JobSerializer(serializers.ModelSerializer):
    company_logo = serializers.ImageField(use_url=True)
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ["created_by"]

class InternshipSerializer(serializers.ModelSerializer):
    company_logo = serializers.ImageField(use_url=True)
    class Meta:
        model = Internship
        fields = '__all__'
        read_only_fields = ["created_by"]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'company', 'message']

class ResumeUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)
    class Meta:
        model = ResumeUpload
        fields = ["resume_id", "email", "file", "uploaded_at"]
        extra_kwargs = {"resume_id": {"read_only": True}}

class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = "__all__"

