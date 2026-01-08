import type { GetStaticProps, NextPage } from 'next';
import { BaseLayout } from '@components/layouts/base-layout';
import { ReactElement } from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import Link from 'next/link';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Custom500: NextPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 15 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <CloudOffIcon sx={{ fontSize: 120, color: 'text.secondary', opacity: 0.2, mb: 2 }} />

        <Typography
          variant="h1"
          fontWeight="bold"
          color="primary"
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            lineHeight: 1
          }}
        >
          500
        </Typography>

        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Server-Fehler / Internal Server Error
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
          Es tut uns leid, auf unserer Seite ist ein Fehler aufgetreten. Wir arbeiten bereits an der Lösung. Bitte versuchen Sie es später noch einmal.
          <br />
          <br />
          <i>Sorry, something went wrong on our end. We are working on it. Please try again later.</i>
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Link href="/" passHref>
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBackIcon />}
              sx={{ px: 4 }}
            >
              Startseite / Home
            </Button>
          </Link>

          <Link href="/contact-us" passHref>
            <Button
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Kontakt / Contact
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: {
        ...require(`/locales/${locale}/shared.json`),
      },
    },
  };
};

export default Custom500;