import { Hook } from '@/types/hook';

interface HookCardProps {
  hook: Hook;
}

const languageDot: Record<string, string> = {
  'Python': 'bg-yellow-400',
  'JavaScript': 'bg-yellow-300',
  'TypeScript': 'bg-blue-400',
  'PHP': 'bg-indigo-400',
  'Go': 'bg-cyan-400',
};

export default function HookCard({ hook }: HookCardProps) {
  return (
    <div className={`
      group relative flex flex-col bg-white dark:bg-gray-900
      rounded-2xl border border-gray-100 dark:border-gray-800
      p-6 gap-4
      shadow-sm hover:shadow-xl hover:-translate-y-0.5
      transition-all duration-300 ease-out
      ${hook.featured ? 'ring-1 ring-amber-300 dark:ring-amber-500/50' : ''}
    `}>

      {hook.featured && (
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-1">
          {hook.name}
        </h3>
        {hook.featured && (
          <span className="flex-shrink-0 text-[10px] font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
            Featured
          </span>
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
        <span className="font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
          {hook.category}
        </span>
        <span className="text-gray-200 dark:text-gray-700">·</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${languageDot[hook.language] || 'bg-gray-400'}`} />
          {hook.language}
        </span>
        {hook.stars != null && (
          <>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {hook.stars}
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
        {hook.description}
      </p>

      {/* Hook type pills */}
      <div className="flex flex-wrap gap-1.5">
        {hook.hookTypes.map((type) => (
          <span
            key={type}
            className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-gray-800">
        <span className="text-xs text-gray-400 dark:text-gray-600">
          {hook.author}
        </span>
        <a
          href={hook.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          GitHub
          <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}