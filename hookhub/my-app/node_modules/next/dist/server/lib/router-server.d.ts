import 'next/dist/server/node-environment';
import 'next/dist/server/require-hook';
import { type Span } from 'next/dist/trace';
import type { ServerInitResult } from 'next/dist/server/lib/render-server';
export type RenderServer = Pick<typeof import('next/dist/server/lib/render-server'), 'initialize' | 'clearModuleContext' | 'propagateServerField' | 'getServerField'>;
export interface LazyRenderServerInstance {
    instance?: RenderServer;
}
export declare function initialize(opts: {
    dir: string;
    port: number;
    dev: boolean;
    onDevServerCleanup: ((listener: () => Promise<void>) => void) | undefined;
    server?: import('http').Server;
    minimalMode?: boolean;
    hostname?: string;
    keepAliveTimeout?: number;
    customServer?: boolean;
    experimentalHttpsServer?: boolean;
    startServerSpan?: Span;
    quiet?: boolean;
}): Promise<ServerInitResult>;
