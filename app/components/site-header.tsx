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
        { label: "my page", href: "/dashboard" },
        ...(isManager(user) ? [{ label: "manager", href: "/manager" }] : []),
      ]
    : [{ label: "member login", href: "/login" }];
  const accountClassName = `rounded-full px-5 py-2 text-sm font-medium transition ${
    dark
      ? "text-white/70 hover:bg-white hover:text-[#090b12]"
      : "text-[#596579] hover:bg-[#111827] hover:text-white"
  }`;

  return (
    <header
      className={`relative z-30 ${dark ? "text-white" : "text-[#111827]"}`}
    >
      <nav className="section-shell grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-5 py-4">
        <Link className="flex w-fit items-center gap-4" href="/">
          <Image
            alt="healcode sign"
            className="h-9 w-auto"
            height={36}
            src="/healcode-sign.svg"
            width={73}
          />
          <span className="text-lg font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <div
          className={`hidden items-center justify-self-center rounded-full border p-1 shadow-sm backdrop-blur lg:flex ${
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

        <div className="flex items-center justify-self-end">
          {accountItems.map((item) => (
            <Link className={accountClassName} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          {user ? (
            <form action="/api/auth/logout" method="post">
              <button className={accountClassName} type="submit">
                logout
              </button>
            </form>
          ) : null}
        </div>

      </nav>
    </header>
  );
}
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
        { label: "my page", href: "/dashboard" },
        ...(isManager(user) ? [{ label: "manager", href: "/manager" }] : []),
      ]
    : [{ label: "members", href: "/login" }];
  const headerItems = [...navItems, ...accountItems];
  const accountClassName = `rounded-full px-5 py-2 text-sm font-medium transition ${
    dark
      ? "text-white/70 hover:bg-white hover:text-[#090b12]"
      : "text-[#596579] hover:bg-[#111827] hover:text-white"
  }`;

  return (
    <header
      className={`relative z-30 ${dark ? "text-white" : "text-[#111827]"}`}
    >
      <nav className="section-shell grid h-24 grid-cols-[1fr_auto_1fr] items-center">
        <Link className="flex w-fit items-center gap-4 justify-self-start" href="/">
          <Image
            alt="healcode sign"
            className="h-9 w-auto"
            height={36}
            src="/healcode-sign.svg"
            width={73}
          />
          <span className="text-lg font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <div
          className={`hidden items-center rounded-full border p-1 shadow-sm backdrop-blur md:flex ${
            dark
              ? "border-white/15 bg-white/8 shadow-black/20"
              : "hairline bg-white/75 shadow-black/[0.03]"
          }`}
        >
          {headerItems.map((item) => (
            <Link
              className={accountClassName}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <form action="/api/auth/logout" method="post">
              <button className={accountClassName} type="submit">
                logout
              </button>
            </form>
          ) : null}
        </div>

        <div aria-hidden="true" />
      </nav>
    </header>
  );
}

