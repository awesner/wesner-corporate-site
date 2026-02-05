import { Link, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ERoutes } from 'models/enums/routes.enum';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

export default function FooterBottom(): JSX.Element {
  const theme = useTheme();
  const t = useTranslations();
  return (
    <Container sx={{ py: { xs: 2, md: 3 } }}>
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 0.5,
          columnGap: 2,
        }}
      >
        <Typography variant="caption">
          © {new Date().getFullYear()} Wesner-Softwareentwicklung GmbH
        </Typography>
        <Stack
          direction="row"
          sx={{
            typography: theme.typography.caption,
          }}
        >
          <NextLink href={ERoutes.Policy} passHref>
            <Link
              sx={{
                color: theme.palette.grey[200],
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {t('navigation.policy')}
            </Link>
          </NextLink>
          &nbsp;/&nbsp;
          <NextLink href={ERoutes.Terms} passHref>
            <Link
              sx={{
                color: theme.palette.grey[200],
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {t('navigation.terms')}
            </Link>
          </NextLink>
        </Stack>
      </Stack>
    </Container>
  );
}