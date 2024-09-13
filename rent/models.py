from django.db import models
from django.contrib.auth.models import User



# Create your models here.

class Cars(models.Model):
    car_name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=250)
    price = models.PositiveIntegerField()
    car_model = models.CharField(max_length=100)
    image = models.ImageField(upload_to="image")

    def __str__(self):
        return self.car_name


class Order(models.Model):
    car = models.ForeignKey(Cars, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=15)  
    start_date = models.DateField()
    end_date = models.DateField()



class ContactMessage(models.Model):
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=500)
    created_at = models.DateField(auto_now_add=True)
    

