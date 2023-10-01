import { useMemo } from "react";

import { useAppSelector } from "@/hooks/redux";

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(() => ({ user }), [user]);
};

export default useAuth;
