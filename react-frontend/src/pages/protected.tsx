import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";

function ProtectedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="mx-auto grid max-w-lg space-y-4 px-8 py-10">
      <p className="text-center">This page can only be viewed when logged in</p>
      <div className="flex justify-center gap-2">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant="secondary" onClick={() => navigate("/protected")}>
          Protected page
        </Button>
      </div>
      <pre className="text-sm">{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
}

export default ProtectedPage;
