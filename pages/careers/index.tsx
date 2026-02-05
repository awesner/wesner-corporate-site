import type { NextPage } from 'next';
import { BaseLayout } from 'components/layouts/base-layout';
import { ReactElement } from 'react';
import ContactUs from 'components/shared/contact-us/contact-us';
import BannerSection from 'components/features/careers/banner-section';
import Benefits from 'components/features/careers/benefits';
import Positions from 'components/features/careers/positions';
import { getShortenPositionsList } from 'data-utils/careers';
import { IPosition } from 'models/interfaces/careers/position.interface';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

interface ICareersProps {
  positions?: IPosition[];
}

const Careers: NextPage<ICareersProps> = ({ positions }) => {
  const t = useTranslations('meta');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta
          name="description"
          content={t('description')}
        />
      </Head>
      <BannerSection />
      <Benefits />
      {/*<WhyJoin />*/}
      {!!positions?.length && <Positions positions={positions} />}
      <ContactUs />
    </>
  );
};

Careers.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      positions: getShortenPositionsList(locale),
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/careers.json`),
      },
    },
  };
}

export default Careers;