import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent, IconButton, CircularProgress,
  BottomNavigation, BottomNavigationAction, Paper, Button, Avatar, Chip
} from '@mui/material';
import {
  CalendarToday, AccessTime, ArrowBack,
  Home, Favorite, Notifications, Person, LocationOn, AdminPanelSettings
} from '@mui/icons-material';
import { supabase } from '../../../utils/supabaseClient';
import { CourseSession } from './types';
import { useSession } from 'next-auth/react';

interface AppSimulatorProps {
  refreshTrigger: number;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ refreshTrigger }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  const [activeTab, setActiveTab] = useState(0);

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

      if (error) console.error(error);
      else {
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

  const renderHome = () => (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ p: 3, bgcolor: '#fff', mb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight="900" gutterBottom>Wesner Health</Typography>
            <Box display="flex" alignItems="center" gap={1} mb={0.5} color="text.secondary">
              <LocationOn fontSize="small" />
              <Typography variant="caption">Musterstraße 1, Berlin</Typography>
            </Box>
          </Box>
          {isAdmin && <Chip label="Admin View" color="error" size="small" icon={<AdminPanelSettings />} />}
        </Box>
      </Box>

      <Box px={2}>
        <Typography variant="h6" fontWeight="bold" mb={2} mt={2}>Verfügbare Kurse</Typography>
        {loading ? <CircularProgress size={24} sx={{ mx: 'auto', display: 'block' }} /> : sessions.map((session) => {
          const bookedCount = session.bookings?.[0]?.count || 0;
          const max = session.max_participants;
          const dateObj = new Date(session.start_time);
          return (
            <Card key={session.id} onClick={() => setSelectedSession(session)} sx={{ mb: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', '&:active': { opacity: 0.9 } }}>
              {session.course?.image_url && <CardMedia component="img" height="120" image={session.course.image_url} alt={session.course.title} />}
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="subtitle1" fontWeight="bold" lineHeight={1.2} mb={1}>{session.course?.title}</Typography>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <CalendarToday sx={{ fontSize: 14, color: '#1976d2' }} />
                  <Typography variant="caption" fontWeight="500" color="#1976d2" suppressHydrationWarning>{dateObj.toLocaleDateString('de-DE')}</Typography>
                  <AccessTime sx={{ fontSize: 14, color: '#666', ml: 1 }} />
                  <Typography variant="caption" color="text.secondary" suppressHydrationWarning>{dateObj.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="caption" color="text.secondary">{session.course?.duration_min} Min.</Typography>
                  <Typography variant="caption" color={bookedCount >= max ? 'error.main' : 'text.secondary'} fontWeight={bookedCount >= max ? 'bold' : 'regular'}>
                    {bookedCount} / {max} Plätze
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );

  const renderAppointments = () => (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" fontWeight="900" mb={3}>Meine Termine</Typography>

      <Box bgcolor="#e8f5e9" p={2} borderRadius={2} mb={2} display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: isAdmin ? 'error.main' : 'primary.main' }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography variant="body2" color="success.main" fontWeight="bold">Angemeldet als:</Typography>
          <Typography variant="body2">{user?.name} ({isAdmin ? 'Admin' : 'User'})</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Anstehende Termine</Typography>
      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa', borderStyle: 'dashed' }}>
        <Typography variant="caption" color="text.secondary">Keine Buchungen vorhanden.</Typography>
        {isAdmin && <Typography variant="caption" display="block" color="error" mt={1}>(Als Admin sehen Sie hier Ihre persönlichen Buchungen, nicht alle.)</Typography>}
      </Paper>
    </Box>
  );

  const renderProfile = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="900" mb={3}>Konto</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: isAdmin ? '#d32f2f' : '#1976d2' }}>
          {user?.name?.[0]?.toUpperCase()}
        </Avatar>
        <Typography variant="h6">{user?.name}</Typography>
        <Chip label={isAdmin ? "Administrator" : "Mitglied"} color={isAdmin ? "error" : "primary"} size="small" sx={{ mt: 1 }} />
      </Box>
      <Button variant="outlined" fullWidth sx={{ mb: 2 }}>Profil bearbeiten</Button>
      <Button variant="outlined" color="error" fullWidth>Abmelden</Button>
    </Box>
  );

  const renderPlaceholder = (title: string, icon: React.ReactNode) => (
    <Box sx={{ p: 3, textAlign: 'center', mt: 10 }}>
      <Box sx={{ color: '#ccc', mb: 2 }}>{icon}</Box>
      <Typography variant="h6" color="text.secondary">{title}</Typography>
      <Typography variant="caption" color="text.secondary">Dieses Feature folgt bald.</Typography>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" gutterBottom>{isAdmin ? 'App Simulator (Admin View)' : 'Ihr persönlicher Bereich'}</Typography>
      <Box sx={{ width: 375, height: 667, border: '12px solid #1c1c1c', borderRadius: '36px', overflow: 'hidden', position: 'relative', bgcolor: '#fff', boxShadow: '0px 20px 40px rgba(0,0,0,0.2)' }}>

        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 150, height: 24, bgcolor: '#1c1c1c', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 20 }} />
        <Box sx={{ height: 44, bgcolor: '#fff', width: '100%', position: 'absolute', top: 0, zIndex: 10 }} />

        {!selectedSession ? (
          <Box sx={{ height: 'calc(100% - 80px)', overflowY: 'auto', mt: '44px', bgcolor: '#f5f5f5' }}>
            {activeTab === 0 && renderHome()}
            {activeTab === 1 && renderAppointments()}
            {activeTab === 2 && renderPlaceholder('Favoriten', <Favorite sx={{ fontSize: 40 }} />)}
            {activeTab === 3 && renderPlaceholder('Nachrichten', <Notifications sx={{ fontSize: 40 }} />)}
            {activeTab === 4 && renderProfile()}
          </Box>
        ) : (
          <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: '#fff', pb: 4, position: 'absolute', top: 0, width: '100%', zIndex: 15 }}>
            <Box display="flex" alignItems="center" p={2} pt={6} bgcolor="#fff" position="sticky" top={0} zIndex={10}>
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
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, mb: 4 }}>{selectedSession.course?.description}</Typography>

              <Button variant="contained" fullWidth size="large" sx={{ borderRadius: 3 }}>
                Jetzt Buchen
              </Button>
              {isAdmin && <Typography variant="caption" align="center" display="block" mt={1} color="text.secondary">(Admin Modus: Testbuchung)</Typography>}
            </Box>
          </Box>
        )}

        {!selectedSession && (
          <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, borderTop: '1px solid #eee' }} elevation={3}>
            <BottomNavigation
              value={activeTab}
              onChange={(event, newValue) => setActiveTab(newValue)}
              showLabels
              sx={{ height: 80, pb: 2, '& .MuiBottomNavigationAction-root': { minWidth: 'auto', px: 0 } }}
            >
              <BottomNavigationAction label="Start" icon={<Home />} />
              <BottomNavigationAction label="Termine" icon={<CalendarToday />} />
              <BottomNavigationAction label="Favoriten" icon={<Favorite />} />
              <BottomNavigationAction label="Infos" icon={<Notifications />} />
              <BottomNavigationAction label="Konto" icon={<Person />} />
            </BottomNavigation>
          </Paper>
        )}
        <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, bgcolor: '#000', borderRadius: 3, opacity: 0.3, zIndex: 30 }} />
      </Box>
    </Box>
  );
};