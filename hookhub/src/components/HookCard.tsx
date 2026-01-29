import { Hook, HookCategory } from '@/types/hook';

interface HookCardProps {
  hook: Hook;
}

const categoryStyles: Record<string, string> = {
  [HookCategory.MONITORING]: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
  [HookCategory.SECURITY]: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  [HookCategory.WORKFLOW]: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  [HookCategory.TESTING]: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  [HookCategory.INTEGRATION]: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  [HookCategory.UTILITY]: 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  [HookCategory.LEARNING]: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  [HookCategory.TEAM]: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300',
};

const languageDots: Record<string, string> = {
  'Python': 'bg-[#3572A5]',
  'JavaScript': 'bg-[#f1e05a]',
  'TypeScript': 'bg-[#3178c6]',
  'PHP': 'bg-[#4F5D95]',
  'Go': 'bg-[#00ADD8]',
};

export default function HookCard({ hook }: HookCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50">
      {hook.featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
          Featured
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${categoryStyles[hook.category]}`}>
          {hook.category}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {hook.name}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {hook.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {hook.hookTypes.map((type) => (
          <span
            key={type}
            className="text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-500">{hook.author}</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${languageDots[hook.language] || 'bg-slate-400'}`} />
            <span className="text-xs text-slate-500 dark:text-slate-500">{hook.language}</span>
          </div>
          {hook.stars && (
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="text-xs text-slate-500 dark:text-slate-500">{hook.stars}</span>
            </div>
          )}
        </div>

        <a
          href={hook.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          View →
        </a>
      </div>
    </div>
  );
}