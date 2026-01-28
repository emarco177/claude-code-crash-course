import type { WorkStore } from 'next/dist/server/app-render/work-async-storage.external';
import type { IncrementalCache } from 'next/dist/server/lib/incremental-cache';
import type { RenderOpts } from 'next/dist/server/app-render/types';
import type { FetchMetric } from 'next/dist/server/base-http';
import type { RequestLifecycleOpts } from 'next/dist/server/base-server';
import type { AppSegmentConfig } from 'next/dist/build/segment-config/app/app-segment-config';
import type { CacheLife } from 'next/dist/server/use-cache/cache-life';
export type WorkStoreContext = {
    /**
     * The page that is being rendered. This relates to the path to the page file.
     */
    page: string;
    isPrefetchRequest?: boolean;
    nonce?: string;
    renderOpts: {
        cacheLifeProfiles?: {
            [profile: string]: CacheLife;
        };
        incrementalCache?: IncrementalCache;
        isOnDemandRevalidate?: boolean;
        cacheComponents: boolean;
        fetchCache?: AppSegmentConfig['fetchCache'];
        isPossibleServerAction?: boolean;
        pendingWaitUntil?: Promise<any>;
        experimental: Pick<RenderOpts['experimental'], 'isRoutePPREnabled' | 'authInterrupts'>;
        /**
         * Fetch metrics attached in patch-fetch.ts
         **/
        fetchMetrics?: FetchMetric[];
    } & Pick<RenderOpts, 'assetPrefix' | 'supportsDynamicResponse' | 'shouldWaitOnAllReady' | 'nextExport' | 'isDraftMode' | 'isDebugDynamicAccesses' | 'dev' | 'hasReadableErrorStacks'> & RequestLifecycleOpts & Partial<Pick<RenderOpts, 'reactLoadableManifest'>>;
    /**
     * The build ID of the current build.
     */
    buildId: string;
    previouslyRevalidatedTags: string[];
};
export declare function createWorkStore({ page, renderOpts, isPrefetchRequest, buildId, previouslyRevalidatedTags, nonce, }: WorkStoreContext): WorkStore;
