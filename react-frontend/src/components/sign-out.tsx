import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { clearCredentials } from "@/store/features/auth-slice";

function SignOut() {
  const dispatch = useAppDispatch();
  return (
    <Button variant="destructive" onClick={() => dispatch(clearCredentials())}>
      Sign out
    </Button>
  );
}

export default SignOut;
