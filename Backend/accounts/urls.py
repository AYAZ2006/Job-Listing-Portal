from django.urls import path,include
from .views import CandidateSendOtpView, CandidateVerifyOtpView, RecruiterSendOtpView, RecruiterVerifyOtpView,CandidateLoginView,RecruiterLoginView,JobViewSet,InternshipViewSet,MyInternshipsView,MyJobsView,CandidateNotificationsView,ToggleFavoriteView,FavoriteListView,ApplyJobView,AppliedJobsView,ContactView,ResumeUploadView,ResumeListView,ResumeDeleteView,ResumeDownloadView,ResumeUpdateView,CandidateProfileView,ChangePasswordView,DeleteAccountView,JobApplicantsView,UpdateStatusView,AppliedInternshipsView,ApplyInternshipView,InternshipApplicantsView,EvaluatedCountView
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
    path("candidate/notifications/<int:id>", CandidateNotificationsView.as_view()),
    path("favorite/", ToggleFavoriteView.as_view(), name="favorite-toggle"),
    path("favorite-list/", FavoriteListView.as_view(), name="favorite-toggle"),
    path("apply-job/", ApplyJobView.as_view(), name="apply-job"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("profile/", CandidateProfileView.as_view(), name="profile"),
    path("applied-jobs/", AppliedJobsView.as_view(), name="applied-jobs"),
    path("upload-resume/", ResumeUploadView.as_view(), name="upload-resume"),
    path("view-resume/", ResumeListView.as_view(), name="view-resume"),
    path("<uuid:resume_id>/delete/", ResumeDeleteView.as_view()),
    path("<uuid:resume_id>/update/", ResumeUpdateView.as_view()),
    path("<uuid:resume_id>/download/", ResumeDownloadView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
    path('delete-account/', DeleteAccountView.as_view()),
    path('job-applicants/', JobApplicantsView.as_view()),
    path('internship-applicants/', InternshipApplicantsView.as_view()),
    path('update-status/', UpdateStatusView.as_view()),
    path('apply-internship/', ApplyInternshipView.as_view(), name='apply-internship'),
    path('applied-internships/', AppliedInternshipsView.as_view(), name='applied-internships'),
    path('count/', EvaluatedCountView.as_view(), name='count'),
]
