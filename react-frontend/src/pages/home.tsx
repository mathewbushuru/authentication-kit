import Signup from "@/components/sign-up";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";

function HomePage() {
  const { error, loading, success, userInfo, userJwtToken } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  console.log(error, loading, success, userInfo, userJwtToken);

  return (
    <div className="mx-auto max-w-lg space-y-4 px-8 py-10">
      <p>AuthKit App</p>
      <Signup />
    </div>
  );
}

export default HomePage;
