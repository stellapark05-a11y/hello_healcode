import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-data";

type SiteHeaderProps = {
  tone?: "light" | "dark";
};

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const dark = tone === "dark";

  return (
    <header
      className={`relative z-30 ${dark ? "text-white" : "text-[#181817]"}`}
    >
      <nav className="section-shell flex h-24 items-center justify-between">
        <Link className="flex items-center gap-4" href="/">
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
          {navItems.map((item) => (
            <Link
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                dark
                  ? "text-white/70 hover:bg-white hover:text-[#090b12]"
                  : "text-[#4f4b46] hover:bg-[#181817] hover:text-white"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
