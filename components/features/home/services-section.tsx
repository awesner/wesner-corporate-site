import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import ServiceItem from 'components/features/home/service-item';
import { IService } from 'models/interfaces/services/service.interface';

export default function ServicesSection({
  services,
}: {
  services: IService[];
}): JSX.Element {
  const t = useTranslations('services');

  const getTitleVeriants = useGetResponsiveFontVariants();

  return (
    <Box component="section" py={{ xs: 5, md: 10, lg: 17 }}>
      <Container fixed>
        <Typography
          component="h2"
          variant={getTitleVeriants({ small: 'h4', medium: 'h3', large: 'h2' })}
          mb={3}
        >
          {t('title')}
        </Typography>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'repeat(auto-fit, minmax(20%, 1fr))',
            },
            gap: 3,
          }}
        >
          {services.map(({ name, shortDescription, iconUrl, path }) => (
            <ServiceItem
              key={name}
              description={shortDescription}
              img={iconUrl || ''}
              title={name}
              path={path}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
