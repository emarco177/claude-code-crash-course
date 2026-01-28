export { createTemporaryReferenceSet, renderToReadableStream, decodeReply, decodeAction, decodeFormState, } from 'react-server-dom-webpack/server';
export { prerender } from 'react-server-dom-webpack/static';
export { captureOwnerStack, createElement, Fragment } from 'react';
export { default as LayoutRouter } from 'next/dist/client/components/layout-router';
export { default as RenderFromTemplateContext } from 'next/dist/client/components/render-from-template-context';
export { workAsyncStorage } from 'next/dist/server/app-render/work-async-storage.external';
export { workUnitAsyncStorage } from 'next/dist/server/app-render/work-unit-async-storage.external';
export { actionAsyncStorage } from 'next/dist/server/app-render/action-async-storage.external';
export { ClientPageRoot } from 'next/dist/client/components/client-page';
export { ClientSegmentRoot } from 'next/dist/client/components/client-segment';
export { createServerSearchParamsForServerPage, createPrerenderSearchParamsForClientPage, } from 'next/dist/server/request/search-params';
export { createServerParamsForServerSegment, createPrerenderParamsForClientSegment, } from 'next/dist/server/request/params';
export * as serverHooks from 'next/dist/client/components/hooks-server-context';
export { HTTPAccessFallbackBoundary } from 'next/dist/client/components/http-access-fallback/error-boundary';
export { createMetadataComponents } from 'next/dist/lib/metadata/metadata';
export { RootLayoutBoundary } from 'next/dist/lib/framework/boundary-components';
export { preloadStyle, preloadFont, preconnect } from 'next/dist/server/app-render/rsc/preloads';
export { Postpone } from 'next/dist/server/app-render/rsc/postpone';
export { taintObjectReference } from 'next/dist/server/app-render/rsc/taint';
export { collectSegmentData } from 'next/dist/server/app-render/collect-segment-data';
declare let SegmentViewNode: typeof import('next/dist/next-devtools/userspace/app/segment-explorer-node').SegmentViewNode;
declare let SegmentViewStateNode: typeof import('next/dist/next-devtools/userspace/app/segment-explorer-node').SegmentViewStateNode;
declare global {
    var __next__clear_chunk_cache__: (() => void) | null | undefined;
    var __turbopack_clear_chunk_cache__: () => void | null | undefined;
}
export declare function patchFetch(): void;
export { SegmentViewNode, SegmentViewStateNode };
