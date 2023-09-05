import { useNavigate } from "react-router-dom";

import Signup from "@/components/sign-up";
import { Button } from "@/components/ui/button";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-lg space-y-4 px-8 py-10">
      <p>AuthKit App</p>
      <Signup />
      <Button variant="secondary" onClick={() => navigate("/api-playground")}>
        Visit API playground
      </Button>
    </div>
  );
}

export default HomePage;
