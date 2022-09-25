import { useTranslations } from 'next-intl';

export const useBenefitsConfig = () => {
  const t = useTranslations('careers.benefits');
  return [
    {
      title: t('benefit1'),
      img: '/careers/benefits/benefit1.png',
    },
    {
      title: t('benefit2'),
      img: '/careers/benefits/benefit2.png',
    },
    {
      title: t('benefit3'),
      img: '/careers/benefits/benefit3.png',
    },
    {
      title: t('benefit4'),
      img: '/careers/benefits/benefit4.png',
    },
    {
      title: t('benefit5'),
      img: '/careers/benefits/benefit5.png',
    },
    {
      title: t('benefit6'),
      img: '/careers/benefits/benefit6.png',
    },
  ];
};
