import Navigation from 'components/shared/navigation/navigation';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import Footer from './footer';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface IBaseLayoutProps extends PropsWithChildren {
  isPrimaryHeader?: boolean;
}

export const BaseLayout = ({ children, isPrimaryHeader }: IBaseLayoutProps) => {
  const router = useRouter();

  // --- GLOBAL SEO URL LOGIC ---
  const siteUrl = 'https://www.wesner-software.de';

  const cleanPath = router.asPath.split('?')[0].split('#')[0];

  const urlEn = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const urlDe = `${siteUrl}/de${cleanPath === '/' ? '' : cleanPath}`;

  const canonicalUrl = router.locale === 'de' ? urlDe : urlEn;
  // ----------------------------

  return (
    <>
      <Head>
        {/* Canonical Tag */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="en" href={urlEn} />
        <link rel="alternate" hrefLang="de" href={urlDe} />
        <link rel="alternate" hrefLang="x-default" href={urlEn} />
      </Head>

      <Navigation isPrimary={isPrimaryHeader} />
      <Box bgcolor="background.paper">{children}</Box>
      <Footer />
    </>
  );
};