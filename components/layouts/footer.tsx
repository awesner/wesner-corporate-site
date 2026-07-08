import { MapIcon } from 'components/shared/icons';
import Logo from 'components/shared/logo';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import { useGetMainNavConfig } from 'models/configs/main-nav.config';
import NextLink from 'next/link';
import FooterContacts from 'components/shared/footer/footer-contacts';
import FooterBottom from 'components/shared/footer/footer-bottom';
import { useTranslations } from 'next-intl';
import { ERoutes } from 'models/enums/routes.enum';

export default function Footer(): JSX.Element {
  const t = useTranslations();
  const mainNavConfig = useGetMainNavConfig();

  return (
    <Box component="section" bgcolor="grey.900" color="grey.200">
      <Container fixed={true} sx={{ py: { xs: 5, md: 6, lg: 8 } }}>
        <Grid container columnSpacing={12} rowSpacing={{ xs: 3, lg: 0 }}>
          <Grid item xs={12} lg={4}>
            <Stack gap={1}>
              <Logo isSmall />
              <Typography variant="body2" fontSize={{ xs: 14, lg: 16 }}>
                Wesner-Softwareentwicklung GmbH.
              </Typography>
              <Typography variant="body2" fontSize={{ xs: 14, lg: 16 }}>
                {t('footer.title')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Stack
              direction="row"
              sx={{ gap: { xs: 3, lg: 9 } }}
              justifyContent={{ xs: 'start', md: 'space-between' }}
              flexWrap="wrap"
            >
              <Box flexBasis={{ xs: '100%', sm: '40%', md: 'auto' }}>
                <Typography component="div" variant="h6" mb={2}>
                  {t('footer.menu')}
                </Typography>
                <Stack gap={1}>
                  {mainNavConfig
                    .filter(({ name }) => name !== ERoutes.ContactUs)
                    .map(({ name, path }) => (
                      <NextLink key={name} href={path} passHref={true}>
                        <Typography
                          component="a"
                          variant="body2"
                          sx={{
                            cursor: 'pointer',
                            color: 'grey.200',
                            textDecoration: 'none',
                            fontSize: { xs: 14, lg: 16 },
                          }}
                        >
                          {name}
                        </Typography>
                      </NextLink>
                    ))}
                </Stack>
              </Box>
              <Stack gap={2} flexBasis={{ xs: '100%', sm: '40%', md: 'auto' }}>
                <Typography component="div" variant="h6">
                  {t('footer.office')}
                </Typography>
                <Stack direction="row" gap={1}>
                  <MapIcon sx={{ fontSize: 16, mt: 0.5 }} />
                  <Typography variant="body2" fontSize={{ xs: 14, lg: 16 }}>
                    Herrlichkeit 2
                    <br /> D-28109 Bremen
                  </Typography>
                </Stack>
              </Stack>
              <FooterContacts />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <FooterBottom />
    </Box>
  );
}
