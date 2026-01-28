import type { LoadComponentsReturnType } from 'next/dist/server/load-components';
import type { ServerRuntime, SizeLimit } from 'next/dist/types';
import type { ExperimentalConfig, NextConfigComplete } from 'next/dist/server/config-shared';
import type { NextFontManifest } from 'next/dist/build/webpack/plugins/next-font-manifest-plugin';
import type { ParsedUrlQuery } from 'querystring';
import type { AppPageModule } from 'next/dist/server/route-modules/app-page/module';
import type { DeepReadonly } from 'next/dist/shared/lib/deep-readonly';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import type { __ApiPreviewProps } from 'next/dist/server/api-utils';
import s from 'next/dist/compiled/superstruct';
import type { RequestLifecycleOpts } from 'next/dist/server/base-server';
import type { InstrumentationOnRequestError } from 'next/dist/server/instrumentation/types';
import type { NextRequestHint } from 'next/dist/server/web/adapter';
import type { BaseNextRequest } from 'next/dist/server/base-http';
import type { IncomingMessage } from 'http';
import type { RenderResumeDataCache } from 'next/dist/server/resume-data-cache/resume-data-cache';
import type { ServerCacheStatus } from 'next/dist/next-devtools/dev-overlay/cache-indicator';
export declare const flightRouterStateSchema: s.Describe<any>;
export type ServerOnInstrumentationRequestError = (error: unknown, request: NextRequestHint | BaseNextRequest | IncomingMessage, errorContext: Parameters<InstrumentationOnRequestError>[2], silenceLog: boolean) => void | Promise<void>;
export interface RenderOptsPartial {
    dir?: string;
    previewProps: __ApiPreviewProps | undefined;
    err?: Error | null;
    dev?: boolean;
    basePath: string;
    cacheComponents: boolean;
    trailingSlash: boolean;
    images: ImageConfigComplete;
    supportsDynamicResponse: boolean;
    runtime?: ServerRuntime;
    serverComponents?: boolean;
    enableTainting?: boolean;
    assetPrefix?: string;
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    nextFontManifest?: DeepReadonly<NextFontManifest>;
    botType?: 'dom' | 'html' | undefined;
    serveStreamingMetadata?: boolean;
    incrementalCache?: import('next/dist/server/lib/incremental-cache').IncrementalCache;
    cacheLifeProfiles?: {
        [profile: string]: import('next/dist/server/use-cache/cache-life').CacheLife;
    };
    isOnDemandRevalidate?: boolean;
    isPossibleServerAction?: boolean;
    setCacheStatus?: (status: ServerCacheStatus, htmlRequestId: string) => void;
    setIsrStatus?: (key: string, value: boolean | undefined) => void;
    setReactDebugChannel?: (debugChannel: {
        readable: ReadableStream<Uint8Array>;
    }, htmlRequestId: string, requestId: string) => void;
    sendErrorsToBrowser?: (errorsRscStream: ReadableStream<Uint8Array>, htmlRequestId: string) => void;
    nextExport?: boolean;
    nextConfigOutput?: 'standalone' | 'export';
    onInstrumentationRequestError?: ServerOnInstrumentationRequestError;
    isDraftMode?: boolean;
    deploymentId?: string;
    onUpdateCookies?: (cookies: string[]) => void;
    loadConfig?: (phase: string, dir: string, customConfig?: object | null, rawConfig?: boolean, silent?: boolean) => Promise<NextConfigComplete>;
    serverActions?: {
        bodySizeLimit?: SizeLimit;
        allowedOrigins?: string[];
    };
    params?: ParsedUrlQuery;
    isPrefetch?: boolean;
    htmlLimitedBots: string | undefined;
    experimental: {
        /**
         * When true, it indicates that the current page supports partial
         * prerendering.
         */
        isRoutePPREnabled?: boolean;
        expireTime: number | undefined;
        staleTimes: ExperimentalConfig['staleTimes'] | undefined;
        clientTraceMetadata: string[] | undefined;
        /**
         * The origins that are allowed to write the rewritten headers when
         * performing a non-relative rewrite. When undefined, no non-relative
         * rewrites will get the rewrite headers.
         */
        clientParamParsingOrigins: string[] | undefined;
        dynamicOnHover: boolean;
        inlineCss: boolean;
        authInterrupts: boolean;
    };
    postponed?: string;
    /**
     * Should wait for react stream allReady to resolve all suspense boundaries,
     * in order to perform a full page render.
     */
    shouldWaitOnAllReady?: boolean;
    /**
     * A prefilled resume data cache. This was either generated for this page
     * during dev warmup, or when a page with defined params was previously
     * prerendered, and now its matching optional fallback shell is prerendered.
     */
    renderResumeDataCache?: RenderResumeDataCache;
    /**
     * When true, the page will be rendered using the static rendering to detect
     * any dynamic API's that would have stopped the page from being fully
     * statically generated.
     */
    isDebugDynamicAccesses?: boolean;
    /**
     * This is true when:
     * - source maps are generated
     * - source maps are applied
     * - minification is disabled
     */
    hasReadableErrorStacks?: boolean;
    /**
     * The maximum length of the headers that are emitted by React and added to
     * the response.
     */
    reactMaxHeadersLength: number | undefined;
    isStaticGeneration?: boolean;
    /**
     * When true, the page is prerendered as a fallback shell, while allowing any
     * dynamic accesses to result in an empty shell. This is the case when there
     * are also routes prerendered with a more complete set of params.
     * Prerendering those routes would catch any invalid dynamic accesses.
     */
    allowEmptyStaticShell?: boolean;
}
export type RenderOpts = LoadComponentsReturnType<AppPageModule> & RenderOptsPartial & RequestLifecycleOpts;
export type PreloadCallbacks = (() => void)[];
