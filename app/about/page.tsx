import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { metrics, principles, site } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#17211c]">
      <SiteHeader />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#245a4b]">
            About
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-tight text-[#10231d] sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#394941]">
            {site.description}
          </p>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {metrics.map((item) => (
              <div
                className="rounded-md border border-[#d3cdbc] bg-white p-5"
                key={item.label}
              >
                <p className="text-2xl font-black text-[#173b31]">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-[#607068]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-[#ded8c8] bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {principles.map((card) => (
            <article
              className="rounded-md border border-[#e1ded2] bg-[#fbfaf5] p-6"
              key={card.title}
            >
              <h2 className="text-xl font-black text-[#173b31]">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#526058]">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
