export default function HeroIsometric() {
  const cards = [
    {
      name: "auto-format-on-save",
      desc: "Runs Prettier when Claude writes a file.",
      event: "PostToolUse",
      downloads: "2.4k",
      color: "#d97757",
      bg: "rgba(217,119,87,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h10M4 17h16" />
        </svg>
      ),
    },
    {
      name: "pre-commit-lint",
      desc: "Validates code before every commit.",
      event: "PreToolUse",
      downloads: "1.8k",
      color: "#6a9bcc",
      bg: "rgba(106,155,204,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      name: "slack-on-stop",
      desc: "Notifies your team when Claude finishes.",
      event: "Stop",
      downloads: "964",
      color: "#788c5d",
      bg: "rgba(120,140,93,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      name: "block-secrets",
      desc: "Blocks any commit containing API keys.",
      event: "PreToolUse",
      downloads: "3.1k",
      color: "#d97757",
      bg: "rgba(217,119,87,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      ),
    },
    {
      name: "cost-tracker",
      desc: "Logs token spend per session.",
      event: "Stop",
      downloads: "742",
      color: "#6a9bcc",
      bg: "rgba(106,155,204,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      name: "pytest-on-write",
      desc: "Runs the test suite after every edit.",
      event: "PostToolUse",
      downloads: "1.3k",
      color: "#788c5d",
      bg: "rgba(120,140,93,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2h6v4l3 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10l3-4z" />
          <path d="M9 14h6" />
        </svg>
      ),
    },
  ];

  // Bottom-up stack: index 0 is the back card, last index is the topmost
  const stackOrder = [...cards].reverse();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Soft orange radial glow behind stack */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse-slow motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,87,0.28) 0%, rgba(217,119,87,0.08) 45%, transparent 75%)",
        }}
      />

      {/* Floating nodes */}
      <div
        aria-hidden
        className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full animate-float"
        style={{ background: "#d97757", boxShadow: "0 0 16px rgba(217,119,87,0.6)" }}
      />
      <div
        aria-hidden
        className="absolute left-[42%] bottom-[14%] h-1.5 w-1.5 rounded-full animate-float-delayed"
        style={{ background: "#6a9bcc", boxShadow: "0 0 14px rgba(106,155,204,0.6)" }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT: content */}
        <div className="flex flex-col animate-slide-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-[var(--foreground)]/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#d97757" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#d97757" }} />
            </span>
            Community-Powered Automation
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05] animate-fade-in-up">
            Supercharge Claude Code with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #d97757 0%, #e89570 60%, #d97757 100%)",
              }}
            >
              powerful hooks
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base md:text-lg text-[var(--slate-light)] leading-relaxed animate-fade-in-up animation-delay-200">
            Discover, share, and install community hooks that automate your
            workflow — formatters, validators, notifiers, and more.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-[#d97757]/25 transition-all hover:shadow-xl hover:shadow-[#d97757]/35 hover:-translate-y-0.5"
              style={{ background: "#d97757" }}
            >
              Browse Hooks
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-6 py-3 text-sm md:text-base font-semibold text-[var(--foreground)] transition-all hover:border-[#d97757]/60 hover:-translate-y-0.5"
            >
              Submit a Hook
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 pt-8 border-t border-[var(--border)] grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-600">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">50+</div>
              <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">Hooks Available</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">1.2k</div>
              <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">Downloads</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">200+</div>
              <div className="mt-1 text-xs md:text-sm text-[var(--slate-light)]">Contributors</div>
            </div>
          </div>
        </div>

        {/* RIGHT: isometric stacked hook cards */}
        <div className="hidden lg:flex relative justify-center items-center min-h-[560px]">
          <div
            className="relative"
            style={{
              perspective: "1400px",
              width: "420px",
              height: "520px",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: "rotateX(8deg) rotateY(-14deg) rotateZ(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {stackOrder.map((card, i) => {
                const total = stackOrder.length;
                const isTop = i === total - 1;
                const offsetY = (total - 1 - i) * 28; // higher index = closer to top of stack visually
                const offsetX = (total - 1 - i) * -14;
                const tilt = -6 + i * 2; // -6, -4, -2, 0, 2, 4
                const z = i * 12;
                const floatClass =
                  i === total - 1
                    ? "animate-float"
                    : i === total - 3
                    ? "animate-float-delayed"
                    : "";

                return (
                  <div
                    key={card.name}
                    className={`absolute left-1/2 top-1/2 ${floatClass}`}
                    style={{
                      transform: `translate(-50%, -50%) translate3d(${offsetX}px, ${-offsetY}px, ${z}px) rotate(${tilt}deg)`,
                      zIndex: i,
                    }}
                  >
                    {/* Glow under topmost card */}
                    {isTop && (
                      <div
                        aria-hidden
                        className="absolute -inset-3 rounded-[1.4rem] blur-2xl opacity-70 animate-pulse-slow motion-reduce:animate-none"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(217,119,87,0.45), rgba(217,119,87,0.0) 70%)",
                        }}
                      />
                    )}

                    <div
                      className={`relative w-[300px] rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 ${
                        isTop ? "shadow-2xl scale-[1.04]" : "shadow-xl"
                      }`}
                      style={{
                        boxShadow: isTop
                          ? "0 30px 60px -15px rgba(217,119,87,0.35), 0 12px 24px -10px rgba(0,0,0,0.25)"
                          : "0 18px 30px -12px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: card.bg, color: card.color }}
                        >
                          {card.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-sm font-semibold text-[var(--foreground)] truncate">
                            {card.name}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--slate-light)] line-clamp-2">
                            {card.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-[var(--slate-light)]">
                          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                          <span className="font-medium">{card.downloads}</span>
                        </div>
                        <span
                          className="rounded-full border px-2 py-0.5 font-mono font-medium"
                          style={{
                            color: card.color,
                            borderColor: card.color + "55",
                            background: card.bg,
                          }}
                        >
                          {card.event}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
