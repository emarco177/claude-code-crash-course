export default function HeroMinimal() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Single restrained decorative element: a faint radial wash behind the headline */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[720px] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.08),transparent_70%)]" />
        {/* Thin top accent rule, the only graphic flourish */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[var(--foreground)] opacity-20" />
      </div>

      {/* Hero Content — single column, centered, editorial */}
      <div className="relative z-10 mx-auto max-w-3xl px-2 text-center">
        {/* Eyebrow: small, uppercase, tracked — not a pill */}
        <p className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-[var(--slate-light)] font-medium mb-10 md:mb-14 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
          <span className="inline-block w-6 h-px align-middle bg-[var(--slate-light)] mr-3" />
          Community-Powered Automation
          <span className="inline-block w-6 h-px align-middle bg-[var(--slate-light)] ml-3" />
        </p>

        {/* Headline — dramatic scale, weight contrast, italic serif focal point */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-[var(--foreground)] mb-8 md:mb-10 leading-[1.02] tracking-tight animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-200">
          <span className="block font-light">Supercharge Claude Code</span>
          <span className="block font-light mt-1 md:mt-2">
            with{" "}
            <em
              className="not-italic font-normal italic font-[family-name:var(--font-lora)] text-[#d97757] tracking-tight"
            >
              powerful hooks
            </em>
          </span>
        </h1>

        {/* Description — measured line length, calm weight */}
        <p className="text-base md:text-lg text-[var(--slate-light)] leading-relaxed max-w-xl mx-auto mb-12 md:mb-14 animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-400">
          Discover, share, and install community-driven hooks that transform your AI development workflow — from automated testing to smart notifications.
        </p>

        {/* CTAs — centered, dominant primary, ghost secondary */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-500">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#d97757] text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-[#c4684a] hover:shadow-[0_8px_24px_-8px_rgba(217,119,87,0.45)]"
          >
            Browse Hooks
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-[var(--foreground)] rounded-full border border-[var(--border)] transition-all duration-300 hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/[0.03]"
          >
            Submit a Hook
          </button>
        </div>

        {/* Stats — clean horizontal strip with vertical dividers, no boxes */}
        <div className="mt-16 md:mt-20 animate-fade-in opacity-0 [animation-fill-mode:forwards] animation-delay-600">
          <div className="mx-auto max-w-md md:max-w-lg flex items-center justify-center divide-x divide-[var(--border)]">
            <div className="flex-1 px-4 md:px-6">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] tabular-nums">
                50<span className="text-[#d97757]">+</span>
              </div>
              <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--slate-light)]">
                Hooks Available
              </div>
            </div>
            <div className="flex-1 px-4 md:px-6">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] tabular-nums">
                1.2<span className="text-[#d97757]">k</span>
              </div>
              <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--slate-light)]">
                Downloads
              </div>
            </div>
            <div className="flex-1 px-4 md:px-6">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] tabular-nums">
                200<span className="text-[#d97757]">+</span>
              </div>
              <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--slate-light)]">
                Contributors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
