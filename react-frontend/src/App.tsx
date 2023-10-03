import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import HomePage from "@/pages/home";
import SignupPage from "@/pages/sign-up";
import SigninPage from "@/pages/sign-in";
import ApiPlaygroundPage from "@/pages/api-playground";
import ProtectedPage from "@/pages/protected";
import ErrorPage from "@/pages/error";

import { store } from "@/store/store";
import useAuth from "@/hooks/use-auth";
import { Toaster } from "@/components/toast-provider";

const publicRoutes = [
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/sign-in", element: <SigninPage /> },
  { path: "/api-playground", element: <ApiPlaygroundPage /> },
];

const protectedRoutes = [
  { path: "/protected", element: <ProtectedPage /> },
];

const publicRouter = createBrowserRouter(publicRoutes);

const protectedRouter = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);

function AppRouter() {
  const { user } = useAuth();
  const router = user ? protectedRouter : publicRouter;
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppRouter />
      <Toaster />
    </ReduxProvider>
  );
}
