import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import HomePage from "@/pages/home";
import SignupPage from "@/pages/sign-up";
import SigninPage from "@/pages/sign-in";
import ApiPlaygroundPage from "@/pages/api-playground";
import ErrorPage from "@/pages/error";

import { store } from "@/store/store";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/sign-in", element: <SigninPage /> },
  { path: "/api-playground", element: <ApiPlaygroundPage /> },
]);

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
