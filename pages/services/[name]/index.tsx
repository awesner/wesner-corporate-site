import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { BaseLayout } from '@components/layouts/base-layout';
import { ReactElement } from 'react';
import ContactUs from 'components/shared/contact-us/contact-us';
import {
  getResidualServices,
  getServicesPaths,
  getSingleService,
} from 'data-utils/services';
import {
  IResidualService,
  IServiceFull,
} from 'models/interfaces/services/service.interface';
import OtherServices from 'components/features/services/other-services';
import ServiceBanner from 'components/features/services/service-banner';
import Features from 'components/features/services/features';
import Head from 'next/head';

interface IServicePage {
  services: IResidualService[];
  service: IServiceFull;
}

const Service: NextPage<IServicePage> = ({ services, service }) => {
  return (
    <>
      <Head>
        <title>{service.meta?.title || service.name}</title>
        <meta
          name="description"
          content={service.meta?.description || service.shortDescription}
        />
      </Head>
      <ServiceBanner service={service} />
      <Features service={service} />
      <OtherServices services={services} />
      <ContactUs />
    </>
  );
};

Service.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps = ({ locale, params }) => {
  return {
    props: {
      services: getResidualServices(locale, params?.name as string),
      service: getSingleService(locale, params?.name as string),
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/services.json`),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = ({ locales }) => {
  return {
    paths: getServicesPaths(locales),
    fallback: false,
  };
};

export default Service;