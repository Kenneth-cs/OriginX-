import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Brand } from "./pages/Brand";

// Admin
import { AdminLayout } from "./admin/AdminLayout";
import { Login } from "./admin/Login";
import { NewsList } from "./admin/NewsList";
import { SettingsEditor } from "./admin/SettingsEditor";
import { NewsEditor } from "./admin/NewsEditor";
import { ContactsList } from "./admin/ContactsList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "news", Component: News },
      { path: "brand", Component: Brand }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/admin/news" replace /> },
      { path: "login", Component: Login },
      { path: "news", Component: NewsList },
      { path: "news/edit/:id", Component: NewsEditor },
      { path: "contacts", Component: ContactsList },
      { path: "settings", Component: SettingsEditor }
    ]
  },
  {
    // Catch-all to handle any unmatched admin routes
    path: "/admin/*",
    element: <Navigate to="/admin/login" replace />
  }
]);