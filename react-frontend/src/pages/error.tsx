import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  let content: React.ReactNode;

  if (isRouteErrorResponse(error)) {
    content = error.statusText || error.status;
  } else if (error instanceof Error) {
    content = error.message;
  } else {
    content = "Sorry an expected error has occurred"
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center space-y-4 px-8 py-14">
      <h1>Oops!</h1>
      <pre className="text-sm">{content}</pre>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>Go back</Button>
        <Button onClick={() => navigate("/")}> Go home</Button>
      </div>
    </div>
  );
}

export default ErrorPage;
