import type { ResponseCacheEntry, ResponseGenerator, ResponseCacheBase, IncrementalResponseCacheEntry, IncrementalResponseCache } from 'next/dist/server/response-cache/types';
import type { RouteKind } from 'next/dist/server/route-kind';
export * from 'next/dist/server/response-cache/types';
export default class ResponseCache implements ResponseCacheBase {
    private readonly getBatcher;
    private readonly revalidateBatcher;
    private previousCacheItem?;
    private minimal_mode?;
    constructor(minimal_mode: boolean);
    /**
     * Gets the response cache entry for the given key.
     *
     * @param key - The key to get the response cache entry for.
     * @param responseGenerator - The response generator to use to generate the response cache entry.
     * @param context - The context for the get request.
     * @returns The response cache entry.
     */
    get(key: string | null, responseGenerator: ResponseGenerator, context: {
        routeKind: RouteKind;
        isOnDemandRevalidate?: boolean;
        isPrefetch?: boolean;
        incrementalCache: IncrementalResponseCache;
        isRoutePPREnabled?: boolean;
        isFallback?: boolean;
        waitUntil?: (prom: Promise<any>) => void;
    }): Promise<ResponseCacheEntry | null>;
    /**
     * Handles the get request for the response cache.
     *
     * @param key - The key to get the response cache entry for.
     * @param responseGenerator - The response generator to use to generate the response cache entry.
     * @param context - The context for the get request.
     * @param resolve - The resolve function to use to resolve the response cache entry.
     * @returns The response cache entry.
     */
    private handleGet;
    /**
     * Revalidates the cache entry for the given key.
     *
     * @param key - The key to revalidate the cache entry for.
     * @param incrementalCache - The incremental cache to use to revalidate the cache entry.
     * @param isRoutePPREnabled - Whether the route is PPR enabled.
     * @param isFallback - Whether the route is a fallback.
     * @param responseGenerator - The response generator to use to generate the response cache entry.
     * @param previousIncrementalCacheEntry - The previous cache entry to use to revalidate the cache entry.
     * @param hasResolved - Whether the response has been resolved.
     * @returns The revalidated cache entry.
     */
    revalidate(key: string, incrementalCache: IncrementalResponseCache, isRoutePPREnabled: boolean, isFallback: boolean, responseGenerator: ResponseGenerator, previousIncrementalCacheEntry: IncrementalResponseCacheEntry | null, hasResolved: boolean, waitUntil?: (prom: Promise<any>) => void): Promise<IncrementalResponseCacheEntry | null>;
    private handleRevalidate;
}
