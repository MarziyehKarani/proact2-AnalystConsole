import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Signout from "../pages/Authentication/Signout"
import Logout from "../pages/Authentication/Logout"
import Unauthorized from "../pages/Unauthorized"

//Studies
import Studies from "../pages/Studies/Index"
//Messages
import Messages from "../pages/Messages/Index"
import MessageDetails from "../pages/Messages/Details"


const userRoutes = [
  { path: "/signout", component: Signout },
  { path: "/unauthorized", component: Unauthorized },
  //Studies
  { path: "/studies", component: Studies },
  //Messages
  { path: "/:id/messages", component: Messages },
  //{ path: "/:studyId/:userId/messages/:id", component: MessageDetails },
  { path: "/:studyId/messages/userId/:userId/messageId/:id", component: MessageDetails },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/studies" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
]

export { userRoutes, authRoutes }