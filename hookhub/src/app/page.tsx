import HookCard from '@/components/HookCard';
import { Hook } from '@/types/hook';
import hooksData from '@/data/hooks.json';

export default function Home() {
  const hooks: Hook[] = hooksData.hooks as Hook[];
  const featuredHooks = hooks.filter(hook => hook.featured);
  const regularHooks = hooks.filter(hook => !hook.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                HookHub
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover Claude Code Hooks
              </p>
            </div>
            <div className="flex-1 max-w-lg">
              <input
                type="search"
                placeholder="Search hooks..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Claude Code Hooks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Enhance your workflows with community-driven hooks
            </p>
            <button className="px-8 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-full transition-all duration-200 transform hover:scale-105">
              Explore Hooks
            </button>
          </div>
        </section>

        {featuredHooks.length > 0 && (
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Featured Hooks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredHooks.map((hook) => (
                <HookCard key={hook.id} hook={hook} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            All Hooks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularHooks.map((hook) => (
              <HookCard key={hook.id} hook={hook} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
