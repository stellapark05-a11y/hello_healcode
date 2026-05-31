import { site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-white">
      <div className="section-shell flex flex-col gap-4 py-8 text-sm text-[#6d6a65] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-[#181817]">{site.name}</p>
        <a className="transition hover:text-[#181817]" href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
