export default function HeroSplit() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Restrained Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single soft orange gradient orb behind the terminal */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[42rem] h-[42rem] bg-gradient-to-br from-[#d97757]/20 via-[#d97757]/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />

        {/* Existing grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left column: content stack */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d97757]/10 border border-[#d97757]/20 mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97757] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d97757]"></span>
            </span>
            <span className="text-sm font-medium text-[#d97757]">Community-Powered Automation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-5 leading-[1.05] tracking-tight animate-slide-up">
            <span className="block">Supercharge Claude Code with</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-[#d97757] via-[#e8956e] to-[#d97757] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                powerful hooks
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#d97757]/30" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 8 T198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-[var(--slate-light)] mb-8 leading-relaxed animate-slide-up animation-delay-200">
            Drop-in hooks that fire on every tool call—auto-format on write, run tests after edits, ping Slack on stop.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-400">
            <button className="group relative px-8 py-4 bg-[#d97757] text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,87,0.4)] hover:scale-[1.02]">
              <span className="relative z-10 flex items-center gap-2">
                Browse Hooks
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c4684a] to-[#d97757] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="group px-8 py-4 border-2 border-[var(--border)] hover:border-[#d97757]/50 text-[var(--foreground)] font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,87,0.15)] hover:bg-[#d97757]/5">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Submit a Hook
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)] animate-fade-in animation-delay-600">
            <div>
              <div className="text-3xl font-bold text-[var(--foreground)]">50+</div>
              <div className="text-sm text-[var(--slate-light)]">Hooks Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--foreground)]">1.2k</div>
              <div className="text-sm text-[var(--slate-light)]">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--foreground)]">200+</div>
              <div className="text-sm text-[var(--slate-light)]">Contributors</div>
            </div>
          </div>
        </div>

        {/* Right column: stylized terminal */}
        <div className="relative hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-200">
          {/* Soft glow underneath the terminal card */}
          <div className="absolute inset-8 bg-gradient-to-br from-[#d97757]/15 to-[#6a9bcc]/10 rounded-3xl blur-2xl" />

          {/* Terminal frame */}
          <div className="relative w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[#1a1a18] shadow-2xl shadow-[#d97757]/10 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/30">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs font-mono text-white/40 select-none">~/project — claude-code</span>
            </div>

            {/* Terminal body */}
            <div className="px-5 py-5 font-mono text-[13px] leading-relaxed text-white/85 space-y-1.5">
              {/* Line 1 — command */}
              <div className="flex gap-2 animate-fade-in">
                <span className="text-[#788c5d]">~/project</span>
                <span className="text-[#788c5d]">❯</span>
                <span className="text-white/90">claude</span>
                <span className="text-white/60">edit</span>
                <span className="text-white/40">src/api/users.ts</span>
              </div>

              {/* Line 2 — PreToolUse hook */}
              <div className="flex gap-2 animate-fade-in animation-delay-200">
                <span className="text-white/40">·</span>
                <span className="text-[#6a9bcc]">PreToolUse</span>
                <span className="text-white/50">→</span>
                <span className="text-white/70">Bash</span>
                <span className="text-white/40">intercepted</span>
              </div>

              {/* Line 3 — hook firing */}
              <div className="flex gap-2 animate-fade-in animation-delay-400">
                <span className="text-white/40">·</span>
                <span className="text-[#d97757]">hook</span>
                <span className="text-white/70">guard-prod-writes</span>
                <span className="text-[#788c5d]">✓ allowed</span>
              </div>

              {/* Line 4 — tool ran */}
              <div className="flex gap-2 animate-fade-in animation-delay-500">
                <span className="text-white/40">·</span>
                <span className="text-[#6a9bcc]">Edit</span>
                <span className="text-white/70">applied 2 changes</span>
                <span className="text-white/40">(38ms)</span>
              </div>

              {/* Line 5 — PostToolUse hook formatter */}
              <div className="flex gap-2 animate-fade-in animation-delay-600">
                <span className="text-white/40">·</span>
                <span className="text-[#6a9bcc]">PostToolUse</span>
                <span className="text-white/50">→</span>
                <span className="text-[#d97757]">auto-format-on-write</span>
              </div>

              {/* Line 6 — formatter result */}
              <div className="flex gap-2 animate-fade-in animation-delay-600">
                <span className="text-white/40">·</span>
                <span className="text-[#788c5d]">✓</span>
                <span className="text-white/80">formatted 3 files</span>
                <span className="text-white/40">(124ms)</span>
              </div>

              {/* Line 7 — test runner */}
              <div className="flex gap-2 animate-fade-in animation-delay-1000">
                <span className="text-white/40">·</span>
                <span className="text-[#d97757]">run-tests-on-change</span>
                <span className="text-[#788c5d]">✓ 42 passed</span>
                <span className="text-white/40">(1.2s)</span>
              </div>

              {/* Line 8 — warning */}
              <div className="flex gap-2 animate-fade-in animation-delay-1000">
                <span className="text-white/40">·</span>
                <span className="text-[#d97757]">⚠</span>
                <span className="text-white/70">2 lint warnings suppressed</span>
              </div>

              {/* Line 9 — Stop hook */}
              <div className="flex gap-2 animate-fade-in animation-delay-1500">
                <span className="text-white/40">·</span>
                <span className="text-[#6a9bcc]">Stop</span>
                <span className="text-white/50">→</span>
                <span className="text-[#d97757]">notify-slack</span>
                <span className="text-[#788c5d]">✓ posted</span>
              </div>

              {/* Line 10 — final result */}
              <div className="flex gap-2 animate-fade-in animation-delay-1500">
                <span className="text-[#788c5d]">✓</span>
                <span className="text-white/90">session complete</span>
                <span className="text-white/40">— 4 hooks fired</span>
              </div>

              {/* Line 11 — live prompt with blinking caret */}
              <div className="flex gap-2 items-center pt-2 animate-fade-in animation-delay-2000">
                <span className="text-[#788c5d]">~/project</span>
                <span className="text-[#788c5d]">❯</span>
                <span className="inline-block w-2 h-4 bg-[#d97757] animate-pulse" aria-hidden="true" />
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 py-2 border-t border-white/5 bg-black/40 font-mono text-[11px] text-white/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#788c5d] animate-pulse" />
                hooks active
              </span>
              <span>4 fired · 0 blocked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
