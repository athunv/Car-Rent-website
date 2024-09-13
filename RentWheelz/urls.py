"""
URL configuration for RentWheelz project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from rent.views import UserCreateView,CarView,OrderView,ContactMessageView,AdminCarView,AdminMessageView,UserListView,CustomerOrderView,ForgotPasswordViewSet,ResetPasswordViewSet
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()

router.register('user',UserCreateView,basename='user')
router.register('carview',CarView,basename='carview')
router.register('orderview',OrderView,basename='orderview')
router.register('contactmessageview',ContactMessageView,basename='contactmessageview')
router.register('admincarview',AdminCarView,basename='admincarview')
router.register('adminmessageview',AdminMessageView,basename='adminmessageview')
router.register('userlist',UserListView,basename='userlist'),
router.register('customerorder',CustomerOrderView,basename='customerorder')
router.register('forgot-password', ForgotPasswordViewSet, basename='forgot-password')
router.register('reset-password', ResetPasswordViewSet, basename='reset-password')




urlpatterns = [
    path('admin/', admin.site.urls),
    path('apitoken', views.obtain_auth_token),
    
]+router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
