export default function HeroMosaic() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background: subtle grid pattern + single soft orange radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full opacity-60 blur-3xl pointer-events-none animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,87,0.22) 0%, rgba(217,119,87,0.08) 35%, transparent 70%)",
        }}
      />

      {/* Bento grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-[auto_auto] gap-4 md:gap-5">
        {/* Tile A — Eyebrow + Headline + Description */}
        <div
          className="lg:col-span-3 lg:row-span-1 relative rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm p-8 md:p-10 lg:p-12 overflow-hidden opacity-0 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {/* corner accent */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(217,119,87,0.35), transparent 70%)",
            }}
          />

          <div className="relative">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase border opacity-0 animate-fade-in"
              style={{
                color: "var(--accent)",
                borderColor: "rgba(217,119,87,0.35)",
                background: "rgba(217,119,87,0.08)",
                animationDelay: "0ms",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-slow"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </span>
              Community-Powered Automation
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)]">
              Supercharge Claude Code with{" "}
              <span
                className="relative inline-block bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #d97757 0%, #f0a07f 50%, #d97757 100%)",
                  backgroundSize: "200% 100%",
                }}
              >
                powerful hooks
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--slate-light)] leading-relaxed">
              Discover, share, and ship community-built hooks that extend Claude
              Code with the workflows your team actually needs.
            </p>
          </div>
        </div>

        {/* Tile B — Stat 1: Hooks Available (orange) */}
        <div
          className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg opacity-0 animate-fade-in-up"
          style={{
            animationDelay: "250ms",
            boxShadow: "inset 0 0 0 1px rgba(217,119,87,0.12)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(217,119,87,0.6), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -right-10 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(217,119,87,0.4), transparent 70%)",
            }}
          />

          <div className="relative flex items-start justify-between">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "rgba(217,119,87,0.12)",
                color: "#d97757",
              }}
            >
              {/* hook / link icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#d97757" }}
            >
              Library
            </span>
          </div>

          <div className="relative mt-6">
            <div
              className="text-5xl md:text-6xl font-bold leading-none bg-clip-text text-transparent animate-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #d97757 0%, #f0a07f 50%, #d97757 100%)",
                backgroundSize: "200% 100%",
              }}
            >
              50+
            </div>
            <div className="mt-2 text-sm font-medium text-[var(--foreground)]">
              Hooks Available
            </div>
            <div className="mt-3 flex items-end gap-1 h-6" aria-hidden="true">
              {[40, 65, 50, 80, 55, 95, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `rgba(217,119,87,${0.3 + (h / 100) * 0.6})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tile C — CTAs */}
        <div
          className="lg:col-span-2 lg:row-span-1 relative rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm p-7 md:p-8 overflow-hidden opacity-0 animate-fade-in-up"
          style={{ animationDelay: "350ms" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "linear-gradient(120deg, rgba(217,119,87,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex flex-col h-full justify-between gap-6">
            <div>
              <div
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--slate-light)" }}
              >
                Get Started
              </div>
              <div className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                Pick a hook, or publish your own.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 animate-pulse-glow"
                style={{ background: "var(--accent)" }}
              >
                <span>Browse Hooks</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--light-gray)]"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  background: "transparent",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <span>Submit a Hook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tile D — Stat 2: Downloads (blue) */}
        <div
          className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg opacity-0 animate-fade-in-up"
          style={{
            animationDelay: "450ms",
            boxShadow: "inset 0 0 0 1px rgba(106,155,204,0.14)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(106,155,204,0.6), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(106,155,204,0.4), transparent 70%)",
            }}
          />

          <div className="relative flex items-start justify-between">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "rgba(106,155,204,0.14)",
                color: "#6a9bcc",
              }}
            >
              {/* cloud download icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M12 13v8" />
                <path d="m8 17 4 4 4-4" />
                <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
              </svg>
            </div>
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#6a9bcc" }}
            >
              Reach
            </span>
          </div>

          <div className="relative mt-6">
            <div className="text-5xl md:text-6xl font-bold leading-none text-[var(--foreground)]">
              1.2
              <span style={{ color: "#6a9bcc" }}>k</span>
            </div>
            <div className="mt-2 text-sm font-medium text-[var(--foreground)]">
              Downloads
            </div>
            {/* sparkline */}
            <svg
              viewBox="0 0 100 24"
              className="mt-3 w-full h-6 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="sparkBlue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6a9bcc" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6a9bcc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 18 L15 14 L30 16 L45 9 L60 11 L75 5 L90 7 L100 2"
                fill="none"
                stroke="#6a9bcc"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0 18 L15 14 L30 16 L45 9 L60 11 L75 5 L90 7 L100 2 L100 24 L0 24 Z"
                fill="url(#sparkBlue)"
              />
            </svg>
          </div>
        </div>

        {/* Tile E — Stat 3: Contributors (green) */}
        <div
          className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg opacity-0 animate-fade-in-up"
          style={{
            animationDelay: "550ms",
            boxShadow: "inset 0 0 0 1px rgba(120,140,93,0.16)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(120,140,93,0.6), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(120,140,93,0.4), transparent 70%)",
            }}
          />

          <div className="relative flex items-start justify-between">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "rgba(120,140,93,0.14)",
                color: "#788c5d",
              }}
            >
              {/* users icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#788c5d" }}
            >
              Community
            </span>
          </div>

          <div className="relative mt-6">
            <div className="text-5xl md:text-6xl font-bold leading-none text-[var(--foreground)]">
              200<span style={{ color: "#788c5d" }}>+</span>
            </div>
            <div className="mt-2 text-sm font-medium text-[var(--foreground)]">
              Contributors
            </div>
            {/* avatar dots row */}
            <div className="mt-4 flex items-center">
              <div className="flex -space-x-2">
                {[
                  "rgba(120,140,93,0.95)",
                  "rgba(217,119,87,0.95)",
                  "rgba(106,155,204,0.95)",
                  "rgba(120,140,93,0.7)",
                  "rgba(217,119,87,0.7)",
                ].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block w-6 h-6 rounded-full border-2"
                    style={{
                      background: c,
                      borderColor: "var(--background)",
                    }}
                  />
                ))}
              </div>
              <span
                className="ml-3 text-xs font-medium"
                style={{ color: "var(--slate-light)" }}
              >
                +195 more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
