import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#5dc9a8] to-[#3a9f7e] min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <Logo className="w-8 h-8 mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">
            Manage your <span className="text-[#5dc9a8]">pet daycare</span> with
            ease
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Use Petcare to easily keep track of pets under your care. Get
            lifetime access for just £299.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#5dc9a8] hover:bg-[#4ab796] text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300"
            >
              <Link href="/signup">Get started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#5dc9a8] text-[#5dc9a8] hover:bg-[#5dc9a8] hover:text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-0">
          <div className="relative w-full max-w-[519px] aspect-[519/472]">
            <Image
              src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
              alt="Preview Petcare"
              fill
              priority
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
