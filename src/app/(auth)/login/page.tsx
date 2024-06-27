import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  // const session = await auth();

  // // this should already be in the middleware check, however we are helping typescript mostly
  // // this is a good check to have every server component for protected pages
  // if (session?.user) {
  //   redirect("/app/dashboard");
  // }

  return (
    <main>
      <H1 className="mb-5 text-center">Log In</H1>

      <AuthForm type="logIn" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
