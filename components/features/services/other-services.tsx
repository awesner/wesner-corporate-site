import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useEffect } from 'react';
import { IResidualService } from 'models/interfaces/services/service.interface';
import { useTranslations } from 'next-intl';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import ServiceItem from './service-item';

interface IProps {
  services: IResidualService[];
}

export default function OtherServices({ services }: IProps) {
  const t = useTranslations('servicesPage.otherServices');
  const getFontVariants = useGetResponsiveFontVariants();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [page, setPage] = useState(0);

  const itemsPerPage = isDesktop ? 2 : 1;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  const handlePrev = () => setPage((prev) => Math.max(0, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages - 1, prev + 1));

  const startIndex = page * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box component="section" py={{ xs: 5, md: 6, lg: 10 }} bgcolor="grey.900">
      <Container fixed>
        <Typography
          component="h2"
          variant={getFontVariants({ small: 'h4', medium: 'h3', large: 'h2' })}
          color="grey.300"
          mb={{ xs: 2, md: 4 }}
        >
          {t('title')}
        </Typography>

        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 2, md: 3 },
            minHeight: { xs: 150, md: 180 },
          }}
        >
          {currentServices.map((item) => (
            <ServiceItem key={item.path} item={item} />
          ))}
        </Stack>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5} gap={3}>
            <IconButton
              onClick={handlePrev}
              disabled={page === 0}
              sx={{
                bgcolor: 'common.white',
                color: 'primary.main',
                boxShadow: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'grey.600',
                }
              }}
            >
              <KeyboardArrowLeftIcon fontSize="medium" />
            </IconButton>

            <Box display="flex" gap={2}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setPage(index)}
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: page === index ? 'primary.main' : 'common.white',
                    bgcolor: page === index ? 'primary.main' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                    }
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={page === totalPages - 1}
              sx={{
                bgcolor: 'common.white',
                color: 'primary.main',
                boxShadow: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'grey.600',
                }
              }}
            >
              <KeyboardArrowRightIcon fontSize="medium" />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}