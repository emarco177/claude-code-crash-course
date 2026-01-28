import type { I18NProvider } from 'next/dist/server/lib/i18n-provider';
import type { Normalizer } from 'next/dist/server/normalizers/normalizer';
/**
 * Normalizes the pathname by removing the locale prefix if any.
 */
export declare class LocaleRouteNormalizer implements Normalizer {
    private readonly provider;
    constructor(provider: I18NProvider);
    /**
     * Normalizes the pathname by removing the locale prefix if any.
     *
     * @param pathname The pathname to normalize.
     * @returns The pathname without the locale prefix (if any).
     */
    normalize(pathname: string): string;
}
