import type { ExperimentalConfig, I18NConfig } from 'next/dist/server/config-shared';
import type { NextRequest } from 'next/dist/server/web/spec-extension/request';
import type { NextFetchEvent } from 'next/dist/server/web/spec-extension/fetch-event';
import type { NextResponse } from 'next/dist/server/web/spec-extension/response';
import type { CloneableBody } from 'next/dist/server/body-streams';
import type { OutgoingHttpHeaders } from 'http';
import type { FetchMetrics } from 'next/dist/server/base-http';
/**
 * @deprecated Use `ProxyConfig` instead. Middleware has been renamed to Proxy.
 */
export type { MiddlewareConfigInput as MiddlewareConfig } from 'next/dist/build/segment-config/middleware/middleware-config';
export type { MiddlewareConfigInput as ProxyConfig } from 'next/dist/build/segment-config/middleware/middleware-config';
export interface RequestData {
    headers: OutgoingHttpHeaders;
    method: string;
    nextConfig?: {
        basePath?: string;
        i18n?: I18NConfig | null;
        trailingSlash?: boolean;
        experimental?: Pick<ExperimentalConfig, 'cacheLife' | 'authInterrupts' | 'clientParamParsingOrigins'>;
    };
    page?: {
        name?: string;
        params?: {
            [key: string]: string | string[] | undefined;
        };
    };
    url: string;
    body?: ReadableStream<Uint8Array>;
    signal: AbortSignal;
    /** passed in when running in edge runtime sandbox */
    waitUntil?: (promise: Promise<any>) => void;
}
export type NodejsRequestData = Omit<RequestData, 'body'> & {
    body?: CloneableBody;
};
export interface FetchEventResult {
    response: Response;
    waitUntil: Promise<any>;
    fetchMetrics?: FetchMetrics;
}
export type NextMiddlewareResult = NextResponse | Response | null | undefined | void;
/**
 * Middleware allows you to run code before a request is completed.
 * Then, based on the incoming request, you can modify the response
 * by rewriting, redirecting, modifying the request or response headers,
 * or responding directly.
 *
 * @deprecated Use `NextProxy` instead. Middleware has been renamed to Proxy.
 * Read more: [Next.js Docs: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
 */
export type NextMiddleware = (request: NextRequest, event: NextFetchEvent) => NextMiddlewareResult | Promise<NextMiddlewareResult>;
/**
 * Proxy allows you to run code before a request is completed.
 * Then, based on the incoming request, you can modify the response
 * by rewriting, redirecting, modifying the request or response headers,
 * or responding directly.
 *
 * Read more: [Next.js Docs: Proxy](https://nextjs.org/docs/app/building-your-application/routing/middleware)
 */
export type NextProxy = NextMiddleware;
