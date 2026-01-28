import React from 'react';
import type { BaseContext, NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';
import type { NextRouter } from 'next/dist/client/router';
export type WithRouterProps = {
    router: NextRouter;
};
export type ExcludeRouterProps<P> = Pick<P, Exclude<keyof P, keyof WithRouterProps>>;
export default function withRouter<P extends WithRouterProps, C extends BaseContext = NextPageContext>(ComposedComponent: NextComponentType<C, any, P>): React.ComponentType<ExcludeRouterProps<P>>;
