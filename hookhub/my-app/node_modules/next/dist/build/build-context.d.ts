import type { LoadedEnvFiles } from '@next/env';
import type { Rewrite, Redirect } from 'next/dist/lib/load-custom-routes';
import type { __ApiPreviewProps } from 'next/dist/server/api-utils';
import type { NextConfigComplete } from 'next/dist/server/config-shared';
import type { Span } from 'next/dist/trace';
import type getBaseWebpackConfig from 'next/dist/build/webpack-config';
import type { TelemetryPluginState } from 'next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin';
import type { Telemetry } from 'next/dist/telemetry/storage';
export declare function resumePluginState(resumedState?: Record<string, any>): void;
export declare function getProxiedPluginState<State extends Record<string, any>>(initialState: State): State;
export declare function getPluginState(): Record<string, any>;
export interface MappedPages {
    [page: string]: string;
}
export declare const NextBuildContext: Partial<{
    compilerIdx?: number;
    pluginState: Record<string, any>;
    dir: string;
    distDir: string;
    buildId: string;
    encryptionKey: string;
    config: NextConfigComplete;
    appDir: string;
    pagesDir: string;
    rewrites: {
        fallback: Rewrite[];
        afterFiles: Rewrite[];
        beforeFiles: Rewrite[];
    };
    originalRewrites: {
        fallback: Rewrite[];
        afterFiles: Rewrite[];
        beforeFiles: Rewrite[];
    };
    hasRewrites: boolean;
    originalRedirects: Redirect[];
    loadedEnvFiles: LoadedEnvFiles;
    previewProps: __ApiPreviewProps;
    mappedPages: MappedPages | undefined;
    mappedAppPages: MappedPages | undefined;
    mappedRootPaths: MappedPages;
    hasInstrumentationHook: boolean;
    telemetry: Telemetry;
    telemetryState: TelemetryPluginState;
    nextBuildSpan: Span;
    reactProductionProfiling: boolean;
    noMangling: boolean;
    appDirOnly: boolean;
    clientRouterFilters: Parameters<typeof getBaseWebpackConfig>[1]['clientRouterFilters'];
    previewModeId: string;
    fetchCacheKeyPrefix?: string;
    allowedRevalidateHeaderKeys?: string[];
    isCompileMode?: boolean;
    debugPrerender: boolean;
    analyze: boolean;
}>;
