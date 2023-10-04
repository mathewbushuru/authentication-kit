import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import HomePage from "@/pages/home";
import SignupPage from "@/pages/sign-up";
import SigninPage from "@/pages/sign-in";
import ApiPlaygroundPage from "@/pages/api-playground";
import ProtectedPage from "@/pages/protected";
import ErrorPage from "@/pages/error";

import { Toaster } from "@/components/toast-provider";
import useAuth from "@/hooks/use-auth";
import { useAppDispatch } from "@/hooks/redux";
import { useVerifyTokenQuery } from "@/api/auth";
import { setCredentials } from "@/store/features/auth-slice";
import { store } from "@/store/store";

const publicRoutes = [
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/sign-in", element: <SigninPage /> },
  { path: "/api-playground", element: <ApiPlaygroundPage /> },
];

const protectedRoutes = [{ path: "/protected", element: <ProtectedPage /> }];

const publicRouter = createBrowserRouter(publicRoutes);

const protectedRouter = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);

function AppRouter() {
  const { user, currentToken } = useAuth();
  const router = user ? protectedRouter : publicRouter;

  // fetch user data if stored token is valid
  const dispatch = useAppDispatch();
  const { data: userData } = useVerifyTokenQuery();
  useEffect(() => {
    if (userData && currentToken) {
      dispatch(setCredentials({ user: userData, token: currentToken }));
    }
  }, [!!userData]);

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
