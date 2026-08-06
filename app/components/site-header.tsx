import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-data";
import { getCurrentUser, isManager } from "@/lib/auth";

type SiteHeaderProps = {
  tone?: "light" | "dark";
};

export async function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const dark = tone === "dark";
  const user = await getCurrentUser();
  const accountItems = user
    ? [
        { label: "My Page", href: "/dashboard" },
        ...(isManager(user) ? [{ label: "Manager", href: "/manager" }] : []),
      ]
    : [{ label: "Member Login", href: "/login" }];
  const accountClassName = `whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
    dark
      ? "text-white/70 hover:bg-white hover:text-[#090b12]"
      : "text-[#596579] hover:bg-[#111827] hover:text-white"
  }`;

  return (
    <header
      className={`relative z-30 ${dark ? "text-white" : "text-[#111827]"}`}
    >
      <nav className="section-shell grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-4 sm:gap-x-5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link className="flex w-fit items-center gap-4" href="/">
          <Image
            alt="healcode sign"
            className="h-9 w-auto"
            height={36}
            src="/healcode-sign.svg"
            width={73}
          />
          <span className="hidden text-lg font-semibold tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <div
          className={`relative isolate col-span-2 row-start-2 max-w-full justify-self-stretch drop-shadow-sm xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:justify-self-center ${
            dark ? "drop-shadow-[0_12px_18px_rgba(0,0,0,0.22)]" : ""
          }`}
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 600 64"
          >
            <path
              d="M44 5H556C578 5 594 13 594 23C594 29 584 30 584 32C584 34 594 35 594 41C594 51 578 59 556 59H44C22 59 6 51 6 41C6 35 16 34 16 32C16 30 6 29 6 23C6 13 22 5 44 5Z"
              fill={dark ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.86)"}
              stroke={dark ? "rgba(255,255,255,0.22)" : "rgba(148,163,184,0.58)"}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="min-w-0 overflow-x-auto xl:overflow-visible">
            <div className="mx-auto flex w-max min-w-full items-center justify-center px-7 py-2 text-center sm:px-10">
              {navItems.map((item) => (
                <Link
                  className={accountClassName}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="col-start-2 row-start-1 flex min-w-0 items-center justify-self-end xl:col-start-3">
          {accountItems.map((item) => (
            <Link className={accountClassName} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          {user ? (
            <form action="/api/auth/logout" method="post">
              <button className={accountClassName} type="submit">
                Logout
              </button>
            </form>
          ) : null}
        </div>

      </nav>
    </header>
  );
}
