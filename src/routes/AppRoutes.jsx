import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/layouts";
import { Home } from "@/pages";


export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
