import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
  const getTitleVariants = useGetResponsiveFontVariants();

  const [expanded, setExpanded] = useState(false);

  const mainServices = services.slice(0, 6);
  const extraServices = services.slice(6);

  const handleToggle = () => setExpanded((prev) => !prev);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
    },
    gap: 3,
  };

  return (
    <Box component="section" py={{ xs: 5, md: 10, lg: 17 }}>
      <Container fixed>
        <Typography
          component="h2"
          variant={getTitleVariants({ small: 'h4', medium: 'h3', large: 'h2' })}
          mb={5}
          textAlign={{ xs: 'left', md: 'center' }}
        >
          {t('title')}
        </Typography>

        <Box sx={{ ...gridStyles, mb: extraServices.length > 0 ? 3 : 0 }}>
          {mainServices.map(({ name, shortDescription, iconUrl, path }) => (
            <ServiceItem
              key={name}
              description={shortDescription}
              img={iconUrl || ''}
              title={name}
              path={path}
            />
          ))}
        </Box>

        {extraServices.length > 0 && (
          <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ ...gridStyles, mb: 4, mt: 3 }}>
                {extraServices.map(({ name, shortDescription, iconUrl, path }) => (
                  <ServiceItem
                    key={name}
                    description={shortDescription}
                    img={iconUrl || ''}
                    title={name}
                    path={path}
                  />
                ))}
              </Box>
            </Collapse>

            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleToggle}
                endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{ px: 4, py: 1 }}
              >
                {expanded ? t('showLess') : t('showMore')}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}