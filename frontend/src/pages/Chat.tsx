import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";

const chatMessages = [
  {
    role: "user",
    content: "Hello, how are you today?",
  },
  {
    role: "assistant",
    content:
      "I'm an AI assistant, so I don't have feelings, but I'm here and ready to help you with anything you need!",
  },
  {
    role: "user",
    content: "Can you tell me the weather forecast for today?",
  },
  {
    role: "assistant",
    content:
      "Sure! Please provide me with your location so I can look up the weather forecast for you.",
  },
  {
    role: "user",
    content: "I live in New York City.",
  },
  {
    role: "assistant",
    content:
      "In New York City today, the weather forecast is sunny with a high of 75°F (24°C) and a low of 55°F (13°C).",
  },
  {
    role: "user",
    content: "Thank you! Can you also recommend a good restaurant in the city?",
  },
  {
    role: "assistant",
    content:
      "Sure! One highly recommended restaurant in New York City is Le Bernardin, which is known for its excellent seafood and fine dining experience.",
  },
  {
    role: "user",
    content: "That sounds great. What are the operating hours?",
  },
  {
    role: "assistant",
    content:
      "Le Bernardin is typically open for lunch from 12:00 PM to 2:30 PM and for dinner from 5:15 PM to 10:30 PM, Monday through Saturday. They are closed on Sundays.",
  },
];

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 1,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask any question related to anything in the world, But avoid
            to share personal informations
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2 }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat) => (
            <ChatItem role={chat.role} content={chat.content} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
