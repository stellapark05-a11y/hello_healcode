import { contributors, site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-white">
      <div className="section-shell grid gap-5 py-8 text-sm text-[#64748b] sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-medium text-[#111827]">{site.name}</p>
          <p className="mt-2 text-xs tracking-wide">
            Contributors · {contributors.join(" · ")}
          </p>
        </div>
        <a className="transition hover:text-[#111827]" href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
