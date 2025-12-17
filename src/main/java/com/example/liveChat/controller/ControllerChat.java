package com.example.liveChat.controller;


import com.example.liveChat.dto.Request;
import com.example.liveChat.dto.Response;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ControllerChat {

    @MessageMapping("/chat/{room}")
    @SendTo("/topic/{room}")
    public Response sendMessage(@DestinationVariable String room, Request request) {
        String content = HtmlUtils.htmlEscape(request.username() + ": " + request.message());
        return new Response(room, content);
    }
}
