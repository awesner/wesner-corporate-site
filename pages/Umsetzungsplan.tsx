import React, { useState, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';
import { signOut, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Container, Typography, Box, Button, Paper, Alert, Chip, Divider,
  TextField, Card, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { BaseLayout } from '@components/layouts/base-layout';

interface Comment {
  id: number;
  message: string;
  created_at: string;
  author_name: string;
  author_role: string;
  is_me: boolean;
}

interface ProjectData {
  id: number;
  title: string;
  content?: string;
  status: string;
  created_at: string;
  client_name?: string;
}

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth sx={{ zIndex: 100001 }}>
      <DialogTitle fontWeight="bold">Neues Konto erstellen</DialogTitle>
      <DialogContent>
        {success ? ( <Alert severity="success" sx={{ mt: 2 }}>Registrierung erfolgreich! Sie können sich jetzt anmelden.</Alert> ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Benutzername" fullWidth size="small" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField
              label="Passwort" type={showPass ? 'text' : 'password'} fullWidth size="small"
              value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} onMouseDown={(e) => e.preventDefault()} edge="end">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}
            />
            <TextField
              label="Passwort wiederholen" type={showConfirm ? 'text' : 'password'} fullWidth size="small"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirm(!showConfirm)} onMouseDown={(e) => e.preventDefault()} edge="end">{showConfirm ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}
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

const InlineLoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await signIn('credentials', { username, password, redirect: false });
    if (res?.error) { setError('Benutzername oder Passwort ist falsch.'); setLoading(false); }
    else { router.reload(); }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} textAlign="center" p={3} bgcolor="#f0f7ff" borderRadius={2} mb={3}>
        <Typography gutterBottom variant="h6" fontWeight="bold">Anmelden</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Melden Sie sich an, um zu kommentieren.</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto">
          <TextField label="Benutzername" size="small" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField
            label="Passwort" type={showPass ? 'text' : 'password'} size="small" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} onMouseDown={(e) => e.preventDefault()} edge="end">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}
          />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Wird angemeldet...' : 'Anmelden'}</Button>
          <Box mt={1}>
            <Typography variant="body2">Noch kein Konto?{' '}<span style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }} onClick={() => setIsRegisterOpen(true)}>Jetzt registrieren</span></Typography>
          </Box>
        </Box>
      </Box>
      <RegisterDialog open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};

export default function Umsetzungsplan() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('project_detail');
  const [project, setProject] = useState<ProjectData | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = id ? `?id=${id}` : '';
        const res = await fetch(`/api/projects/details${queryParams}`);
        const data = await res.json();

        setViewMode(data.viewMode);
        setProject(data.project);
        setProjectsList(data.projectsList || []);
        setComments(data.comments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [router.isReady, id, session]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !project || !session?.user) return;
    setIsSending(true);
    try {
      const res = await fetch('/api/projects/comment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, message: newMessage }),
      });
      if (res.ok) {
        const newMsgObj: Comment = {
          id: Date.now(), message: newMessage, created_at: new Date().toISOString(),
          author_name: session.user.name || 'User', author_role: session.user.role, is_me: true
        };
        setComments((prev) => [newMsgObj, ...prev]);
        setNewMessage('');
      } else { alert('Fehler beim Senden.'); }
    } catch (e) { console.error(e); } finally { setIsSending(false); }
  };

  const handleLogout = () => signOut({ callbackUrl: '/de/auth/signin' });
  const isLoggedIn = !!session;

  if (loading || status === 'loading') {
    return (
      <BaseLayout>
        <Head><title>Laden... | Wesner Software</title></Head>
        <Container sx={{ py: 15, textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>Daten werden geladen...</Typography>
        </Container>
      </BaseLayout>
    );
  }

  if (viewMode === 'admin_list') {
    return (
      <BaseLayout>
        <Head><title>Admin Dashboard</title></Head>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Typography variant="h4" fontWeight="bold">Kundenprojekte</Typography>
            <Button variant="outlined" color="error" onClick={handleLogout}>Abmelden</Button>
          </Box>
          <Grid container spacing={3}>
            {projectsList?.map((p) => (
              <Grid item xs={12} md={6} key={p.id}>
                <Card elevation={3} sx={{ p: 3, cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => router.push(`/de/Umsetzungsplan?id=${p.id}`)}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Chip label={p.status} color="primary" size="small" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">ID: #{p.id}</Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{p.title}</Typography>
                  <Typography color="text.secondary">Kunde: {p.client_name}</Typography>
                  <Button sx={{ mt: 2 }} variant="text">Öffnen &rarr;</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </BaseLayout>
    );
  }

  if (!project) {
    return (
      <BaseLayout>
        <Head><title>Fehler | Wesner Software</title></Head>
        <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
          <Alert severity="warning" sx={{ mb: 3 }}>Projekt nicht gefunden oder Zugriff verweigert.</Alert>
          {!isLoggedIn && <Button variant="contained" onClick={() => signIn()}>Anmelden</Button>}
        </Container>
      </BaseLayout>
    );
  }

  const formattedContent = project.content ? project.content.replace(/\\n/g, '\n') : '';

  return (
    <BaseLayout>
      <Head><title>Projektplan | Wesner Software</title></Head>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>

          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
            <Box>
              {session?.user?.role === 'admin' && (
                <Button size="small" onClick={() => router.push('/de/Umsetzungsplan')} sx={{ mb: 1, p: 0, justifyContent: 'flex-start' }}>&larr; Zurück zur Übersicht</Button>
              )}
              <Typography variant="h4" fontWeight="bold">Projektplan</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {isLoggedIn ? `Angemeldet als: ${session.user?.name}` : 'Gastzugang (Schreibgeschützt)'}
              </Typography>
            </Box>
            {isLoggedIn ? (
              <Button variant="outlined" color="error" onClick={handleLogout}>Abmelden</Button>
            ) : (
              <Button variant="contained" onClick={() => loginFormRef.current?.scrollIntoView({ behavior: 'smooth' })}>Anmelden</Button>
            )}
          </Box>

          <Box mb={4}>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={`Status: ${project.status}`} color="success" variant="outlined" />
              <Chip label={`ID: #${project.id}`} variant="outlined" />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="primary">{project.title}</Typography>
            <Box sx={{ mt: 3, p: 3, bgcolor: '#f8f9fa', borderRadius: 2, '& h1, & h2': { mb: 1 }, '& ul': { pl: 3 } }}>
              <ReactMarkdown>{formattedContent}</ReactMarkdown>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">Kommentare & Fragen</Typography>

          {isLoggedIn ? (
            <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); void handleSendMessage(); }} display="flex" gap={2} alignItems="flex-start" sx={{ position: 'relative', zIndex: 9999, mb: 3 }}>
              <TextField fullWidth placeholder="Schreiben Sie einen Kommentar..." size="small" multiline maxRows={4} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleSendMessage(); }}} sx={{ bgcolor: 'white' }} />
              <Button type="submit" variant="contained" disabled={!newMessage.trim() || isSending} sx={{ minWidth: 100, fontWeight: 'bold', height: '40px', position: 'relative', zIndex: 10000 }}>{isSending ? '...' : 'Senden'}</Button>
            </Box>
          ) : (
            <Box ref={loginFormRef}><InlineLoginForm /></Box>
          )}

          <Box sx={{ bgcolor: '#fff', borderTop: '1px solid #eee', pt: 2 }}>
            {comments.length > 0 ? (
              comments.map((msg) => (
                <Box key={msg.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.is_me ? 'flex-end' : 'flex-start', mb: 2 }}>
                  <Box sx={{ maxWidth: '80%', bgcolor: msg.is_me ? '#e3f2fd' : '#f5f5f5', p: 2, borderRadius: 2, borderTopRightRadius: msg.is_me ? 0 : 8, borderTopLeftRadius: msg.is_me ? 8 : 0 }}>
                    <Typography variant="caption" display="block" color="text.secondary" mb={0.5}>{msg.author_name} ({msg.author_role === 'admin' ? 'Admin' : 'Kunde'})</Typography>
                    <Typography variant="body2">{msg.message}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }} suppressHydrationWarning>{new Date(msg.created_at).toLocaleString('de-DE')}</Typography>
                </Box>
              ))
            ) : ( <Typography color="text.secondary" align="center" py={4}>Noch keine Nachrichten.</Typography> )}
          </Box>

        </Paper>
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