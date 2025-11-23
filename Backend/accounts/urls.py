from django.urls import path,include
from .views import CandidateSendOtpView, CandidateVerifyOtpView, RecruiterSendOtpView, RecruiterVerifyOtpView,CandidateLoginView,RecruiterLoginView,JobViewSet,InternshipViewSet,MyInternshipsView,MyJobsView
job_list = JobViewSet.as_view({'get': 'list','post': 'create'})
job_detail = JobViewSet.as_view({'get': 'retrieve','put': 'update','patch': 'partial_update','delete': 'destroy'})
internship_list = InternshipViewSet.as_view({'get': 'list','post': 'create'})
insternship_detail = InternshipViewSet.as_view({'get': 'retrieve','put': 'update','patch': 'partial_update','delete': 'destroy'})
urlpatterns = [
    path("candidate/send-otp/", CandidateSendOtpView.as_view()),
    path("candidate/verify-otp/", CandidateVerifyOtpView.as_view()),
    path("recruiter/send-otp/", RecruiterSendOtpView.as_view()),
    path("recruiter/verify-otp/", RecruiterVerifyOtpView.as_view()),
    path('candidate/login/', CandidateLoginView.as_view(), name='candidate-login'),
    path('recruiter/login/', RecruiterLoginView.as_view(), name='recruiter-login'),
    path('jobs/', job_list, name='job-list'),
    path('jobs/<int:pk>/', job_detail, name='job-detail'),
    path('internships/', internship_list, name='intership-list'),
    path('internships/<int:pk>/', insternship_detail, name='internship-detail'),
    path("my-jobs/", MyJobsView.as_view()),
    path("my-internships/", MyInternshipsView.as_view()),
]
