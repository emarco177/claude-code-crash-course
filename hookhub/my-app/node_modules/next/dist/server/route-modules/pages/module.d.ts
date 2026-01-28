import type { IncomingMessage, ServerResponse } from 'http';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextComponentType, PageConfig } from 'next/dist/types';
import type { PagesRouteDefinition } from 'next/dist/server/route-definitions/pages-route-definition';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import type { PagesRenderContext, PagesSharedContext, RenderOpts } from 'next/dist/server/render';
import type RenderResult from 'next/dist/server/render-result';
import type { AppType, DocumentType } from 'next/dist/shared/lib/utils';
import { RouteModule, type RouteModuleHandleContext, type RouteModuleOptions } from 'next/dist/server/route-modules/route-module';
import { renderToHTML } from 'next/dist/server/render';
import * as vendoredContexts from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
/**
 * The PagesModule is the type of the module exported by the bundled pages
 * module.
 */
export type PagesModule = typeof import('next/dist/build/templates/pages');
/**
 * The userland module for a page. This is the module that is exported from the
 * page file that contains the page component, page config, and any page data
 * fetching functions.
 */
export type PagesUserlandModule = {
    /**
     * The exported page component.
     */
    readonly default: NextComponentType;
    /**
     * The exported page config.
     */
    readonly config?: PageConfig;
    /**
     * The exported `getStaticProps` function.
     */
    readonly getStaticProps?: GetStaticProps;
    /**
     * The exported `getStaticPaths` function.
     */
    readonly getStaticPaths?: GetStaticPaths;
    /**
     * The exported `getServerSideProps` function.
     */
    readonly getServerSideProps?: GetServerSideProps;
};
/**
 * The components that are used to render a page. These aren't tied to the
 * specific page being rendered, but rather are the components that are used to
 * render all pages.
 */
type PagesComponents = {
    /**
     * The `App` component. This could be exported by a user's custom `_app` page
     * file, or it could be the default `App` component.
     */
    readonly App: AppType;
    /**
     * The `Document` component. This could be exported by a user's custom
     * `_document` page file, or it could be the default `Document` component.
     */
    readonly Document: DocumentType;
};
export interface PagesRouteModuleOptions extends RouteModuleOptions<PagesRouteDefinition, PagesUserlandModule> {
    readonly components: PagesComponents;
}
/**
 * AppRouteRouteHandlerContext is the context that is passed to the route
 * handler for app routes.
 */
export interface PagesRouteHandlerContext extends RouteModuleHandleContext {
    /**
     * The page for the given route.
     */
    page: string;
    /**
     * The parsed URL query for the given request.
     */
    query: NextParsedUrlQuery;
    /**
     * The shared context used for all page renders.
     */
    sharedContext: PagesSharedContext;
    /**
     * The context for the given request.
     */
    renderContext: PagesRenderContext;
    /**
     * The arguments for the given request.
    /**
     * The RenderOpts for the given request which include the specific modules to
     * use for rendering.
     */
    renderOpts: Omit<RenderOpts, 'Document' | 'App'>;
}
export declare class PagesRouteModule extends RouteModule<PagesRouteDefinition, PagesUserlandModule> {
    private readonly components;
    constructor(options: PagesRouteModuleOptions);
    render(req: IncomingMessage, res: ServerResponse, context: PagesRouteHandlerContext): Promise<RenderResult>;
}
declare const vendored: {
    contexts: typeof vendoredContexts;
};
export { renderToHTML, vendored };
export default PagesRouteModule;
