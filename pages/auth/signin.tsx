import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box, Button, Card, CardContent, Container, TextField, Typography, Alert
} from '@mui/material';
import Head from 'next/head';
import Logo from '../../components/shared/logo';
import { GetStaticProps } from 'next';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('E-Mail oder Passwort ist falsch.');
      setLoading(false);
    } else {
      router.push('/de/Umsetzungsplan');
    }
  };

  return (
    <>
      <Head>
        <title>Login | Wesner Software</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}>
        <Container maxWidth="sm">
          <Card elevation={4} sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ width: 150 }}> <Logo /> </Box>
              </Box>

              <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                Kundenportal Login
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                Bitte melden Sie sich an, um fortzufahren.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {error && <Alert severity="error">{error}</Alert>}
                  <TextField label="E-Mail" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <TextField label="Passwort" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 1 }}>
                    {loading ? 'Wird angemeldet...' : 'Anmelden'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale || 'de'}/shared.json`),
      locale: locale || 'de'
    },
  };
};

export default SignInPage;