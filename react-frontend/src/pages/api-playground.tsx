import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import {
  useGetRootQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "@/api/auth";

function ApiPlaygroundPage() {
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth);

  const {
    data: rootData,
    error,
    isLoading,
    isFetching,
  } = useGetRootQuery(undefined, { pollingInterval: 3000 });
  const { data: allUsersData } = useGetAllUsersQuery();
  const { data: userByIdData } = useGetUserByIdQuery(1);

  return (
    <div className="mx-auto space-y-4 px-4 py-10 sm:px-8">
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant="secondary" onClick={() => navigate("/protected")}>
          Protected page
        </Button>
      </div>
      <hr />

      <h3 className="font-semibold">Current user</h3>
      <pre className="text-sm">{JSON.stringify(currentUser, null, 2)}</pre>
      <hr />

      <h3 className="font-semibold">useGetRootQuery()</h3>
      <pre className="font-mono text-sm">
        {JSON.stringify(rootData, null, 2)}
      </pre>
      <hr />

      <h3 className="font-semibold">useGetUserByIdQuery()</h3>
      <pre className="font-mono text-sm">
        {JSON.stringify(userByIdData, null, 2)}
      </pre>
      <hr />

      <h3 className="font-semibold">useGetAllUsersQuery()</h3>
      <pre className="font-mono text-sm">
        {JSON.stringify(allUsersData, null, 2)}
      </pre>
      <hr />

      <h3 className="font-semibold">useSignupMutation()</h3>
      <pre className="text-sm"></pre>
      <hr />

      <h3 className="font-semibold">useLoginMutation()</h3>
      <pre className="text-sm"></pre>
      <hr />

      <h3 className="font-semibold">useVerifyTokenQuery()</h3>
      <pre className="text-sm"></pre>
      <hr />

      <pre className="font-mono text-sm">
        {error ? (
          <>
            Oh no, there was an error: <br /> {JSON.stringify(error, null, 2)}
          </>
        ) : isLoading ? (
          <>Loading for the first time...</>
        ) : isFetching ? (
          <>Refetching data...</>
        ) : rootData ? (
          <>{rootData.message}</>
        ) : null}
      </pre>
    </div>
  );
}

export default ApiPlaygroundPage;
