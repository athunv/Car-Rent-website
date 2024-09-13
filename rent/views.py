from django.shortcuts import  get_object_or_404
from rest_framework.viewsets import ModelViewSet
from .models import Cars,Order,ContactMessage
from .serializers import UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .serializers import CarSerializer,OrderSerializer,ContactMessageSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny

from django.utils.crypto import get_random_string
from django.core.cache import cache
from .serializers import ForgotPasswordSerializer
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password




# Create your views here.

class UserCreateView(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class CarView(ModelViewSet):
    queryset = Cars.objects.all()
    serializer_class = CarSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_order(self, request, pk=None):
        car = get_object_or_404(Cars, pk=pk)
        user = request.user if request.user.is_authenticated else None

        data = {
            'car': car.id,
            'user': user.id if user else None,
            'address': request.data.get('address'),
            'email': request.data.get('email'),
            'phone': request.data.get('phone'),
            'start_date': request.data.get('start_date'),
            'end_date': request.data.get('end_date'),
        }

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes=[IsAdminUser]

class ContactMessageView(ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes=[IsAuthenticated]



class AdminCarView(ModelViewSet):
    queryset = Cars.objects.all()
    serializer_class = CarSerializer
    permission_classes=[IsAdminUser]

    @action(detail=True, methods=['put'], url_path='update_car')
    def update_car(self, request, pk=None):
        car = get_object_or_404(Cars, pk=pk)
        serializer = CarSerializer(car, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class AdminMessageView(ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes=[IsAdminUser]

class OrderView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes=[IsAdminUser]

class UserListView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    
class CustomerOrderView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user)


class ForgotPasswordViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ForgotPasswordSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        username = serializer.validated_data.get('username')

        try:
            user = User.objects.get(email=email, username=username)
            reset_code = get_random_string(length=6, allowed_chars='0123456789')

            send_mail(
                'Password Reset Code',
                f'Your password reset code is: {reset_code}',
                'athunv856@gmail.com',
                [email],
                fail_silently=False,
            )

            cache.set(f'password_reset_code_{user.id}', reset_code, timeout=900)

            return Response({'message': 'Password reset code sent to your email.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User with this email and username does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['post']  

    @action(detail=False, methods=['post'])
    def reset_password(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        reset_code = request.data.get('reset_code')
        new_password = request.data.get('new_password')

        try:
            user = User.objects.get(username=username, email=email)
            user_id = user.id
            cached_code = cache.get(f'password_reset_code_{user_id}')

            if cached_code == reset_code:
                user.password = make_password(new_password)
                user.save()

                cache.delete(f'password_reset_code_{user_id}')

                return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid reset code.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username or email.'}, status=status.HTTP_400_BAD_REQUEST)