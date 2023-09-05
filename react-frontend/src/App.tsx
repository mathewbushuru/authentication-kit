import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "@/pages/home";
import SignupPage from "@/pages/sign-up";
import SigninPage from "@/pages/sign-in";
import ErrorPage from "@/pages/error";

import { store } from "@/store/store";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/sign-in", element: <SigninPage /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
