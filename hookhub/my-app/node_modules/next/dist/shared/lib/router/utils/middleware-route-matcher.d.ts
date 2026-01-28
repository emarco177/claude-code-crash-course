import type { BaseNextRequest } from 'next/dist/server/base-http';
import type { ProxyMatcher } from 'next/dist/build/analysis/get-page-static-info';
import type { Params } from 'next/dist/server/request/params';
export interface MiddlewareRouteMatch {
    (pathname: string | null | undefined, request: BaseNextRequest, query: Params): boolean;
}
export declare function getMiddlewareRouteMatcher(matchers: ProxyMatcher[]): MiddlewareRouteMatch;
