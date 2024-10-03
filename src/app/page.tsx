import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "../lib/lucia-auth";
import { LogoutProvider } from "./(auth)/_components/logout-provider";

export default async function Home() {
  const { session } = await validateRequest();

  if (!session) redirect("/login");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <LogoutProvider>
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            type="submit"
          >
            خروج
          </button>
        </LogoutProvider>
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="/posts"
        >
          پست ها
        </Link>
      </div>
    </div>
  );
}
