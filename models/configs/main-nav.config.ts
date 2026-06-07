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
      name: t('navigation.servicesChildren.biztalkMigration'),
      path: `${ERoutes.Services}/biztalk-migration-azure`,
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
      ],
    },
  ] as IMainNavItem[];
};
