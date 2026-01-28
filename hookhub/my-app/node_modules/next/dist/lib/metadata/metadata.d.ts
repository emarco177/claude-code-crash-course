import React from 'react';
import type { GetDynamicParamFromSegment } from 'next/dist/server/app-render/app-render';
import type { LoaderTree } from 'next/dist/server/lib/app-dir-module';
import type { SearchParams } from 'next/dist/server/request/search-params';
import { type MetadataErrorType } from 'next/dist/lib/metadata/resolve-metadata';
import type { MetadataContext } from 'next/dist/lib/metadata/types/resolvers';
import type { WorkStore } from 'next/dist/server/app-render/work-async-storage.external';
export declare function createMetadataComponents({ tree, pathname, parsedQuery, metadataContext, getDynamicParamFromSegment, errorType, workStore, serveStreamingMetadata, }: {
    tree: LoaderTree;
    pathname: string;
    parsedQuery: SearchParams;
    metadataContext: MetadataContext;
    getDynamicParamFromSegment: GetDynamicParamFromSegment;
    errorType?: MetadataErrorType | 'redirect';
    workStore: WorkStore;
    serveStreamingMetadata: boolean;
}): {
    Viewport: React.ComponentType;
    Metadata: React.ComponentType;
    MetadataOutlet: React.ComponentType;
};
