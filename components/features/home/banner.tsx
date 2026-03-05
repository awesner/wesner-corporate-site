import { Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ERoutes } from 'models/enums/routes.enum';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import BannerDecor from 'public/images/home/banner.png';
import BannerLogos from 'components/features/home/banner-logos';

export default function Banner(): JSX.Element {
  const t = useTranslations();

  const getResponsiveFont = useGetResponsiveFontVariants();

  return (
    <Box
      bgcolor="primary.main"
      color="grey.200"
      pt={{ xs: 6, lg: 7 }}
      pb={{ xs: 6, md: 11, lg: 8 }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        pl={{ xs: 3, md: 13.5, lg: 'calc((100vw - 1200px) / 2 + 36px)' }}
        gap={{ xs: 5, md: 6, lg: 12 }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth={{
            xs: '100%',
            md: 'clamp(200px, 100%, 750px)',
            lg: 'calc(50% - 96px)',
          }}
          flexShrink="0"
          pr={{ xs: 3, md: 13.5, lg: 0 }}
          mt={{ lg: 9 }}
        >
          <Typography
            component="h1"
            variant={getResponsiveFont({
              small: 'h3',
              medium: 'h2',
              large: 'h1',
            })}
            mb={{ xs: 1, lg: 2 }}
            color="grey.300"
          >
            {t('banner.title')}
          </Typography>
          <Typography
            variant={getResponsiveFont({ medium: 'body2', large: 'body1' })}
            mb={{ xs: 2, lg: 3 }}
          >
            {t('banner.description')}
          </Typography>
          <Link href={ERoutes.ContactUs}>
            <Button color="secondary">{t('banner.freeConsultation')}</Button>
          </Link>
        </Stack>
        <Box pr={2.5} maxWidth={{ md: 600, lg: 'none' }}>
          <Image src={BannerDecor} alt="" priority />
        </Box>
      </Stack>
      <Container fixed sx={{ mt: { xs: 6, lg: 0.5 } }}>
        <BannerLogos />
      </Container>
    </Box>
  );
}
