import type { AppPageRouteDefinition } from 'next/dist/server/route-definitions/app-page-route-definition';
import type RenderResult from 'next/dist/server/render-result';
import type { RenderOpts } from 'next/dist/server/app-render/types';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import type { LoaderTree } from 'next/dist/server/lib/app-dir-module';
import type { PrerenderManifest } from 'next/dist/build';
import { renderToHTMLOrFlight, type AppSharedContext } from 'next/dist/server/app-render/app-render';
import { RouteModule, type RouteModuleOptions, type RouteModuleHandleContext } from 'next/dist/server/route-modules/route-module';
import * as vendoredContexts from 'next/dist/server/route-modules/app-page/vendored/contexts/entrypoints';
import type { BaseNextRequest, BaseNextResponse } from 'next/dist/server/base-http';
import type { ServerComponentsHmrCache } from 'next/dist/server/response-cache';
import type { OpaqueFallbackRouteParams } from 'next/dist/server/request/fallback-params';
import type { DeepReadonly } from 'next/dist/shared/lib/deep-readonly';
/**
 * The AppPageModule is the type of the module exported by the bundled app page
 * module.
 */
export type AppPageModule = typeof import('next/dist/build/templates/app-page');
type AppPageUserlandModule = {
    /**
     * The tree created in next-app-loader that holds component segments and modules
     */
    loaderTree: LoaderTree;
};
export interface AppPageRouteHandlerContext extends RouteModuleHandleContext {
    page: string;
    query: NextParsedUrlQuery;
    fallbackRouteParams: OpaqueFallbackRouteParams | null;
    renderOpts: RenderOpts;
    serverComponentsHmrCache?: ServerComponentsHmrCache;
    sharedContext: AppSharedContext;
}
export type AppPageRouteModuleOptions = RouteModuleOptions<AppPageRouteDefinition, AppPageUserlandModule>;
export declare class AppPageRouteModule extends RouteModule<AppPageRouteDefinition, AppPageUserlandModule> {
    private matchers;
    match(pathname: string, prerenderManifest: DeepReadonly<PrerenderManifest>): {
        readonly dataRoute: string | null;
        readonly dataRouteRegex: string | null;
        readonly experimentalBypassFor?: readonly ({
            readonly type: "header" | "cookie" | "query";
            readonly key: string;
            readonly value?: string | undefined;
        } | {
            readonly type: "host";
            readonly key?: undefined | undefined;
            readonly value: string;
        })[] | undefined;
        readonly fallback: string | boolean | null;
        readonly fallbackRevalidate: import("next/dist/server/lib/cache-control").Revalidate | undefined;
        readonly fallbackExpire: number | undefined;
        readonly fallbackHeaders?: {
            readonly [x: string]: string;
        } | undefined;
        readonly fallbackStatus?: number | undefined;
        readonly fallbackRootParams: readonly string[] | undefined;
        readonly fallbackRouteParams: readonly {
            readonly paramName: string;
            readonly paramType: import("next/dist/shared/lib/app-router-types").DynamicParamTypes;
        }[] | undefined;
        readonly fallbackSourceRoute: string | undefined;
        readonly prefetchDataRoute: string | null | undefined;
        readonly prefetchDataRouteRegex: string | null | undefined;
        readonly routeRegex: string;
        readonly experimentalPPR: boolean | undefined;
        readonly renderingMode: import("next/dist/build/rendering-mode").RenderingMode | undefined;
        readonly allowHeader: readonly string[];
    } | null;
    render(req: BaseNextRequest, res: BaseNextResponse, context: AppPageRouteHandlerContext): Promise<RenderResult>;
    private pathCouldBeIntercepted;
    getVaryHeader(resolvedPathname: string, interceptionRoutePatterns: RegExp[]): string;
}
declare const vendored: {
    'react-rsc': typeof import("next/dist/server/route-modules/app-page/vendored/rsc/entrypoints") | undefined;
    'react-ssr': typeof import("next/dist/server/route-modules/app-page/vendored/ssr/entrypoints") | undefined;
    contexts: typeof vendoredContexts;
};
export { renderToHTMLOrFlight, vendored };
export default AppPageRouteModule;
