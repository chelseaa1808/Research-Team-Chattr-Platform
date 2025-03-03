import PathConstants from "./PathConstants";
import React from "react";

const About = React.lazy(() => import("../pages/About"));
const Home = React.lazy(() => import("../pages/Home"));
const ChatPage = React.lazy(() => import("../pages/ChatPage"));
const BotPage = React.lazy(() => import("../pages/BotPage"));
const ConversationPage = React.lazy(() => import("../pages/ConversationPage"));
const ChatHistoryPage = React.lazy(() => import("../pages/ChatHistoryPage"));
const Login = React.lazy(() => import("../pages/UserLoginPage"));
const Register = React.lazy(() => import("../pages/UserRegisterPage"));
const UserProfile = React.lazy(() => import("../pages/UserProfilePage"));

const routes = [
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.BASE_CHAT, element: <ChatPage /> },
  { path: PathConstants.NEW_CHAT, element: <ChatPage /> },
  { path: PathConstants.CHAT_PAGE, element: <ChatPage /> },
  { path: PathConstants.BOT_PAGE, element: <BotPage /> },
  { path: PathConstants.CONVERSATION_PAGE, element: <ConversationPage /> },
  { path: PathConstants.CHAT_HISTORY, element: <ChatHistoryPage /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },
  { path: PathConstants.USER_PROFILE, element: <UserProfile /> },
];

export default routes;
