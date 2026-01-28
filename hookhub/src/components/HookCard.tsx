import { Hook, HookCategory } from '@/types/hook';

interface HookCardProps {
  hook: Hook;
}

const categoryStyles: Record<string, string> = {
  [HookCategory.MONITORING]: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  [HookCategory.SECURITY]: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  [HookCategory.WORKFLOW]: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  [HookCategory.TESTING]: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  [HookCategory.INTEGRATION]: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  [HookCategory.UTILITY]: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  [HookCategory.LEARNING]: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  [HookCategory.TEAM]: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
};

export default function HookCard({ hook }: HookCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-1">
      {hook.featured && (
        <div className="absolute -top-2 -right-2 size-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
          <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}

      <header className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[hook.category]}`}>
            {hook.category}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {hook.language}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
          {hook.name}
        </h3>
      </header>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">
        {hook.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {hook.hookTypes.slice(0, 3).map((type) => (
          <span
            key={type}
            className="text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md"
          >
            {type}
          </span>
        ))}
        {hook.hookTypes.length > 3 && (
          <span className="text-xs text-zinc-400 dark:text-zinc-600">
            +{hook.hookTypes.length - 3}
          </span>
        )}
      </div>

      <footer className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-xs text-zinc-500 dark:text-zinc-500">
          {hook.author}
        </span>
        <div className="flex items-center gap-3">
          {hook.stars && (
            <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500">
              <svg className="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {hook.stars}
            </span>
          )}
          <a
            href={hook.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </article>
  );
}