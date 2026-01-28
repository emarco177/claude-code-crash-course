import type { Normalizer } from 'next/dist/server/normalizers/normalizer';
export interface PathnameNormalizer extends Normalizer {
    match(pathname: string): boolean;
    normalize(pathname: string, matched?: boolean): string;
}
