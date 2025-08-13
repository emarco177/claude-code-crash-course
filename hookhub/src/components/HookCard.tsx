import { Hook, HookCategory } from '@/types/hook';

interface HookCardProps {
  hook: Hook;
}

const categoryColors: Record<string, string> = {
  [HookCategory.MONITORING]: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  [HookCategory.SECURITY]: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  [HookCategory.WORKFLOW]: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  [HookCategory.TESTING]: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  [HookCategory.INTEGRATION]: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  [HookCategory.UTILITY]: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800',
  [HookCategory.LEARNING]: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
  [HookCategory.TEAM]: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800',
};

const languageColors: Record<string, string> = {
  'Python': 'bg-yellow-500',
  'JavaScript': 'bg-yellow-400',
  'TypeScript': 'bg-blue-500',
  'PHP': 'bg-indigo-600',
  'Go': 'bg-cyan-500',
};

export default function HookCard({ hook }: HookCardProps) {
  return (
    <div className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 hover:border-slate-300/80 dark:hover:border-slate-600/80">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-tight">
          {hook.name}
        </h3>
        {hook.featured && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </div>
        )}
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
        {hook.description}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <span className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border ${categoryColors[hook.category]}`}>
          {hook.category}
        </span>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${languageColors[hook.language] || 'bg-slate-400'}`}></div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{hook.language}</span>
        </div>
      </div>

      {hook.hookTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {hook.hookTypes.map((type) => (
            <span
              key={type}
              className="text-xs bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {hook.author}
          </span>
          {hook.stars && (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{hook.stars}</span>
            </div>
          )}
        </div>
        
        <a
          href={hook.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 px-4 py-2.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-200 shadow-sm hover:shadow-md group-hover:scale-105"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}