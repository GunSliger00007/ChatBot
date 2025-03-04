from django.db import models

# Create your models here.
from django.db import models

class Chat(models.Model):
    user_message = models.CharField(max_length=500)
    bot_response = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User: {self.user_message} | Bot: {self.bot_response}"
