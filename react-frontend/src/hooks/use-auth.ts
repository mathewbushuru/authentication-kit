import { useMemo } from "react";

import { useAppSelector } from "@/hooks/redux";

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const currentToken = useAppSelector((state) => state.auth.token);

  return useMemo(() => ({ user, currentToken }), [user, currentToken]);
};

export default useAuth;
