import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import App from "./App";
import { ExamList, HistoryList } from "./Exam";

const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/exam",
        element: <ExamList />,
      },
      {
        path: "/history",
        element: <HistoryList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Login />,
  },
  {
    path: "/updatePwd",
    element: <Login />,
  },
];

const router = createBrowserRouter(routers);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
