import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { BaseLayout } from '@components/layouts/base-layout';

import { AdminPanel } from '@components/features/app-simulator/AdminPanel';
import { AppSimulator } from '@components/features/app-simulator/AppSimulator';

export default function Umsetzung() {
  const { data: session, status } = useSession();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();

  const triggerUpdate = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/de/auth/signin');
    }
  }, [status, router]);

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

  if (!session) return null;

  const isAdmin = session.user?.role === 'admin';

  return (
    <BaseLayout>
      <Head>
        <title>{isAdmin ? 'Admin Panel & Simulator' : 'Mein Portal'} | Wesner Software</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold">
            {isAdmin ? 'Admin-Panel & App Simulator' : 'Willkommen im Mitgliederbereich'}
          </Typography>
          <Typography color="text.secondary">
            {isAdmin
              ? 'Verwalten Sie Kurse links und sehen Sie das Ergebnis live rechts.'
              : 'Hier können Sie Ihre Kurse buchen und verwalten.'}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}>
            <AdminPanel onDataChange={triggerUpdate} isReadOnly={!isAdmin} />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Box display="flex" justifyContent="center">
              <AppSimulator refreshTrigger={refreshTrigger} />
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