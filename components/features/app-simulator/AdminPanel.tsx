import React, { useEffect, useState } from 'react';
import {
  Paper, Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, Tooltip, IconButton, Dialog, DialogContent, Grid, TextField, DialogActions, DialogTitle
} from '@mui/material';
import {
  Add, Delete, Edit, Event, Save, Close, Group, Lock
} from '@mui/icons-material';
import { supabase } from '../../../utils/supabaseClient';
import { Course, CourseSession } from './types';

interface AdminPanelProps {
  onDataChange: () => void;
  isReadOnly?: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onDataChange, isReadOnly = false }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [isCourseDialogOpen, setCourseDialogOpen] = useState(false);
  const [isSessionManagerOpen, setSessionManagerOpen] = useState(false);

  const [editingCourse, setEditingCourse] = useState<Partial<Course>>({});

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [courseSessionsList, setCourseSessionsList] = useState<CourseSession[]>([]);
  const [sessionForm, setSessionForm] = useState<{id?: number, date: string, time: string, seats: string}>({
    date: '', time: '10:00', seats: '10'
  });

  const checkAccess = () => {
    if (isReadOnly) {
      alert("Access denied. This is a demo mode for the user.");
      return false;
    }
    return true;
  };

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*, course_sessions(id, start_time, max_participants, bookings(count))')
      .order('id');
    setCourses((data as unknown as Course[]) || []);
  };

  useEffect(() => { fetchCourses(); }, []);

  const fetchSessionsForManager = async (courseId: number) => {
    const { data } = await supabase
      .from('course_sessions')
      .select('*')
      .eq('course_id', courseId)
      .order('start_time');
    setCourseSessionsList((data as unknown as CourseSession[]) || []);
  };


  const handleSaveCourse = async () => {
    if (!checkAccess()) return;
    if (!editingCourse.title) return;

    const { course_sessions, ...courseData } = editingCourse as Course;

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
    if (!checkAccess()) return;
    if (!window.confirm('Möchten Sie diesen Kurs wirklich löschen?')) return;

    const { data: sessions } = await supabase.from('course_sessions').select('id').eq('course_id', id);
    if (sessions && sessions.length > 0) {
      alert(`Bitte löschen Sie erst alle Termine für diesen Kurs.`);
      return;
    }

    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) alert('Fehler: ' + error.message);
    else {
      await fetchCourses();
      onDataChange();
    }
  };

  const openSessionManager = (courseId: number) => {
    if (!checkAccess()) return;
    setSelectedCourseId(courseId);
    setSessionForm({ date: '', time: '10:00', seats: '10' });
    fetchSessionsForManager(courseId);
    setSessionManagerOpen(true);
  };

  const handleSaveSession = async () => {
    if (!checkAccess()) return;
    if (!selectedCourseId || !sessionForm.date || !sessionForm.seats) return;

    const seatsNum = Number(sessionForm.seats);
    if (seatsNum <= 0) { alert("Die Teilnehmerzahl muss größer als 0 sein."); return; }

    const isoString = new Date(`${sessionForm.date}T${sessionForm.time}`).toISOString();

    if (sessionForm.id) {
      const { error } = await supabase
        .from('course_sessions')
        .update({ start_time: isoString, max_participants: seatsNum })
        .eq('id', sessionForm.id);
      if (error) alert('Fehler: ' + error.message);
    } else {
      const { error } = await supabase
        .from('course_sessions')
        .insert([{ course_id: selectedCourseId, start_time: isoString, max_participants: seatsNum }]);
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
    if (!checkAccess()) return;
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
    <Paper sx={{ p: 3, height: '100%', position: 'relative', overflow: 'hidden' }}>

      {isReadOnly && (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.6)', zIndex: 10,
            backdropFilter: 'blur(3px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 4, boxShadow: 6, textAlign: 'center' }}>
            <Lock sx={{ fontSize: 50, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.primary" fontWeight="bold">Admin-Bereich</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sie haben keine Berechtigung,<br/> diesen Bereich zu bearbeiten.
            </Typography>
          </Box>
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">Kursverwaltung</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => { setEditingCourse({}); setCourseDialogOpen(true); }}
          disabled={isReadOnly}
        >
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
                  {!hasAnySessions && (
                    <Typography variant="caption" display="block" color="warning.main" sx={{ lineHeight: 1 }}>
                      Keine Termine!
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {nextSession ? (
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body2" fontWeight="500">
                        {new Date(nextSession.start_time).toLocaleDateString('de-DE')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(nextSession.start_time).toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})} Uhr
                      </Typography>
                      {futureSessions.length > 1 && (
                        <Chip label={`+${futureSessions.length - 1}`} size="small" sx={{ height: 20, fontSize: '0.65rem', mt: 0.5, width: 'fit-content' }} />
                      )}
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
                            <Typography variant="body2" fontWeight={isFull ? "bold" : "regular"} color={isFull ? "error.main" : "text.primary"}>
                              {booked} / {max}
                            </Typography>
                          </>
                        );
                      })()}
                    </Box>
                  ) : '-'}
                </TableCell>
                <TableCell>{course.duration_min} min</TableCell>
                <TableCell align="right">
                  <Tooltip title="Termine">
                    <span>
                      <IconButton
                        color={hasAnySessions ? "primary" : "warning"}
                        onClick={() => openSessionManager(course.id)}
                        disabled={isReadOnly}
                      >
                        <Event />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Bearbeiten">
                    <span>
                      <IconButton
                        onClick={() => { setEditingCourse(course); setCourseDialogOpen(true); }}
                        disabled={isReadOnly}
                      >
                        <Edit />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Löschen">
                    <span>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteCourse(course.id)}
                        disabled={isReadOnly}
                      >
                        <Delete />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
          {courses.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                Keine Kurse gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>


      <Dialog open={isCourseDialogOpen} onClose={() => setCourseDialogOpen(false)} maxWidth="md" fullWidth>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3} borderBottom="1px solid #eee">
          <Typography variant="h6" fontWeight="bold">
            {editingCourse.id ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen'}
          </Typography>
          <IconButton onClick={() => setCourseDialogOpen(false)} size="small"><Close /></IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Kurstitel" fullWidth variant="outlined"
                value={editingCourse.title || ''}
                onChange={e => setEditingCourse({...editingCourse, title: e.target.value})}
                placeholder="z.B. Yoga für Anfänger"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Dauer (Minuten)" type="number" fullWidth variant="outlined"
                value={editingCourse.duration_min || ''}
                onChange={e => setEditingCourse({...editingCourse, duration_min: Number(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Beschreibung" multiline rows={4} fullWidth variant="outlined"
                value={editingCourse.description || ''}
                onChange={e => setEditingCourse({...editingCourse, description: e.target.value})}
                placeholder="Beschreiben Sie den Inhalt des Kurses..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bild URL" fullWidth variant="outlined"
                value={editingCourse.image_url || ''}
                onChange={e => setEditingCourse({...editingCourse, image_url: e.target.value})}
                helperText="Link zu einem Bild (z.B. https://example.com/image.jpg)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', height: 120, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {editingCourse.image_url ? (
                  <img src={editingCourse.image_url} alt="Vorschau" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <Typography variant="caption" color="text.secondary">Bildvorschau</Typography>
                )}
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
              {courseSessionsList.length === 0 ? <Typography variant="body2" color="text.secondary">Noch keine Termine erstellt.</Typography> :
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Datum</TableCell>
                      <TableCell>Zeit</TableCell>
                      <TableCell>Plätze</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
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
              }
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
                    {sessionForm.id && (
                      <Button size="small" variant="outlined" color="inherit" onClick={() => setSessionForm({ id: undefined, date: '', time: '10:00', seats: '10' })}>
                        Abbrechen
                      </Button>
                    )}
                    <Button fullWidth variant="contained" color={sessionForm.id ? "warning" : "primary"} startIcon={sessionForm.id ? <Save /> : <Add />} onClick={handleSaveSession}>
                      {sessionForm.id ? 'Aktualisieren' : 'Hinzufügen'}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions><Button onClick={() => setSessionManagerOpen(false)}>Schließen</Button></DialogActions>
      </Dialog>

    </Paper>
  );
};