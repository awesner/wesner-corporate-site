import { useTranslations } from 'next-intl';
import { ERoutes } from '../enums/routes.enum';

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
          name: t('navigation.categories.integration'),
          path: '#',
          children: [
            { name: t('navigation.servicesChildren.enterprise'), path: `${ERoutes.Services}/enterprise` },
            { name: t('navigation.servicesChildren.ekaer'), path: `${ERoutes.Services}/ekaer` },
          ],
        },
        {
          name: t('navigation.categories.development'),
          path: '#',
          children: [
            { name: t('navigation.servicesChildren.individuelle'), path: `${ERoutes.Services}/individuelle-softwareentwicklung` },
            { name: t('navigation.servicesChildren.web'), path: `${ERoutes.Services}/webentwicklung` },
            { name: t('navigation.servicesChildren.mobile'), path: `${ERoutes.Services}/mobile-app-entwicklung` },
            { name: t('navigation.servicesChildren.embedded'), path: `${ERoutes.Services}/embedded-entwicklung` },
          ],
        },
        {
          name: t('navigation.categories.architecture'),
          path: '#',
          children: [
            { name: t('navigation.servicesChildren.architecture'), path: `${ERoutes.Services}/softwarearchitektur` },
            { name: t('navigation.servicesChildren.consulting'), path: `${ERoutes.Services}/softwareberatung` },
            { name: t('navigation.servicesChildren.productConsulting'), path: `${ERoutes.Services}/produktberatung` },
            { name: t('navigation.servicesChildren.requirements'), path: `${ERoutes.Services}/requirements-engineering` },
          ],
        },
        {
          name: t('navigation.categories.innovation'),
          path: '#',
          children: [
            { name: t('navigation.servicesChildren.uiux'), path: `${ERoutes.Services}/ui-ux-design` },
            { name: t('navigation.servicesChildren.ai'), path: `${ERoutes.Services}/ki-forschung-entwicklung` },
            { name: t('navigation.servicesChildren.voice'), path: `${ERoutes.Services}/sprachassistenten` },
            { name: t('navigation.servicesChildren.modules'), path: `${ERoutes.Services}/produktbausteine` },
          ],
        },
      ],
    },
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
    {
      name: t('navigation.products'),
      path: ERoutes.Products,
      children: [
        {
          name: t('navigation.productsChildren.monitoring'),
          path: `${ERoutes.Products}/monitoring`,
        },
        {
          name: t('navigation.productsChildren.chatbot'),
          path: `${ERoutes.Products}/ai-chatbot`,
        },
      ],
    },
  ] as IMainNavItem[];
};