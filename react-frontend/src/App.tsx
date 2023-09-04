import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "@/pages/home";
import SignupPage from "@/pages/sign-up";
import SigninPage from "@/pages/sign-in";
import ErrorPage from "@/pages/error";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/sign-in", element: <SigninPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
