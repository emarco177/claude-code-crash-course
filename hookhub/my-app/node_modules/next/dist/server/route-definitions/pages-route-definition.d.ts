import type { LocaleRouteDefinition } from 'next/dist/server/route-definitions/locale-route-definition';
import type { RouteKind } from 'next/dist/server/route-kind';
export interface PagesRouteDefinition extends LocaleRouteDefinition<RouteKind.PAGES> {
}
