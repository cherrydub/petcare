import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/SignoutButton";

export default async function Account() {
  //auth() for server components
  //useSession() for client components
  const session = await auth();

  // this should already be in the middleware check, however we are helping typescript mostly
  // this is a good check to have every server component for protected pages
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex-center mt-10 h-[500px] flex-col gap-3">
        <p>Logged in as {session.user.email}</p>

        <SignoutButton />
      </ContentBlock>
    </main>
  );
}
