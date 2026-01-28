import PagesRouteModule from 'next/dist/server/route-modules/pages/module';
export declare const routeModule: PagesRouteModule;
export declare const handler: (req: import("http").IncomingMessage, res: import("http").ServerResponse, ctx: {
    waitUntil: (prom: Promise<void>) => void;
}) => Promise<void>;
