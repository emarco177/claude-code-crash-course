const HOOK_NAMES_ROW_1 = [
  "auto-format-on-save",
  "pre-commit-lint",
  "slack-on-stop",
  "cost-tracker",
  "audit-bash-commands",
  "block-secrets",
  "desktop-notify",
  "git-auto-stage",
  "pytest-on-write",
];

const HOOK_NAMES_ROW_2 = [
  "eslint-fix",
  "typecheck-guard",
  "prompt-logger",
  "claude-md-sync",
  "redact-pii",
  "open-pr-on-task",
  "playwright-screenshot",
  "bun-build-watch",
  "release-notes-gen",
];

const HOOK_NAMES_ROW_3 = [
  "auto-format-on-save",
  "block-secrets",
  "cost-tracker",
  "claude-md-sync",
  "desktop-notify",
  "eslint-fix",
  "git-auto-stage",
  "open-pr-on-task",
  "prompt-logger",
];

const ACCENTS = ["#d97757", "#6a9bcc", "#788c5d"] as const;

function Pill({ name, dotColor }: { name: string; dotColor: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)]/70 backdrop-blur-sm border border-[var(--border)] shadow-sm hover:border-[#d97757]/40 transition-colors">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}80` }}
      />
      <span className="text-sm font-mono text-[var(--foreground)] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  names,
  reverse = false,
  duration = 40,
  offset = 0,
}: {
  names: string[];
  reverse?: boolean;
  duration?: number;
  offset?: number;
}) {
  const items = [...names, ...names];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-3 whitespace-nowrap w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((name, i) => (
          <Pill
            key={`${name}-${i}`}
            name={name}
            dotColor={ACCENTS[(i + offset) % ACCENTS.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroMarquee() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Local keyframes & marquee styles */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-marquee-reverse {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background: minimal — soft orange radial glow + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.22),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d97757]/10 border border-[#d97757]/20 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97757] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d97757]" />
          </span>
          <span className="text-sm font-medium text-[#d97757]">
            Community-Powered Automation
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-[1.05] tracking-tight animate-slide-up max-w-4xl">
          Supercharge Claude Code with{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-[#d97757] via-[#e8956e] to-[#d97757] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              powerful hooks
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#d97757]/30"
              viewBox="0 0 200 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8 Q50 2 100 8 T198 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-[var(--slate-light)] mb-10 leading-relaxed animate-slide-up animation-delay-200 max-w-2xl">
          Discover, share, and install community-driven hooks that transform
          your Claude Code workflow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-400">
          <button
            type="button"
            className="group relative px-8 py-4 bg-[#d97757] text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,87,0.4)] hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Hooks
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c4684a] to-[#d97757] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            className="group px-8 py-4 border-2 border-[var(--border)] hover:border-[#d97757]/50 text-[var(--foreground)] font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,87,0.15)] hover:bg-[#d97757]/5"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Submit a Hook
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-[var(--border)] animate-fade-in animation-delay-600 w-full max-w-md">
          <div>
            <div className="text-3xl font-bold text-[var(--foreground)]">
              50+
            </div>
            <div className="text-sm text-[var(--slate-light)]">
              Hooks Available
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--foreground)]">
              1.2k
            </div>
            <div className="text-sm text-[var(--slate-light)]">Downloads</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--foreground)]">
              200+
            </div>
            <div className="text-sm text-[var(--slate-light)]">
              Contributors
            </div>
          </div>
        </div>

        {/* Marquee strip — visually breaks out of parent padding */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 mt-16 animate-fade-in animation-delay-1000">
          {/* Edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-20 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-20 bg-gradient-to-l from-[var(--background)] to-transparent" />

          <div className="flex flex-col gap-4 py-2">
            <MarqueeRow names={HOOK_NAMES_ROW_1} duration={42} offset={0} />
            <MarqueeRow
              names={HOOK_NAMES_ROW_2}
              reverse
              duration={36}
              offset={1}
            />
            <MarqueeRow names={HOOK_NAMES_ROW_3} duration={48} offset={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
