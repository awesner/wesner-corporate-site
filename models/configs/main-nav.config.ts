import { useTranslations } from 'use-intl';
import { ERoutes, EServicesRoutes } from './../enums/routes.enum';

export interface IMainNavItem {
  name: string;
  path: ERoutes | string;
  children?: IMainNavItem[];
}

export const useGetMainNavConfig = () => {
  const t = useTranslations();

  return [
    {
      name: t('navigation.services'),
      path: ERoutes.Services,
      children: [
        {
          name: t('navigation.servicesChildren.enterprise'),
          path: `${ERoutes.Services}${EServicesRoutes.Enterprise}`,
        },
        {
          name: t('navigation.servicesChildren.ekaer'),
          path: `${ERoutes.Services}${EServicesRoutes.Ekaer}`,
        },
        // {
        //   name: t('navigation.servicesChildren.support'),
        //   path: `${ERoutes.Services}${EServicesRoutes.Support}`,
        // },
      ],
    },
    // {
    //   name: t('navigation.caseStudies'),
    //   path: ERoutes.CaseStudies,
    // },
    {
      name: t('navigation.careers'),
      path: ERoutes.Careers,
    },
    {
      name: t('contactUs.button'),
      path: ERoutes.ContactUs,
    },
    {
      name: t('navigation.blog'),
      path: ERoutes.Blog,
    },
  ] as IMainNavItem[];
};
