import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  useGetRootQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "@/api/auth";

function ApiPlaygroundPage() {
  const navigate = useNavigate();

  const { data: rootData, error, isLoading } = useGetRootQuery(null);
  const { data: allUsersData } = useGetAllUsersQuery(null);
  const { data: userByIdData } = useGetUserByIdQuery(1);

  return (
    <div className="mx-auto space-y-4 px-4 py-10 sm:px-8">
      <Button variant="secondary" onClick={() => navigate("/")}>
        Home
      </Button>
      <hr />

      <h3 className="font-semibold">useGetAllUsersQuery()</h3>
      <pre className="font-mono text-sm">
        {JSON.stringify(allUsersData, null, 2)}
      </pre>
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

      <pre className="font-mono text-sm">
        {error ? (
          <>
            Oh no, there was an error: <br /> {JSON.stringify(error, null, 2)}
          </>
        ) : isLoading ? (
          <>Loading...</>
        ) : rootData ? (
          <>{rootData.message}</>
        ) : null}
      </pre>
    </div>
  );
}

export default ApiPlaygroundPage;
