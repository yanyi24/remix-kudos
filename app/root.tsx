import { cssBundleHref } from "@remix-run/css-bundle";
import styles from './styles/app.css';
import { type MetaFunction, type LinksFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import shopify from '~/shopify.server';
import { AppProvider } from "@shopify/shopify-app-remix/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
