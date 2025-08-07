import { Hook, HookCategory } from '@/types/hook';

interface HookCardProps {
  hook: Hook;
}

const categoryColors: Record<string, string> = {
  [HookCategory.MONITORING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [HookCategory.SECURITY]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [HookCategory.WORKFLOW]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [HookCategory.TESTING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [HookCategory.INTEGRATION]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [HookCategory.UTILITY]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  [HookCategory.LEARNING]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  [HookCategory.TEAM]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
          {hook.name}
        </h3>
        {hook.featured && (
          <span className="flex-shrink-0 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[hook.category]}`}>
          {hook.category}
        </span>
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${languageColors[hook.language] || 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{hook.language}</span>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {hook.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          by {hook.author}
        </span>
        {hook.stars && (
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400">{hook.stars}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {hook.hookTypes.map((type) => (
          <span
            key={type}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
          >
            {type}
          </span>
        ))}
      </div>
      
      <a
        href={hook.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 w-full justify-center"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}