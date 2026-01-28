import type { RouteMatcher } from 'next/dist/server/route-matchers/route-matcher';
export interface RouteMatcherProvider<M extends RouteMatcher = RouteMatcher> {
    matchers(): Promise<ReadonlyArray<M>>;
}
