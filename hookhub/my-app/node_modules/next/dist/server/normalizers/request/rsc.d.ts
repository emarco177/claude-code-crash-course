import type { PathnameNormalizer } from 'next/dist/server/normalizers/request/pathname-normalizer';
import { SuffixPathnameNormalizer } from 'next/dist/server/normalizers/request/suffix';
export declare class RSCPathnameNormalizer extends SuffixPathnameNormalizer implements PathnameNormalizer {
    constructor();
}
