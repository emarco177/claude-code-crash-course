import type { FindComponentsResult, NodeRequestHandler } from 'next/dist/server/next-server';
import type { LoadComponentsReturnType } from 'next/dist/server/load-components';
import type { Options as ServerOptions } from 'next/dist/server/next-server';
import type { Params } from 'next/dist/server/request/params';
import type { ParsedUrl } from 'next/dist/shared/lib/router/utils/parse-url';
import type { ParsedUrlQuery } from 'querystring';
import type { UrlWithParsedQuery } from 'url';
import type { MiddlewareRoutingItem } from 'next/dist/server/base-server';
import type { RouteDefinition } from 'next/dist/server/route-definitions/route-definition';
import type { RouteMatcherManager } from 'next/dist/server/route-matcher-managers/route-matcher-manager';
import { type NextParsedUrlQuery, type NextUrlWithParsedQuery } from 'next/dist/server/request-meta';
import type { DevBundlerService } from 'next/dist/server/lib/dev-bundler-service';
import type { IncrementalCache } from 'next/dist/server/lib/incremental-cache';
import type { NodeNextResponse, NodeNextRequest } from 'next/dist/server/base-http/node';
import type { PagesManifest } from 'next/dist/build/webpack/plugins/pages-manifest-plugin';
import Server from 'next/dist/server/next-server';
import { type Span } from 'next/dist/trace';
import { type ErrorModule } from 'next/dist/server/load-default-error-components';
import { type NextConfigComplete } from 'next/dist/server/config-shared';
import type { ServerOnInstrumentationRequestError } from 'next/dist/server/app-render/types';
import type { ServerComponentsHmrCache } from 'next/dist/server/response-cache';
import { FallbackMode } from 'next/dist/lib/fallback';
import type { PrerenderedRoute } from 'next/dist/build/static-paths/types';
export interface Options extends ServerOptions {
    conf: NextConfigComplete;
    /**
     * Tells of Next.js is running from the `next dev` command
     */
    isNextDevCommand?: boolean;
    /**
     * Interface to the development bundler.
     */
    bundlerService: DevBundlerService;
    /**
     * Trace span for server startup.
     */
    startServerSpan: Span;
}
export default class DevServer extends Server {
    protected readonly nextConfig: NextConfigComplete;
    /**
     * The promise that resolves when the server is ready. When this is unset
     * the server is ready.
     */
    private ready?;
    protected sortedRoutes?: string[];
    private pagesDir?;
    private appDir?;
    private actualMiddlewareFile?;
    private actualInstrumentationHookFile?;
    private middleware?;
    private readonly bundlerService;
    private staticPathsCache;
    private startServerSpan;
    private readonly serverComponentsHmrCache;
    protected staticPathsWorker?: {
        [key: string]: any;
    } & {
        loadStaticPaths: typeof import('next/dist/server/dev/static-paths-worker').loadStaticPaths;
    };
    private getStaticPathsWorker;
    constructor(options: Options);
    protected getServerComponentsHmrCache(): ServerComponentsHmrCache | undefined;
    protected getRouteMatchers(): RouteMatcherManager;
    protected getBuildId(): string;
    protected prepareImpl(): Promise<void>;
    protected hasPage(pathname: string): Promise<boolean>;
    runMiddleware(params: {
        request: NodeNextRequest;
        response: NodeNextResponse;
        parsedUrl: ParsedUrl;
        parsed: UrlWithParsedQuery;
        middlewareList: MiddlewareRoutingItem[];
    }): Promise<import("next/dist/server/web/types").FetchEventResult | {
        finished: boolean;
    }>;
    runEdgeFunction(params: {
        req: NodeNextRequest;
        res: NodeNextResponse;
        query: ParsedUrlQuery;
        params: Params | undefined;
        page: string;
        appPaths: string[] | null;
        isAppPath: boolean;
    }): Promise<import("next/dist/server/web/types").FetchEventResult | null>;
    getRequestHandler(): NodeRequestHandler;
    handleRequest(req: NodeNextRequest, res: NodeNextResponse, parsedUrl?: NextUrlWithParsedQuery): Promise<void>;
    run(req: NodeNextRequest, res: NodeNextResponse, parsedUrl: UrlWithParsedQuery): Promise<void>;
    protected logErrorWithOriginalStack(err?: unknown, type?: 'unhandledRejection' | 'uncaughtException' | 'warning' | 'app-dir'): void;
    protected getPagesManifest(): PagesManifest | undefined;
    protected getAppPathsManifest(): PagesManifest | undefined;
    protected getinterceptionRoutePatterns(): RegExp[];
    protected getMiddleware(): Promise<MiddlewareRoutingItem | undefined>;
    protected getNextFontManifest(): undefined;
    protected hasMiddleware(): Promise<boolean>;
    protected ensureMiddleware(url: string): Promise<void>;
    protected loadInstrumentationModule(): Promise<any>;
    protected runInstrumentationHookIfAvailable(): Promise<void>;
    protected ensureEdgeFunction({ page, appPaths, url, }: {
        page: string;
        appPaths: string[] | null;
        url: string;
    }): Promise<void>;
    generateRoutes(_dev?: boolean): void;
    protected getStaticPaths({ pathname, urlPathname, requestHeaders, page, isAppPath, }: {
        pathname: string;
        urlPathname: string;
        requestHeaders: IncrementalCache['requestHeaders'];
        page: string;
        isAppPath: boolean;
    }): Promise<{
        prerenderedRoutes?: PrerenderedRoute[];
        staticPaths?: string[];
        fallbackMode?: FallbackMode;
    }>;
    protected ensurePage(opts: {
        page: string;
        clientOnly: boolean;
        appPaths?: ReadonlyArray<string> | null;
        definition: RouteDefinition | undefined;
        url?: string;
    }): Promise<void>;
    protected findPageComponents({ locale, page, query, params, isAppPath, appPaths, shouldEnsure, url, }: {
        locale: string | undefined;
        page: string;
        query: NextParsedUrlQuery;
        params: Params;
        isAppPath: boolean;
        sriEnabled?: boolean;
        appPaths?: ReadonlyArray<string> | null;
        shouldEnsure: boolean;
        url?: string;
    }): Promise<FindComponentsResult | null>;
    protected getFallbackErrorComponents(url?: string): Promise<LoadComponentsReturnType<ErrorModule> | null>;
    getCompilationError(page: string): Promise<any>;
    protected instrumentationOnRequestError(...args: Parameters<ServerOnInstrumentationRequestError>): Promise<void>;
}
