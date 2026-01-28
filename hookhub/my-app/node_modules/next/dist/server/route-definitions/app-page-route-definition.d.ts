import type { RouteDefinition } from 'next/dist/server/route-definitions/route-definition';
import { RouteKind } from 'next/dist/server/route-kind';
export interface AppPageRouteDefinition extends RouteDefinition<RouteKind.APP_PAGE> {
    readonly appPaths: ReadonlyArray<string>;
}
/**
 * Returns true if the given definition is an App Page route definition.
 */
export declare function isAppPageRouteDefinition(definition: RouteDefinition): definition is AppPageRouteDefinition;
