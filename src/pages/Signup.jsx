import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "lucide-react";

export default function Signup() {
  const { register, handleSubmit, errors, loading } = useAuth(true);

  return (
    <>
    <title>Signup - Event Management</title>
    <meta name="description" content="Signup to efficiently manage your events and bookings." />
    <div className="flex min-h-screen h-max w-full overflow-hidden rounded-xl shadow-md">
      {/* design side  */}
      <div className="relative hidden items-center justify-center bg-blue-300 md:flex md:w-[50%]">
        <div className="absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br from-white via-blue-300 to-blue-400"></div>
        <div className="absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br from-white via-blue-300 to-blue-400"></div>
        <div className="absolute -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-blue-300 to-blue-400 transition-all"></div>
        <div className="absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-white via-blue-300 to-blue-400"></div>
        <div className="z-10 space-y-2 text-center">
          <h2 className="text-3xl font-medium text-white/80">Welcome Back</h2>
          <p className="animate-pulse text-sm text-white/60">Please Enter You Information</p>
        </div>
      </div>
      {/* form side  */}
      <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%] dark:bg-zinc-900">
        <h2 className="pb-8 text-center text-3xl font-semibold tracking-tight text-blue-400">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 w-[80%] md:w-[60%] mx-auto">
          <Input
            type="text"
            placeholder="Enter you full name"
            name="name"
            label="Full name"
            {...register("name")}
            error={errors["name"]?.message}
          />
          <Input
            type="email"
            placeholder="Enter you email address"
            name="email"
            label="Email"
            {...register("email")}
            error={errors["email"]?.message}
          />
          <Input
            type="password"
            placeholder="Enter you password"
            name="password"
            label="Password"
            {...register("password")}
            error={errors["password"]?.message}
          />
          <p className="text-[14px] text-gray-400">
            Already have an account? <Link to='/login' className="text-blue-400 ml-1">Login</Link>
          </p>
          <Button
            type="submit"
            variant="default"
            className="uppercase w-[60%]"
            disabled={loading}
          >
            {loading && <Loader className="animate-spin mr-2" />}
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}
