import { useNavigate } from "react-router-dom";

import Signin from "@/components/sign-in";
import { Button } from "@/components/ui/button";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-lg space-y-4 px-8 py-10">
      <p>AuthKit App</p>
      <Signin />
      <Button variant="secondary" onClick={() => navigate("/api-playground")}>
        Visit API playground
      </Button>
    </div>
  );
}

export default HomePage;
