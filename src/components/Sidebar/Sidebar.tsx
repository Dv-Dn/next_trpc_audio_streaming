import { signOut, useSession } from "next-auth/react";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { Divide, ZoomOutArea, Home, Home2, Plus } from "tabler-icons-react";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = memo(() => {
  const { data: session, status } = useSession();
  const router = useRouter();

  function onSignOut() {
    signOut();
    router.push("/sign-in");
  }
  // if (!session) return <div></div>;
  return (
    <div className="sidebar overflow-x-hidden bg-white px-3 shadow-xl transition-transform duration-300 ease-in-out md:block md:w-60 lg:w-60">
      <div className="mt-10 space-y-6 md:space-y-10">
        <div id="profile" className="space-y-3">
          {session?.user?.image && (
            <img
              loading="lazy"
              src={session?.user?.image}
              alt="Avatar user"
              width={64}
              height={64}
              className="mx-auto w-10 rounded-full md:w-16"
            />
          )}

          <div className="flex flex-col items-center">
            <h2 className="text-center text-xs font-medium text-primary md:text-sm">
              {session?.user?.name}
            </h2>
            <p className="text-center text-xs text-gray-500">
              {session?.user?.email}
            </p>
            <button className=" mt-2 text-xs" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>
        <div className="flex rounded-md border-2 border-gray-200 ring-primary focus-within:ring-2">
          <input
            type="text"
            className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
            placeholder="Search"
          />
          <button className="hidden rounded-tr-md rounded-br-md px-2 py-3 md:block">
            <svg
              className="h-4 w-4 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="/">
            <a>
              <SidebarItem text="Home page" icon={Home2} />
            </a>
          </Link>
          {/* <SidebarItem text="QWAE" icon={ZoomOutArea} />
          <SidebarItem text="QWAE" icon={ZoomOutArea} /> */}
          <Link href="/playlist/">
            <a>
              <SidebarItem text="New playlist" icon={Plus} />
            </a>
          </Link>
        </div>
        <div>
          {/* Playlsit -  */}
          {/* <Link href="/playlist/">
            <a>
              <SidebarItem text="Home page" />
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  );
});
