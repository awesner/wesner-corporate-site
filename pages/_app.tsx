import type { AppLayoutProps } from 'next/app';
import { ReactQueryProvider } from '@providers/react-query.provider';
import { NextIntlProvider } from '@providers/next-intl.provider';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'theme/theme';
import Transition from '@components/Transition';
import Cookies from '@components/Cookies';
import { useEffect, useState } from 'react';

import '@styles/globals.css';
import { getCookie } from 'utils/cookies';

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout ?? ((page: JSX.Element) => page);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!getCookie('user_cookie_consent')) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <Transition>
      <NextIntlProvider pageProps={pageProps}>
        <Head>
          <title>Wesner-Softwareentwicklung</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <ReactQueryProvider>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <Cookies open={open} setOpen={setOpen} />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </ReactQueryProvider>
      </NextIntlProvider>
    </Transition>
  );
}

export default MyApp;
