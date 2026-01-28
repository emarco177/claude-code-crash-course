import type { RequestData, FetchEventResult } from 'next/dist/server/web/types';
import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { NextFetchEvent } from 'next/dist/server/web/spec-extension/fetch-event';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
export declare class NextRequestHint extends NextRequest {
    sourcePage: string;
    fetchMetrics: FetchEventResult['fetchMetrics'] | undefined;
    constructor(params: {
        init: RequestInit;
        input: Request | string;
        page: string;
    });
    get request(): void;
    respondWith(): void;
    waitUntil(): void;
}
export type AdapterOptions = {
    handler: (req: NextRequestHint, event: NextFetchEvent) => Promise<Response>;
    page: string;
    request: RequestData;
    IncrementalCache?: typeof import('next/dist/server/lib/incremental-cache').IncrementalCache;
    incrementalCacheHandler?: typeof import('next/dist/server/lib/incremental-cache').CacheHandler;
    bypassNextUrl?: boolean;
};
export type EdgeHandler = (opts: {
    request: AdapterOptions['request'];
}) => Promise<FetchEventResult>;
export declare function adapter(params: AdapterOptions): Promise<FetchEventResult>;
