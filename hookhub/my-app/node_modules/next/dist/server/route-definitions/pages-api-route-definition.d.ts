import type { RouteKind } from 'next/dist/server/route-kind';
import type { LocaleRouteDefinition } from 'next/dist/server/route-definitions/locale-route-definition';
export interface PagesAPIRouteDefinition extends LocaleRouteDefinition<RouteKind.PAGES_API> {
}
