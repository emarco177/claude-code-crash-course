import type { IncomingMessage, ServerResponse } from 'node:http';
import type { InstrumentationOnRequestError, RequestErrorContext } from 'next/dist/server/instrumentation/types';
import type { ParsedUrlQuery } from 'node:querystring';
import type { UrlWithParsedQuery } from 'node:url';
import type { PrerenderManifest, RequiredServerFilesManifest } from 'next/dist/build';
import type { DevRoutesManifest } from 'next/dist/server/lib/router-utils/setup-dev-bundler';
import type { RouteDefinition } from 'next/dist/server/route-definitions/route-definition';
import type { DeepReadonly } from 'next/dist/shared/lib/deep-readonly';
import type { PreviewData } from 'next/dist/types';
import type { BuildManifest } from 'next/dist/server/get-page-files';
import type { ReactLoadableManifest } from 'next/dist/server/load-components';
import type { NextFontManifest } from 'next/dist/build/webpack/plugins/next-font-manifest-plugin';
import { type NextIncomingMessage } from 'next/dist/server/request-meta';
import { IncrementalCache } from 'next/dist/server/lib/incremental-cache';
import { RouteKind } from 'next/dist/server/route-kind';
import type { BaseNextRequest } from 'next/dist/server/base-http';
import type { NextConfigRuntime } from 'next/dist/server/config-shared';
import ResponseCache, { type ResponseGenerator } from 'next/dist/server/response-cache';
import { type RouterServerContext } from 'next/dist/server/lib/router-utils/router-server-context';
/**
 * RouteModuleOptions is the options that are passed to the route module, other
 * route modules should extend this class to add specific options for their
 * route.
 */
export interface RouteModuleOptions<D extends RouteDefinition = RouteDefinition, U = unknown> {
    readonly definition: Readonly<D>;
    readonly userland: Readonly<U>;
    readonly distDir: string;
    readonly relativeProjectDir: string;
}
/**
 * RouteHandlerContext is the base context for a route handler.
 */
export interface RouteModuleHandleContext {
    /**
     * Any matched parameters for the request. This is only defined for dynamic
     * routes.
     */
    params: Record<string, string | string[] | undefined> | undefined;
}
/**
 * RouteModule is the base class for all route modules. This class should be
 * extended by all route modules.
 */
export declare abstract class RouteModule<D extends RouteDefinition = RouteDefinition, U = unknown> {
    /**
     * The userland module. This is the module that is exported from the user's
     * code. This is marked as readonly to ensure that the module is not mutated
     * because the module (when compiled) only provides getters.
     */
    readonly userland: Readonly<U>;
    /**
     * The definition of the route.
     */
    readonly definition: Readonly<D>;
    /**
     * The shared modules that are exposed and required for the route module.
     */
    static readonly sharedModules: any;
    isDev: boolean;
    distDir: string;
    relativeProjectDir: string;
    incrementCache?: IncrementalCache;
    responseCache?: ResponseCache;
    constructor({ userland, definition, distDir, relativeProjectDir, }: RouteModuleOptions<D, U>);
    instrumentationOnRequestError(req: IncomingMessage | BaseNextRequest, ...args: Parameters<InstrumentationOnRequestError>): Promise<void>;
    private loadManifests;
    loadCustomCacheHandlers(req: IncomingMessage | BaseNextRequest, nextConfig: NextConfigRuntime): Promise<void>;
    getIncrementalCache(req: IncomingMessage | BaseNextRequest, nextConfig: NextConfigRuntime, prerenderManifest: DeepReadonly<PrerenderManifest>, isMinimalMode: boolean): Promise<IncrementalCache>;
    onRequestError(req: IncomingMessage | BaseNextRequest, err: unknown, errorContext: RequestErrorContext, silenceLog: boolean, routerServerContext?: RouterServerContext[string]): Promise<void>;
    /** A more lightweight version of `prepare()` for only retrieving the config on edge */
    getNextConfigEdge(req: NextIncomingMessage): {
        nextConfig: NextConfigRuntime;
        deploymentId: string;
    };
    prepare(req: IncomingMessage | BaseNextRequest, res: ServerResponse | null, { srcPage, multiZoneDraftMode, }: {
        srcPage: string;
        multiZoneDraftMode?: boolean;
    }): Promise<{
        buildId: string;
        deploymentId: string;
        locale?: string;
        locales?: readonly string[];
        defaultLocale?: string;
        query: ParsedUrlQuery;
        originalQuery: ParsedUrlQuery;
        originalPathname: string;
        params?: ParsedUrlQuery;
        parsedUrl: UrlWithParsedQuery;
        previewData: PreviewData;
        pageIsDynamic: boolean;
        isDraftMode: boolean;
        resolvedPathname: string;
        encodedResolvedPathname: string;
        isNextDataRequest: boolean;
        buildManifest: DeepReadonly<BuildManifest>;
        fallbackBuildManifest: DeepReadonly<BuildManifest>;
        nextFontManifest: DeepReadonly<NextFontManifest>;
        serverFilesManifest: DeepReadonly<RequiredServerFilesManifest> | undefined;
        reactLoadableManifest: DeepReadonly<ReactLoadableManifest>;
        routesManifest: DeepReadonly<DevRoutesManifest>;
        prerenderManifest: DeepReadonly<PrerenderManifest>;
        clientReferenceManifest?: any;
        serverActionsManifest?: any;
        dynamicCssManifest?: any;
        subresourceIntegrityManifest?: DeepReadonly<Record<string, string>>;
        isOnDemandRevalidate: boolean;
        revalidateOnlyGenerated: boolean;
        nextConfig: NextConfigRuntime;
        routerServerContext?: RouterServerContext[string];
        interceptionRoutePatterns?: any;
    } | undefined>;
    getResponseCache(req: IncomingMessage | BaseNextRequest): ResponseCache;
    handleResponse({ req, nextConfig, cacheKey, routeKind, isFallback, prerenderManifest, isRoutePPREnabled, isOnDemandRevalidate, revalidateOnlyGenerated, responseGenerator, waitUntil, isMinimalMode, }: {
        req: IncomingMessage | BaseNextRequest;
        nextConfig: NextConfigRuntime;
        cacheKey: string | null;
        routeKind: RouteKind;
        isFallback?: boolean;
        prerenderManifest: DeepReadonly<PrerenderManifest>;
        isRoutePPREnabled?: boolean;
        isOnDemandRevalidate?: boolean;
        revalidateOnlyGenerated?: boolean;
        responseGenerator: ResponseGenerator;
        waitUntil?: (prom: Promise<any>) => void;
        isMinimalMode: boolean;
    }): Promise<import("next/dist/server/response-cache").ResponseCacheEntry | null>;
}
