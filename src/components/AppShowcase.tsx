"use client";

import { useEffect, useRef, useState } from "react";
import { SHOWCASE_SCREENS } from "@/components/ShowcaseScreens";

export type ShowcaseStep = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  /** Describes the step's illustrated screen (in `ShowcaseScreens`) for screen readers. */
  alt: string;
};

/**
 * Auto-advancing app tour: a list of steps beside an illustrated phone whose
 * screen (from `ShowcaseScreens`, keyed by step id) crossfades and animates to
 * match the active step. The progress bar's CSS animation is the
 * timer — when it ends we advance — so pausing (hover, focus, off-screen) is just
 * pausing the animation, and reduced-motion users (no animation) don't get
 * auto-advance at all. Once the visitor picks a step themselves, the tour stops
 * advancing. Every step's text stays in the DOM for search engines.
 */
export default function AppShowcase({
  steps,
  className = "",
}: {
  steps: ShowcaseStep[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !held;
  const next = () => setActive((i) => (i + 1) % steps.length);
  const choose = (i: number) => {
    setChosen(true);
    setActive(i);
  };

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 ${className}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <ol className="space-y-2">
        {steps.map((step, i) => {
          const on = i === active;
          return (
            <li
              key={step.id}
              className={`relative rounded-2xl py-5 pl-7 pr-5 transition-colors duration-300 ${
                on ? "bg-white shadow-sm ring-1 ring-zinc-200" : "hover:bg-white/70"
              }`}
            >
              <span aria-hidden className="absolute bottom-5 left-3 top-5 w-[3px] overflow-hidden rounded-full bg-zinc-200">
                {on && (
                  <span
                    key={active}
                    className={`block h-full w-full origin-top bg-rust motion-reduce:animate-none ${
                      chosen ? "" : "animate-showcase-progress"
                    }`}
                    style={{ animationPlayState: playing ? "running" : "paused" }}
                    onAnimationEnd={(e) => e.target === e.currentTarget && next()}
                  />
                )}
              </span>
              <h3>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-expanded={on}
                  aria-controls={`showcase-${step.id}`}
                  className="block w-full text-left"
                >
                  <span className="block text-xs font-semibold uppercase tracking-wider text-rust">
                    {step.eyebrow}
                  </span>
                  <span
                    className={`mt-1 block text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                      on ? "text-ink" : "text-zinc-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </h3>
              <div
                id={`showcase-${step.id}`}
                inert={!on}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">{step.body}</p>
                  <ul className="mt-4 space-y-2">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-700">
                        <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-rust-soft text-rust">
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                            <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="order-first flex flex-col items-center lg:order-none">
        <div className="relative motion-safe:animate-showcase-float">
          <div aria-hidden className="absolute inset-10 rounded-full bg-rust/25 blur-3xl" />
          <div
            role="img"
            aria-label={steps[active].alt}
            className="relative w-[292px] rounded-[46px] bg-ink p-3 shadow-[0_40px_90px_-25px_rgba(10,23,41,0.5)] ring-1 ring-black/5"
          >
            <div className="relative h-[600px] overflow-hidden rounded-[36px] bg-[#f4f2f1]">
              {steps.map((step, i) => {
                const Screen = SHOWCASE_SCREENS[step.id];
                const on = i === active;
                return (
                  <div
                    key={step.id}
                    data-on={on}
                    aria-hidden
                    className={`group absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {Screen && <Screen />}
                  </div>
                );
              })}
              <div aria-hidden className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2 lg:hidden">
          {steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => choose(i)}
              aria-label={`Show ${step.eyebrow}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-rust" : "w-2 bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
