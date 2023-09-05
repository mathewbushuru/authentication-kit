import Signup from "@/components/sign-up";

import { useGetRootQuery } from "@/api/auth";

function HomePage() {
  const { data, error, isLoading } = useGetRootQuery(null);

  return (
    <div className="mx-auto max-w-lg space-y-4 px-8 py-10">
      <p>AuthKit App</p>
      <Signup />
      <div className="">
        {error ? (
          <>
            Oh no, there was an error: <br /> {JSON.stringify(error)}
          </>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <p> {data.message}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
