export default function HeroAurora() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        {/* Base wash */}
        <div className="absolute inset-0 bg-[var(--background)]" />

        {/* Subtle grid pattern, masked at top for continuity */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        {/* Slowly rotating conic gradient mesh */}
        <div
          aria-hidden
          className="absolute -inset-[20%] opacity-30 blur-3xl animate-spin-slow motion-reduce:animate-none bg-[conic-gradient(from_0deg,#d97757,#6a9bcc,#788c5d,#d97757)]"
        />

        {/* Big orange radial blob, top-right */}
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-40 animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle at center, #d97757 0%, rgba(217,119,87,0.4) 35%, transparent 70%)",
          }}
        />

        {/* Big blue radial blob, bottom-left */}
        <div
          aria-hidden
          className="absolute -bottom-40 -left-32 h-[44rem] w-[44rem] rounded-full blur-3xl opacity-40 animate-float"
          style={{
            background:
              "radial-gradient(circle at center, #6a9bcc 0%, rgba(106,155,204,0.35) 35%, transparent 70%)",
          }}
        />

        {/* Big green radial blob, center */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-30 animate-float-delayed"
          style={{
            background:
              "radial-gradient(circle at center, #788c5d 0%, rgba(120,140,93,0.3) 40%, transparent 70%)",
          }}
        />

        {/* Animated gradient sweep accent */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/3 h-64 opacity-20 blur-3xl animate-gradient bg-[linear-gradient(120deg,#d97757,#6a9bcc,#788c5d,#d97757)] bg-[length:300%_300%]"
        />

        {/* Soft vignette to focus the card */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, var(--background) 95%)",
          }}
        />
      </div>

      {/* Foreground glassmorphic card */}
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative animate-fade-in-up">
            {/* Outer glow */}
            <div
              aria-hidden
              className="absolute -inset-px rounded-3xl bg-[linear-gradient(135deg,rgba(217,119,87,0.4),rgba(106,155,204,0.4),rgba(120,140,93,0.4))] opacity-60 blur-xl"
            />

            {/* Card */}
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-2xl shadow-2xl shadow-black/10 overflow-hidden">
              {/* Inner subtle highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)",
                }}
              />

              <div className="relative p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
                {/* Eyebrow / badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-md text-xs font-medium tracking-wide text-[var(--slate-light)] animate-fade-in">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#788c5d] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#788c5d]" />
                  </span>
                  Community-Powered Automation
                </div>

                {/* Headline */}
                <h1 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05] animate-slide-up">
                  Supercharge Claude Code with{" "}
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#d97757,#6a9bcc,#788c5d,#d97757)] bg-[length:300%_300%] animate-gradient">
                      powerful hooks
                    </span>
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--slate-light)] leading-relaxed animate-fade-in animation-delay-200">
                  Discover, share, and install community-built hooks that
                  extend Claude Code into a workflow built around how you ship.
                </p>

                {/* CTAs */}
                <div className="mt-9 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
                  <button
                    type="button"
                    className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#d97757] text-white font-semibold text-sm md:text-base shadow-lg shadow-[#d97757]/30 hover:shadow-xl hover:shadow-[#d97757]/40 hover:bg-[#c96a4a] transition-all duration-300 animate-pulse-glow"
                  >
                    Browse Hooks
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M4 10h12" />
                      <path d="M11 5l5 5-5 5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border)] bg-white/5 backdrop-blur-md text-[var(--foreground)] font-semibold text-sm md:text-base hover:bg-white/10 hover:border-[#6a9bcc]/40 transition-all duration-300"
                  >
                    Submit a Hook
                    <svg
                      className="w-4 h-4 opacity-70"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M10 4v12" />
                      <path d="M4 10h12" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-12 w-full pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 animate-fade-in animation-delay-600">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#d97757] tracking-tight">
                      50+
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">
                      Hooks Available
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:border-l sm:border-r sm:border-white/10">
                    <div className="text-2xl md:text-3xl font-bold text-[#6a9bcc] tracking-tight">
                      1.2k
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">
                      Downloads
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#788c5d] tracking-tight">
                      200+
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">
                      Contributors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
