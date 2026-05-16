import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="relative z-30">
      <nav className="section-shell flex h-24 items-center justify-between">
        <Link className="flex items-center gap-4" href="/">
          <Image
            alt="healcode sign"
            className="h-9 w-auto"
            height={36}
            src="/healcode-sign.svg"
            width={73}
          />
          <span className="text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center rounded-full border hairline bg-white/75 p-1 shadow-sm shadow-black/[0.03] backdrop-blur md:flex">
          {navItems.map((item) => (
            <Link
              className="rounded-full px-5 py-2 text-sm font-medium text-[#4f4b46] transition hover:bg-[#181817] hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          className="rounded-full bg-[#181817] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#303030]"
          href={`mailto:${site.contactEmail}`}
        >
          문의
        </a>
      </nav>
    </header>
  );
}
