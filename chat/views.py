import json
import logging

from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .chat import send_message
from .models import Bot, ChatPage, Conversation, Message
from .serializers import (
    ChatPageConversationSerializer,
    ChatPageSerializer,
    ConversationSerializer,
    MessageSerializer,
)

logger = logging.getLogger(__name__)


def chat_landing_page(request, slug):
    chat_page = get_object_or_404(ChatPage, slug=slug)

    # Create a new conversation and redirect to the conversation page
    conversation = Conversation()
    conversation.chat_page = chat_page
    # TODO Set up the user information so that logged-in users get chats attached to them
    # TODO Also make it so that a logged-in user who has an existing chat gets redirected
    #  to that rather than starting a new one
    conversation.save()

    return redirect(
        reverse(
            "chat:conversation",
            kwargs={"slug": slug, "conversation_uuid": conversation.uuid},
        )
    )
    # return HttpResponse(f"This is the page for {slug}")


def conversation_page(request, slug, conversation_uuid):
    """Where the magic happens"""
    chat_page = get_object_or_404(ChatPage, slug=slug)
    conversations = Conversation.objects.filter(chat_page=chat_page)
    view_only = True if request.GET.get("view-only", False) else False
    conversation = get_object_or_404(conversations, uuid=conversation_uuid)
    return render(
        request,
        template_name="chat/chat_room.html",
        context={"conversation": conversation, "view_only": view_only},
    )


@api_view(("POST",))
@renderer_classes((JSONRenderer,))
def send_chat_message(request):
    if request.method == "POST":

        body = json.loads(request.body)
        user_message_text = body["message"]
        conversation_uuid = body["conversation_id"]

        conversation = get_object_or_404(Conversation, uuid=conversation_uuid)
        user_message = Message()
        user_message.text = user_message_text
        user_message.conversation = conversation
        user_message.actor = user_message.Actors.USER
        user_message.save()

        # Get the chatbot reply(ies)
        chatbot_reply = send_message(
            conversation.chat_page.bot, conversation, user_message_text
        )
        bot_message = Message()
        bot_message.text = chatbot_reply
        bot_message.conversation = conversation
        bot_message.actor = bot_message.Actors.BOT
        bot_message.save()

        serializer = MessageSerializer(bot_message)
        return Response(serializer.data)
        # return render(
        #     request,
        #     template_name="chat/chat_message.html",
        #     context={"message": bot_message},
        # )



class ChatPageViewSet(viewsets.ModelViewSet):
    queryset = ChatPage.objects.all().prefetch_related("bot", "experimental_condition")
    serializer_class = ChatPageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all().prefetch_related("messages", "chat_page")
    serializer_class = ConversationSerializer


# class ConversationSubClassFieldsMixin(object):
#     def get_queryset(self):
#         return Conversation.objects.select_subclasses()


class GetConversation(APIView):
    def get(self, request, *args, **kwargs):
        conversation = get_object_or_404(Conversation, uuid=kwargs["uuid"])
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)

    queryset = Conversation.objects.all().prefetch_related("messages", "chat_page")
    serializer_class = ConversationSerializer
    lookup_field = "uuid"


class GetChatPage(generics.RetrieveAPIView):
    queryset = ChatPage.objects.all().prefetch_related("bot", "experimental_condition")
    serializer_class = ChatPageSerializer
    lookup_field = "slug"


class NewConversation(APIView):
    def get(self, request, *args, **kwargs):
        chat_page = get_object_or_404(ChatPage, slug=kwargs["slug"])
        conversation = Conversation()
        conversation.chat_page = chat_page
        if uid := request.GET.get("uid"):
            conversation.uid = uid
        conversation.save()
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)


class ListConversations(generics.RetrieveAPIView):
    queryset = ChatPage.objects.all().prefetch_related("conversations")
    serializer_class = ChatPageConversationSerializer  # TODO FIx this so it refers to a serializer that includes conversations
    lookup_field = "slug"
