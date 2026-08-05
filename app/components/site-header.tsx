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
          className={`col-span-2 row-start-2 flex max-w-full items-center justify-self-stretch overflow-x-auto rounded-full border p-1 shadow-sm backdrop-blur xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:justify-self-center xl:overflow-visible ${
            dark
              ? "border-white/15 bg-white/8 shadow-black/20"
              : "hairline bg-white/75 shadow-black/[0.03]"
          }`}
        >
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
