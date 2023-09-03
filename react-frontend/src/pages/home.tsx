import Signup from "@/components/sign-up";

function HomePage() {
  return (
    <div className="mx-auto max-w-lg space-y-4 px-8 py-10">
      <p>AuthKit App</p>
      <Signup />
    </div>
  );
}

export default HomePage;
