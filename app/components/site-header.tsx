import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#ded8c8] bg-[#f7f5ee]/92 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link className="flex items-center gap-3 font-black tracking-tight" href="/">
          <Image
            alt="healcode sign"
            className="h-10 w-10 rounded-md bg-[#101010] object-contain p-1"
            height={40}
            src="/healcode-sign.svg"
            width={40}
          />
          <span className="text-lg">{site.name}</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-semibold text-[#526058] transition hover:text-[#173b31]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          className="rounded-md bg-[#173b31] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#245a4b]"
          href={`mailto:${site.contactEmail}`}
        >
          문의
        </a>
      </nav>
    </header>
  );
}
