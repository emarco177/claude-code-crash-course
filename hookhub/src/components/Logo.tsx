interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Using Anthropic brand orange (#d97757) */}
      <div className={`${sizeClasses[size]} rounded-lg bg-[#d97757] flex items-center justify-center`}>
        {/* Custom hook icon that represents both "hook" and "connection" */}
        <svg
          className={`${iconSizeClasses[size]} text-white`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hook shape optimized for the brand */}
          <path
            d="M12 4C9.79086 4 8 5.79086 8 8V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V8C16 5.79086 14.2091 4 12 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 16V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="8"
            r="1.5"
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-semibold text-[var(--foreground)]`}>
          HookHub
        </span>
      )}
    </div>
  );
}
