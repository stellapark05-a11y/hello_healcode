"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { metrics, site } from "@/lib/site-data";

const LOGO_DEPTH_LAYERS = 14;

export function SpaceHero() {
  const heroRef = useRef<HTMLElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const object = objectRef.current;

    if (!hero || !object) {
      return;
    }

    object.dataset.interactive = "ready";

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        object.style.setProperty("--rotate-x", `${-y * 18}deg`);
        object.style.setProperty("--rotate-y", `${x * 36}deg`);
        object.style.setProperty("--shift-x", `${x * 16}px`);
        object.style.setProperty("--shift-y", `${y * 12}px`);
      });
    };

    const resetObject = () => {
      object.style.setProperty("--rotate-x", "0deg");
      object.style.setProperty("--rotate-y", "0deg");
      object.style.setProperty("--shift-x", "0px");
      object.style.setProperty("--shift-y", "0px");
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", resetObject);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", resetObject);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      delete object.dataset.interactive;
    };
  }, []);

  return (
    <section className="space-hero" ref={heroRef}>
      <div className="space-stars" />
      <div className="space-grid" />
      <div className="section-shell relative z-10 flex min-h-screen flex-col justify-between pb-8 pt-6">
        <div className="flex flex-1 flex-col items-center justify-center pt-20 text-center sm:pt-24">
          <p className="space-eyebrow">{site.eyebrow}</p>
          <div className="space-object-stage" aria-hidden="true">
            <div className="space-object" ref={objectRef}>
              {Array.from({ length: LOGO_DEPTH_LAYERS }, (_, index) => (
                <Image
                  alt=""
                  className="space-object-layer space-object-side"
                  height={568}
                  key={index}
                  priority
                  sizes="(max-width: 767px) 88vw, 54rem"
                  src="/healcode-logo-3d-v3.png"
                  style={{ transform: `translateZ(${index * 3}px)` }}
                  width={1254}
                />
              ))}
              <Image
                alt=""
                className="space-object-layer space-object-front"
                height={568}
                priority
                sizes="(max-width: 767px) 88vw, 54rem"
                src="/healcode-logo-3d-v3.png"
                width={1254}
              />
            </div>
          </div>
          <h1 className="mt-12 text-4xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <h2 className="mt-4 text-xl font-medium tracking-tight text-white/90 sm:text-3xl">
            {site.tagline}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            {site.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="space-primary-button" href="#about">
              {site.primaryAction}
            </a>
            <a className="space-secondary-button" href="#activities">
              주요 활동
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
