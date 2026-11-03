import Link from "next/link";
import LoginForm from "../_components/loginForm";
export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-md border rounded-lg p-8 shadow-lg space-y-4">
          {/* generic text */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">welcome back!</h1>
            <p className="text-gray-500">
              enter your credential to access your account
            </p>
          </div>
          {/* form */}
          <LoginForm></LoginForm>
          {/* Signup Link/Button */}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
