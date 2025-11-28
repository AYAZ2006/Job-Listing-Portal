from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Candidate(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50, blank=True)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.email

class Recruiter(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50, blank=True)
    mobile_number = models.CharField(max_length=15)
    organization_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.organization_name} - {self.email}"

class EmailOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    valid_until = models.DateTimeField()

    def is_valid(self):
        from django.utils import timezone
        return timezone.now() < self.valid_until

    def save(self, *args, **kwargs):
        from django.utils import timezone
        from datetime import timedelta
        if not self.valid_until:
            self.valid_until = timezone.now() + timedelta(minutes=10)
        super().save(*args, **kwargs)

class Job(models.Model):
    FULL_TIME = 'Full Time'
    PART_TIME = 'Part Time'
    WORK_TYPE_CHOICES = [(FULL_TIME, 'Full Time'),(PART_TIME, 'Part Time'),]
    OFFICE = 'Office'
    REMOTE = 'Remote'
    HYBRID = 'Hybrid'
    WORK_MODE_CHOICES = [(OFFICE, 'Office'),(REMOTE, 'Remote'),(HYBRID, 'Hybrid'),]
    job_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    company_logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    openings = models.PositiveIntegerField()
    work_type = models.CharField(max_length=20, choices=WORK_TYPE_CHOICES)
    work_mode = models.CharField(max_length=20, choices=WORK_MODE_CHOICES)
    location = models.CharField(max_length=200)
    job_description = models.TextField()
    salary_min = models.PositiveIntegerField()
    salary_max = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Recruiter,on_delete=models.CASCADE,related_name="jobs",null=True,blank=True)
    def __str__(self):
        return f"{self.job_title} at {self.company_name}"
    
class Internship(models.Model):
    FULL_TIME = "Full Time"
    PART_TIME = "Part Time"
    WORK_TYPE_CHOICES = [(FULL_TIME, "Full Time"),(PART_TIME, "Part Time"),]
    OFFICE = "Office"
    REMOTE = "Remote"
    HYBRID = "Hybrid"
    WORK_MODE_CHOICES = [(OFFICE, "Office"),(REMOTE, "Remote"),(HYBRID, "Hybrid"),]
    internship_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    duration_months = models.PositiveIntegerField()
    company_logo = models.ImageField(upload_to="company_logos/", null=True, blank=True)
    openings = models.PositiveIntegerField()
    work_type = models.CharField(max_length=20, choices=WORK_TYPE_CHOICES)
    work_mode = models.CharField(max_length=20, choices=WORK_MODE_CHOICES)
    location = models.CharField(max_length=200)
    internship_description = models.TextField()
    stipend_min = models.PositiveIntegerField()
    stipend_max = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Recruiter,on_delete=models.CASCADE,related_name="internships",null=True,blank=True)
    def __str__(self):
        return f"{self.internship_title} at {self.company_name}"

class Notification(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="notifications")
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.message} for {self.candidate.username}"

class Favorite(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, null=True, blank=True, on_delete=models.CASCADE)
    internship = models.ForeignKey(Internship, null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = [("candidate", "job"),("candidate", "internship"),]


class Application(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="applications")
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    applied_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ("candidate", "job")
    def __str__(self):
        return f"{self.candidate.email} → {self.job.job_title}"