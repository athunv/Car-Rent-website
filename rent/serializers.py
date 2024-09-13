from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cars,ContactMessage,Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cars
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Order
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    created_at = serializers.DateField(read_only=True)
    class Meta:
        model = ContactMessage
        fields = '__all__'

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()