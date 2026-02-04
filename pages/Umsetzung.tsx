import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Grid, Typography, Box, CircularProgress, Button, Stack } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';
import { BaseLayout } from '@components/layouts/base-layout';

import { AdminPanel } from '@components/features/app-simulator/AdminPanel';
import { AppSimulator } from '@components/features/app-simulator/AppSimulator';

export default function Umsetzung() {
  const { data: session, status } = useSession();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();

  const triggerUpdate = () => setRefreshTrigger((prev) => prev + 1);

  const isAdmin = session?.user?.role === 'admin';
  const isLoggedIn = !!session;

  useEffect(() => {
    if (!router.isReady) return;

    if (status === 'unauthenticated') {
      const currentPath = router.asPath;
      router.replace(`/de/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [status, router, router.isReady]);

  if (status === 'loading') {
    return (
      <BaseLayout>
        <Container sx={{ py: 15, textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Laden...</Typography>
        </Container>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Head>
        <title>{isAdmin ? 'Admin Panel & Simulator' : 'Mein Portal'} | Wesner Software</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container maxWidth="xl" sx={{ py: 6 }}>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={4}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {isAdmin ? 'Admin-Panel & App Simulator' : 'Willkommen im Mitgliederbereich'}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {isAdmin
                ? 'Verwalten Sie Kurse links und sehen Sie das Ergebnis live rechts.'
                : 'Hier können Sie Ihre Kurse buchen und verwalten.'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            {isLoggedIn && (
              <Box textAlign="right" sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="caption" display="block" color="text.secondary">
                  Angemeldet als:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {session.user?.name}
                </Typography>
              </Box>
            )}

            {isLoggedIn ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={() => signOut({
                  callbackUrl: `/de/auth/signin?callbackUrl=${encodeURIComponent(router.asPath)}`
                })}
              >
                Abmelden
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<Login />}
                onClick={() => signIn(undefined, { callbackUrl: router.asPath })}
              >
                Anmelden
              </Button>
            )}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}>
            <AdminPanel onDataChange={triggerUpdate} isReadOnly={!isAdmin} />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Box display="flex" justifyContent="center">
              <AppSimulator refreshTrigger={0} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale || 'de'}/shared.json`),
      locale: locale || 'de'
    },
  };
};