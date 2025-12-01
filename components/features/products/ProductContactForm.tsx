import { Box, Typography, Paper } from '@mui/material';
import ContactUsForm from 'components/features/contact-us/contact-us-form';
import { useTranslations } from 'next-intl';
import { FieldValues } from 'react-hook-form';

interface IProps {
  onSubmit(values: FieldValues): void;
  isLoading: boolean;
}

export default function ProductContactForm({ onSubmit, isLoading }: IProps) {
  const t = useTranslations('productPage');

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 6 }}>
      <Box maxWidth="md" mx="auto" textAlign="center">
        <Typography variant="h4" component="h2" gutterBottom>
          {t('contactForm.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('contactForm.description')}
        </Typography>
        <ContactUsForm onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
    </Paper>
  );
}