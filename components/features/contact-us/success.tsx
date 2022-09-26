import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import EndDecoration from 'public/images/contact-us/end-decoration.png';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ERoutes } from 'models/enums/routes.enum';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';

export default function Success(): JSX.Element {
  const t = useTranslations('contactUsPage.thankYou');
  const getResponsiveFonts = useGetResponsiveFontVariants();

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      justifyContent={{ xs: 'flex-start', lg: 'space-between' }}
      gap={{ xs: 5, md: 6 }}
    >
      <Stack
        alignItems="flex-start"
        pt={{ xs: 6, lg: 14 }}
        maxWidth={{ xs: 1, lg: 360 }}
        gap={{ xs: 1, lg: 2 }}
      >
        <Typography
          component="h1"
          variant={getResponsiveFonts({
            small: 'h3',
            medium: 'h2',
            large: 'h1',
          })}
        >
          {t('title')}
        </Typography>
        <Typography
          variant={getResponsiveFonts({ medium: 'body2', large: 'body1' })}
          color="grey.800"
        >
          {t('description')}
        </Typography>
        <Link href={ERoutes.Home}>
          <Button sx={{ mt: 1 }}>{t('btnText')}</Button>
        </Link>
      </Stack>
      <Box sx={{ maxWidth: { xs: 1, lg: 574 } }}>
        <Image src={EndDecoration} alt="" />
      </Box>
    </Stack>
  );
}
