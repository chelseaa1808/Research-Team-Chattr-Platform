import PathConstants from "./PathConstants";
import React from "react";

const About = React.lazy(() => import("../pages/About"));
const Home = React.lazy(() => import("../pages/Home"));
const ChatPage = React.lazy(() => import("../pages/ChatPage"));

const routes = [
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.BASE_CHAT, element: <ChatPage /> },
  { path: PathConstants.NEW_CHAT, element: <ChatPage /> },
  { path: PathConstants.CHAT_PAGE, element: <ChatPage /> },
];

export default routes;
