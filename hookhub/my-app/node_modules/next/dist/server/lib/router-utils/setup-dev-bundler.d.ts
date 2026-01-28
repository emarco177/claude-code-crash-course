import type { NextConfigComplete } from 'next/dist/server/config-shared';
import type { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import type { ProxyMatcher } from 'next/dist/build/analysis/get-page-static-info';
import type { RoutesManifest } from 'next/dist/build';
import type { MiddlewareRouteMatch } from 'next/dist/shared/lib/router/utils/middleware-route-matcher';
import type { PropagateToWorkersField } from 'next/dist/server/lib/router-utils/types';
import type { NextJsHotReloaderInterface } from 'next/dist/server/dev/hot-reloader-types';
import type { Telemetry } from 'next/dist/telemetry/storage';
import type { IncomingMessage, ServerResponse } from 'http';
import type { LazyRenderServerInstance } from 'next/dist/server/lib/router-server';
export type SetupOpts = {
    renderServer: LazyRenderServerInstance;
    dir: string;
    turbo?: boolean;
    appDir?: string;
    pagesDir?: string;
    telemetry: Telemetry;
    isCustomServer?: boolean;
    fsChecker: UnwrapPromise<ReturnType<typeof import('next/dist/server/lib/router-utils/filesystem').setupFsCheck>>;
    nextConfig: NextConfigComplete;
    port: number;
    onDevServerCleanup: ((listener: () => Promise<void>) => void) | undefined;
    resetFetch: () => void;
};
export interface DevRoutesManifest {
    version: number;
    caseSensitive: RoutesManifest['caseSensitive'];
    basePath: RoutesManifest['basePath'];
    rewrites: RoutesManifest['rewrites'];
    redirects: RoutesManifest['redirects'];
    headers: RoutesManifest['headers'];
    i18n: RoutesManifest['i18n'];
    skipProxyUrlNormalize: RoutesManifest['skipProxyUrlNormalize'];
}
export type ServerFields = {
    actualMiddlewareFile?: string | undefined;
    actualInstrumentationHookFile?: string | undefined;
    appPathRoutes?: Record<string, string | string[]>;
    middleware?: {
        page: string;
        match: MiddlewareRouteMatch;
        matchers?: ProxyMatcher[];
    } | undefined;
    hasAppNotFound?: boolean;
    interceptionRoutes?: ReturnType<typeof import('next/dist/server/lib/router-utils/filesystem').buildCustomRoute>[];
    setIsrStatus?: (key: string, value: boolean | undefined) => void;
    resetFetch?: () => void;
};
export declare function propagateServerField(opts: SetupOpts, field: PropagateToWorkersField, args: any): Promise<void>;
export declare function setupDevBundler(opts: SetupOpts): Promise<{
    serverFields: ServerFields;
    hotReloader: NextJsHotReloaderInterface;
    requestHandler: (req: IncomingMessage, res: ServerResponse) => Promise<{
        finished: boolean;
    }>;
    logErrorWithOriginalStack: (err: unknown, type?: "unhandledRejection" | "uncaughtException" | "warning" | "app-dir") => void;
    ensureMiddleware(requestUrl?: string): Promise<void>;
}>;
export type DevBundler = Awaited<ReturnType<typeof setupDevBundler>>;
