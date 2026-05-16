import { site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ded8c8] bg-white px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#526058] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold text-[#173b31]">{site.name}</p>
        <a className="font-semibold hover:text-[#173b31]" href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
