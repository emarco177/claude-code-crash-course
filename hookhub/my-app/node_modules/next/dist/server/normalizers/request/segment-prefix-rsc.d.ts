import type { PathnameNormalizer } from 'next/dist/server/normalizers/request/pathname-normalizer';
export declare class SegmentPrefixRSCPathnameNormalizer implements PathnameNormalizer {
    match(pathname: string): boolean;
    extract(pathname: string): {
        originalPathname: string;
        segmentPath: string;
    } | null;
    normalize(pathname: string): string;
}
