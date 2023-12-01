import { LoaderFunctionArgs } from '@remix-run/node';

import shopify from '~/shopify.server';

export async function loader({ request }: LoaderFunctionArgs) {
    console.log(666);

    const res = await shopify.authenticate.admin(request);
    console.log(res);

    return null;
}