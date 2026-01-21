import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import {
  Container, Grid, Paper, Typography, Box, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Chip, Card, CardMedia, CardContent, Tooltip
} from '@mui/material';
import {
  Delete, Edit, Add, Event,
  AccessTime, CalendarToday, Group, HourglassEmpty, ArrowBack, Save, Close
} from '@mui/icons-material';
import Head from 'next/head';
import { supabase } from '../utils/supabaseClient';
import { BaseLayout } from '@components/layouts/base-layout';

interface Course {
  id: number;
  title: string;
  description: string;
  duration_min: number;
  image_url: string;
  course_sessions?: { id: number; start_time: string; max_participants: number; bookings: { count: number }[]; }[];
}

interface CourseSession {
  id: number;
  course_id: number;
  start_time: string;
  max_participants: number;
  course?: Course;
  bookings?: { count: number }[];
}

const AppSimulator = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [sessions, setSessions] = useState<CourseSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null);

  useEffect(() => {
    const fetchAppContent = async () => {
      setLoading(true);
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('course_sessions')
        .select(`*, course:courses(*), bookings(count)`)
        .gte('start_time', now)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Simulator error:', error);
      } else {
        const newSessions = (data as any) || [];
        setSessions(newSessions);
        if (selectedSession) {
          const updated = newSessions.find((s: CourseSession) => s.id === selectedSession.id);
          setSelectedSession(updated || null);
        }
      }
      setLoading(false);
    };

    fetchAppContent();
  }, [refreshTrigger]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" gutterBottom>App Simulator (User View)</Typography>
      <Box sx={{ width: 375, height: 667, border: '12px solid #1c1c1c', borderRadius: '36px', overflow: 'hidden', position: 'relative', bgcolor: '#fff', boxShadow: '0px 20px 40px rgba(0,0,0,0.2)' }}>
        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 150, height: 24, bgcolor: '#1c1c1c', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 20 }} />

        {!selectedSession && (
          <Box sx={{ height: '100%', overflowY: 'auto', pt: 6, px: 2, pb: 4, bgcolor: '#f5f5f5' }}>
            <Typography variant="h5" fontWeight="900" mb={2} sx={{ color: '#000' }}>Kurse</Typography>
            {loading ? <Typography align="center" mt={4} color="text.secondary">Laden...</Typography> : sessions.map((session) => {
              const bookedCount = session.bookings?.[0]?.count || 0;
              const max = session.max_participants;
              const dateObj = new Date(session.start_time);
              return (
                <Card key={session.id} onClick={() => setSelectedSession(session)} sx={{ mb: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', '&:active': { opacity: 0.9 } }}>
                  {session.course?.image_url && <CardMedia component="img" height="140" image={session.course.image_url} alt={session.course.title} />}
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="h6" fontWeight="bold" lineHeight={1.2} mb={1} mt={2}>{session.course?.title}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <CalendarToday sx={{ fontSize: 16, color: '#1976d2' }} />
                      <Typography variant="body2" fontWeight="500" color="#1976d2" suppressHydrationWarning>{dateObj.toLocaleDateString('de-DE')}</Typography>
                      <Typography variant="caption" color="text.secondary">•</Typography>
                      <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary" suppressHydrationWarning>{dateObj.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <HourglassEmpty sx={{ fontSize: 16, color: '#8d6e63' }} />
                      <Typography variant="body2" color="text.secondary">{session.course?.duration_min} Min.</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Group sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">{bookedCount} / {max} Teilnehmer</Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
            {!loading && sessions.length === 0 && <Typography variant="body2" color="text.secondary" align="center" mt={4}>Keine Kurse verfügbar.</Typography>}
          </Box>
        )}

        {selectedSession && (
          <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: '#fff', pb: 4 }}>
            <Box display="flex" alignItems="center" p={2} pt={5} bgcolor="#fff">
              <IconButton onClick={() => setSelectedSession(null)} size="small" sx={{ mr: 1, color: '#000' }}><ArrowBack /></IconButton>
              <Typography variant="h6" fontWeight="bold">Details</Typography>
            </Box>
            {selectedSession.course?.image_url && (
              <Box sx={{ width: '100%', height: 200 }}>
                <img src={selectedSession.course.image_url} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box p={3}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>{selectedSession.course?.title}</Typography>
              <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: 2, mb: 3 }}>
                <Box mb={1.5}><Box display="flex" alignItems="center" gap={1} mb={0.5}><CalendarToday sx={{ fontSize: 18, color: '#1976d2' }} /><Typography variant="caption" color="text.secondary">Datum:</Typography></Box><Typography variant="body1" fontWeight="bold" suppressHydrationWarning>{new Date(selectedSession.start_time).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</Typography></Box>
                <Box mb={1.5}><Box display="flex" alignItems="center" gap={1} mb={0.5}><AccessTime sx={{ fontSize: 18, color: '#666' }} /><Typography variant="caption" color="text.secondary">Uhrzeit:</Typography></Box><Typography variant="body1" fontWeight="bold" suppressHydrationWarning>{new Date(selectedSession.start_time).toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</Typography></Box>
                <Box mb={1.5}><Box display="flex" alignItems="center" gap={1} mb={0.5}><HourglassEmpty sx={{ fontSize: 18, color: '#8d6e63' }} /><Typography variant="caption" color="text.secondary">Dauer:</Typography></Box><Typography variant="body1" fontWeight="bold">{selectedSession.course?.duration_min} Minuten</Typography></Box>
                <Box><Box display="flex" alignItems="center" gap={1} mb={0.5}><Group sx={{ fontSize: 18, color: '#666' }} /><Typography variant="caption" color="text.secondary">Plätze:</Typography></Box><Typography variant="body1" fontWeight="bold">{selectedSession.bookings?.[0]?.count || 0} von {selectedSession.max_participants} belegt</Typography></Box>
              </Box>
              <Typography variant="h6" fontSize="1.1rem" fontWeight="bold" gutterBottom>Beschreibung:</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, mb: 4 }}>{selectedSession.course?.description || 'Keine Beschreibung verfügbar.'}</Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, bgcolor: '#000', borderRadius: 3, opacity: 0.3 }} />
      </Box>
    </Box>
  );
};

const AdminPanel = ({ onDataChange }: { onDataChange: () => void }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCourseDialogOpen, setCourseDialogOpen] = useState(false);
  const [isSessionManagerOpen, setSessionManagerOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course>>({});

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [courseSessionsList, setCourseSessionsList] = useState<CourseSession[]>([]);
  const [sessionForm, setSessionForm] = useState<{id?: number, date: string, time: string, seats: string}>({
    date: '', time: '10:00', seats: '10'
  });

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*, course_sessions(id, start_time, max_participants, bookings(count))')
      .order('id');
    setCourses(data || []);
  };

  useEffect(() => { fetchCourses(); }, []);

  const fetchSessionsForManager = async (courseId: number) => {
    const { data } = await supabase.from('course_sessions').select('*').eq('course_id', courseId).order('start_time');
    setCourseSessionsList((data as any) || []);
  };

  const openSessionManager = (courseId: number) => {
    setSelectedCourseId(courseId);
    setSessionForm({ date: '', time: '10:00', seats: '10' });
    fetchSessionsForManager(courseId);
    setSessionManagerOpen(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse.title) return;

    const cleanTitle = editingCourse.title.trim();

    if (!editingCourse.id) {
      const { data: existingData } = await supabase
        .from('courses')
        .select('id')
        .ilike('title', cleanTitle);

      if (existingData && existingData.length > 0) {
        alert(`Ein Kurs mit dem Namen "${cleanTitle}" existiert bereits! Bitte nutzen Sie den bestehenden Kurs.`);
        return;
      }
    }

    const { course_sessions, ...courseData } = editingCourse as Course;

    courseData.title = cleanTitle;

    if (courseData.id) {
      await supabase.from('courses').update(courseData).eq('id', courseData.id);
    } else {
      await supabase.from('courses').insert([courseData]);
    }

    setCourseDialogOpen(false);
    await fetchCourses();
    onDataChange();
  };

  const handleDeleteCourse = async (id: number) => {
    if (!window.confirm('Möchten Sie diesen Kurs wirklich löschen?')) return;
    const { data: sessions } = await supabase.from('course_sessions').select('id').eq('course_id', id);
    if (sessions && sessions.length > 0) {
      alert(`Bitte löschen Sie erst alle Termine für diesen Kurs.`);
      return;
    }
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) alert('Fehler: ' + error.message);
    else { await fetchCourses(); onDataChange(); }
  };

  const handleSaveSession = async () => {
    if (!selectedCourseId || !sessionForm.date || !sessionForm.seats) return;
    const seatsNum = Number(sessionForm.seats);
    if (seatsNum <= 0) { alert("Die Teilnehmerzahl muss größer als 0 sein."); return; }
    const isoString = new Date(`${sessionForm.date}T${sessionForm.time}`).toISOString();

    if (sessionForm.id) {
      const { error } = await supabase.from('course_sessions').update({ start_time: isoString, max_participants: seatsNum }).eq('id', sessionForm.id);
      if (error) alert('Fehler: ' + error.message);
    } else {
      const { error } = await supabase.from('course_sessions').insert([{ course_id: selectedCourseId, start_time: isoString, max_participants: seatsNum }]);
      if (error) alert('Fehler: ' + error.message);
    }
    setSessionForm({ id: undefined, date: '', time: '10:00', seats: '10' });
    await fetchSessionsForManager(selectedCourseId);
    await fetchCourses();
    onDataChange();
  };

  const handleEditSession = (session: CourseSession) => {
    const dateObj = new Date(session.start_time);
    const dateStr = dateObj.toISOString().split('T')[0];
    const timeStr = dateObj.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    setSessionForm({ id: session.id, date: dateStr, time: timeStr, seats: String(session.max_participants) });
  };

  const handleDeleteSession = async (sessionId: number) => {
    if (!window.confirm('Termin löschen?')) return;
    const { data: bookings } = await supabase.from('bookings').select('id').eq('session_id', sessionId);
    if (bookings && bookings.length > 0) {
      alert(`Dieser Termin hat bereits ${bookings.length} Buchungen und kann nicht gelöscht werden.`);
      return;
    }
    await supabase.from('course_sessions').delete().eq('id', sessionId);
    if (selectedCourseId) await fetchSessionsForManager(selectedCourseId);
    await fetchCourses();
    onDataChange();
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">Kursverwaltung</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingCourse({}); setCourseDialogOpen(true); }}>
          Neuer Kurs
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f5f5f5' }}>
            <TableCell>ID</TableCell>
            <TableCell>Titel</TableCell>
            <TableCell>Nächster Termin</TableCell>
            <TableCell>Plätze</TableCell>
            <TableCell>Dauer</TableCell>
            <TableCell align="right">Aktionen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => {
            const sessions = course.course_sessions || [];
            const now = new Date();
            const futureSessions = sessions
              .filter(s => new Date(s.start_time) >= now)
              .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
            const nextSession = futureSessions[0];
            const hasAnySessions = sessions.length > 0;

            return (
              <TableRow key={course.id} sx={{ bgcolor: index % 2 === 0 ? 'white' : '#fafafa' }}>
                <TableCell>{course.id}</TableCell>
                <TableCell>
                  <b>{course.title}</b>
                  {!hasAnySessions && <Typography variant="caption" display="block" color="warning.main" sx={{ lineHeight: 1 }}>Keine Termine!</Typography>}
                </TableCell>
                <TableCell>
                  {nextSession ? (
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body2" fontWeight="500">{new Date(nextSession.start_time).toLocaleDateString('de-DE')}</Typography>
                      <Typography variant="caption" color="text.secondary">{new Date(nextSession.start_time).toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})} Uhr</Typography>
                      {futureSessions.length > 1 && <Chip label={`+${futureSessions.length - 1} weitere`} size="small" sx={{ height: 20, fontSize: '0.65rem', mt: 0.5, width: 'fit-content' }} />}
                    </Box>
                  ) : <Typography variant="body2" color="text.secondary">-</Typography>}
                </TableCell>
                <TableCell>
                  {nextSession ? (
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {(() => {
                        const booked = nextSession.bookings?.[0]?.count || 0;
                        const max = nextSession.max_participants;
                        const isFull = booked >= max;
                        return (
                          <>
                            <Group fontSize="small" color={isFull ? "error" : "action"} />
                            <Typography variant="body2" fontWeight={isFull ? "bold" : "regular"} color={isFull ? "error.main" : "text.primary"}>{booked} / {max}</Typography>
                          </>
                        );
                      })()}
                    </Box>
                  ) : '-'}
                </TableCell>
                <TableCell>{course.duration_min} min</TableCell>
                <TableCell align="right">
                  <Tooltip title={hasAnySessions ? "Termine verwalten" : "Termin hinzufügen"} arrow placement="bottom" componentsProps={{ tooltip: { sx: { bgcolor: '#333' } }, arrow: { sx: { color: '#333' } } }}>
                    <IconButton color={hasAnySessions ? "primary" : "warning"} onClick={() => openSessionManager(course.id)}><Event /></IconButton>
                  </Tooltip>
                  <Tooltip title="Bearbeiten" arrow placement="bottom" componentsProps={{ tooltip: { sx: { bgcolor: '#333' } }, arrow: { sx: { color: '#333' } } }}>
                    <IconButton onClick={() => { setEditingCourse(course); setCourseDialogOpen(true); }}><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Löschen" arrow placement="bottom" componentsProps={{ tooltip: { sx: { bgcolor: '#d32f2f' } }, arrow: { sx: { color: '#d32f2f' } } }}>
                    <IconButton color="error" onClick={() => handleDeleteCourse(course.id)}><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={isCourseDialogOpen} onClose={() => setCourseDialogOpen(false)} maxWidth="md" fullWidth>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3} borderBottom="1px solid #eee">
          <Typography variant="h6" fontWeight="bold">{editingCourse.id ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen'}</Typography>
          <IconButton onClick={() => setCourseDialogOpen(false)} size="small"><Close /></IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={8}>
              <TextField label="Kurstitel" fullWidth variant="outlined" value={editingCourse.title || ''} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} placeholder="z.B. Yoga für Anfänger" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Dauer (Minuten)" type="number" fullWidth variant="outlined" value={editingCourse.duration_min || ''} onChange={e => setEditingCourse({...editingCourse, duration_min: Number(e.target.value)})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Beschreibung" multiline rows={4} fullWidth variant="outlined" value={editingCourse.description || ''} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} placeholder="Beschreiben Sie den Inhalt des Kurses..." />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Bild URL" fullWidth variant="outlined" value={editingCourse.image_url || ''} onChange={e => setEditingCourse({...editingCourse, image_url: e.target.value})} helperText="Link zu einem Bild (z.B. https://example.com/image.jpg)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', height: 120, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {editingCourse.image_url ? (
                  <img src={editingCourse.image_url} alt="Vorschau" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : ( <Typography variant="caption" color="text.secondary">Bildvorschau</Typography> )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setCourseDialogOpen(false)} size="large" color="inherit">Abbrechen</Button>
          <Button variant="contained" onClick={handleSaveCourse} size="large" sx={{ px: 4 }}>Speichern</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isSessionManagerOpen} onClose={() => setSessionManagerOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Termine verwalten</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">Existierende Termine:</Typography>
              {courseSessionsList.length === 0 ? (
                <Typography variant="body2" color="text.secondary">Noch keine Termine erstellt.</Typography>
              ) : (
                <Table size="small">
                  <TableHead><TableRow><TableCell>Datum</TableCell><TableCell>Zeit</TableCell><TableCell>Plätze</TableCell><TableCell align="right"></TableCell></TableRow></TableHead>
                  <TableBody>
                    {courseSessionsList.map(s => (
                      <TableRow key={s.id} selected={sessionForm.id === s.id}>
                        <TableCell>{new Date(s.start_time).toLocaleDateString('de-DE')}</TableCell>
                        <TableCell>{new Date(s.start_time).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})}</TableCell>
                        <TableCell>{s.max_participants}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleEditSession(s)}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDeleteSession(s.id)}><Delete fontSize="small" /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }} variant="outlined">
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  {sessionForm.id ? 'Termin bearbeiten' : 'Neuen Termin hinzufügen'}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  <TextField type="date" label="Datum" InputLabelProps={{ shrink: true }} size="small" fullWidth value={sessionForm.date} onChange={e => setSessionForm({...sessionForm, date: e.target.value})} />
                  <TextField type="time" label="Uhrzeit" InputLabelProps={{ shrink: true }} size="small" fullWidth value={sessionForm.time} onChange={e => setSessionForm({...sessionForm, time: e.target.value})} />
                  <TextField label="Max. Teilnehmer" type="number" size="small" fullWidth value={sessionForm.seats} onChange={e => setSessionForm({...sessionForm, seats: e.target.value})} />
                  <Box display="flex" gap={1} mt={1}>
                    {sessionForm.id && <Button size="small" variant="outlined" color="inherit" onClick={() => setSessionForm({ id: undefined, date: '', time: '10:00', seats: '10' })}>Abbrechen</Button>}
                    <Button fullWidth variant="contained" color={sessionForm.id ? "warning" : "primary"} startIcon={sessionForm.id ? <Save /> : <Add />} onClick={handleSaveSession}>{sessionForm.id ? 'Aktualisieren' : 'Hinzufügen'}</Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionManagerOpen(false)}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default function Umsetzung() {
  const { data: session } = useSession();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerUpdate = () => setRefreshTrigger(prev => prev + 1);

  return (
    <BaseLayout>
      <Head><title>App Simulator | Wesner Software</title><meta name="robots" content="noindex, nofollow" /></Head>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold">Admin-Panel & App Simulator</Typography>
          <Typography color="text.secondary">Verwalten Sie Kurse links und sehen Sie das Ergebnis live rechts.</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}><AdminPanel onDataChange={triggerUpdate} /></Grid>
          <Grid item xs={12} md={5} lg={4}><Box display="flex" justifyContent="center"><AppSimulator refreshTrigger={refreshTrigger} /></Box></Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.locale !== 'de') return { redirect: { destination: '/de/Umsetzung', permanent: false } };
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/de/auth/signin', permanent: false } };
  return { props: { session, messages: require(`../locales/de/shared.json`), locale: 'de' } };
};