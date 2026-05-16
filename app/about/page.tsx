import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { metrics, principles, site } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <p className="eyebrow">About</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
          {site.tagline}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#6d6a65]">{site.description}</p>

        <div className="mt-16 grid gap-3 border-t hairline pt-6 md:grid-cols-3">
          {metrics.map((item) => (
            <div className="flex items-end justify-between gap-6" key={item.label}>
              <p className="text-sm text-[#6d6a65]">{item.label}</p>
              <p className="text-lg font-semibold tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t hairline bg-[#fbfaf7] py-24">
        <div className="section-shell grid gap-0 border-t hairline md:grid-cols-3">
          {principles.map((card) => (
            <article
              className="border-b hairline py-6 md:border-b-0 md:border-l md:px-6"
              key={card.title}
            >
              <h2 className="text-2xl font-medium tracking-tight">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
