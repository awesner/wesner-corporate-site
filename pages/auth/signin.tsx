import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box, Button, Card, CardContent, TextField, Typography, Alert,
  InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Head from 'next/head';
import Logo from '../../components/shared/logo';
import { GetStaticProps } from 'next';

const RegisterDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async () => {
    setError('');
    if (!username || !password || !confirmPassword) { setError('Bitte füllen Sie alle Felder aus.'); return; }
    if (password !== confirmPassword) { setError('Die Passwörter stimmen nicht überein.'); return; }
    if (password.length < 6) { setError('Das Passwort muss mindestens 6 Zeichen lang sein.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) { setError(data.message || 'Registrierung fehlgeschlagen.'); }
      else {
        setSuccess(true);
        setTimeout(() => { onClose(); setSuccess(false); setUsername(''); setPassword(''); setConfirmPassword(''); }, 2000);
      }
    } catch (e) { setError('Ein Fehler ist aufgetreten.'); } finally { setLoading(false); }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{ zIndex: 100001 }}
    >
      <DialogTitle fontWeight="bold">Neues Konto erstellen</DialogTitle>
      <DialogContent>
        {success ? ( <Alert severity="success" sx={{ mt: 2 }}>Registrierung erfolgreich! Sie können sich jetzt anmelden.</Alert> ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Benutzername" fullWidth size="small" value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextField
              label="Passwort" type={showPass ? 'text' : 'password'} fullWidth size="small"
              value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} onMouseDown={(e) => e.preventDefault()} edge="end">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
              }}
            />
            <TextField
              label="Passwort wiederholen" type={showConfirm ? 'text' : 'password'} fullWidth size="small"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirm(!showConfirm)} onMouseDown={(e) => e.preventDefault()} edge="end">{showConfirm ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        {!success && ( <> <Button onClick={onClose} color="inherit">Abbrechen</Button> <Button onClick={handleRegister} variant="contained" disabled={loading}>{loading ? '...' : 'Registrieren'}</Button> </> )}
      </DialogActions>
    </Dialog>
  );
};

const SignInPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false
    });

    if (res?.error) {
      setError('Benutzername oder Passwort ist falsch.');
      setLoading(false);
    }
    else {
      const callbackUrl = router.query.callbackUrl as string;

      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/de/Umsetzungsplan');
      }
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
        position: 'relative',
        zIndex: 100000
      }}>

        <Box width="100%" maxWidth={400} p={2}>
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

                  <TextField
                    label="Benutzername" fullWidth required
                    value={username} onChange={(e) => setUsername(e.target.value)}
                  />

                  <TextField
                    label="Passwort"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                            sx={{ position: 'relative', zIndex: 100002 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 1 }}>
                    {loading ? 'Wird angemeldet...' : 'Anmelden'}
                  </Button>

                  <Box mt={1} textAlign="center">
                    <Typography variant="body2">
                      Noch kein Konto?{' '}
                      <span
                        style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                        onClick={() => setIsRegisterOpen(true)}
                      >
                        Jetzt registrieren
                      </span>
                    </Typography>
                  </Box>

                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <RegisterDialog open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
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