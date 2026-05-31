"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { metrics, site } from "@/lib/site-data";

export function SpaceHero() {
  const heroRef = useRef<HTMLElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const object = objectRef.current;

    if (!hero || !object) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      object.style.setProperty("--rotate-x", `${-y * 22}deg`);
      object.style.setProperty("--rotate-y", `${x * 28}deg`);
      object.style.setProperty("--shift-x", `${x * 20}px`);
      object.style.setProperty("--shift-y", `${y * 18}px`);
    };

    const resetObject = () => {
      object.style.setProperty("--rotate-x", "0deg");
      object.style.setProperty("--rotate-y", "0deg");
      object.style.setProperty("--shift-x", "0px");
      object.style.setProperty("--shift-y", "0px");
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetObject);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetObject);
    };
  }, []);

  return (
    <section className="space-hero" ref={heroRef}>
      <div className="space-stars" />
      <div className="space-grid" />
      <div className="section-shell relative z-10 flex min-h-screen flex-col justify-between pb-8 pt-6">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="space-eyebrow">{site.eyebrow}</p>
          <div className="space-object-stage" aria-hidden="true">
            <div className="space-object" ref={objectRef}>
              <Image
                alt=""
                className="space-object-image"
                height={810}
                priority
                src="/healcode-object-v2.png"
                width={1440}
              />
            </div>
          </div>
          <h1 className="mt-1 text-5xl font-semibold leading-none text-white sm:text-7xl lg:text-8xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-medium leading-tight text-white/88 sm:text-3xl">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            {site.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="space-primary-button" href="#operations">
              {site.primaryAction}
            </a>
            <a className="space-secondary-button" href="#members">
              구성원 보기
            </a>
            <a className="space-secondary-button" href="/login">
              {site.secondaryAction}
            </a>
          </div>
        </div>

        <div className="space-metrics">
          {metrics.map((item) => (
            <div className="space-metric" key={item.label}>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
