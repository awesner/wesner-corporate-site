import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTranslations } from 'next-intl';

interface AppointmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AppointmentDialog({ open, onClose }: AppointmentDialogProps) {
  const t = useTranslations('chatWidget.appointmentForm');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.date) return;

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', date: '', message: '' });
        }, 2500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogContent>
        {status === 'success' ? (
          <Alert severity="success" sx={{ mt: 2 }}>{t('success')}</Alert>
        ) : (
          <>
            <DialogContentText sx={{ mb: 2 }}>
              {t('description')}
            </DialogContentText>

            {status === 'error' && (
              <Alert severity="error" sx={{ mb: 2 }}>{t('error')}</Alert>
            )}

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label={t('name')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
              <TextField
                label={t('email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
              <TextField
                label={t('date')}
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                disabled={loading}
              />
              <TextField
                label={t('message')}
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                disabled={loading}
              />
            </Box>
          </>
        )}
      </DialogContent>

      {status !== 'success' && (
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>{t('cancel')}</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.name || !formData.email || !formData.date}
          >
            {loading ? <CircularProgress size={24} /> : t('submit')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}