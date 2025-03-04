from django.shortcuts import render
import random
from .models import Chat
from django.http import JsonResponse
# Create your views here.
def chat_view(request):
    return render(request,'index.html')

def get_response(request):
    if request.method == 'POST':
        user_message = request.POST.get('message')
        
        # Define a list of possible bot responses
        bot_responses = [
            "Hello! How can I help you?",
            "I'm not sure about that.",
            "Tell me more.",
            "That's interesting!",
            "I don't know the answer to that."
        ]
        
        # Choose a random response
        bot_response = random.choice(bot_responses)
        
        # Save the chat message to the database
        chat = Chat.objects.create(user_message=user_message, bot_response=bot_response)
        chat.save()
        
        # Return a JSON response to the client
        return JsonResponse({'message': bot_response})