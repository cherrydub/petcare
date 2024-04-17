import Logo from "@/components/logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5dc9a8] min-h-screen flex items-center justify-center gap-10 flex-col xl:flex-row">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview Petcare"
        width={519}
        height={472}
        priority
        quality={100}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-5 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use Petcare to easily keep track of pets under your care. Get lifetime
          access for £299
        </p>
        <div className="flex">
          <button>Get Started</button>
          <button>Log in</button>
        </div>
      </div>
    </main>
  );
}
