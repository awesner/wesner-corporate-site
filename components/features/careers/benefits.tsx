import { Box, Container, Grid, Typography } from '@mui/material';
import { useBenefitsConfig } from 'models/configs/careers/benefits.config';
import { useTranslations } from 'next-intl';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import BenefitItem, { IBenefitItem } from './benefit-item';

export default function Benefits(): JSX.Element {
  const t = useTranslations('careers');
  const benefitsConfig = useBenefitsConfig();
  const getResponsiveFont = useGetResponsiveFontVariants();

  return (
    <Box py={{ xs: 5, md: 10, lg: 17 }} component="section">
      <Container fixed>
        <Typography
          component="h2"
          variant={getResponsiveFont({
            small: 'h4',
            medium: 'h3',
            large: 'h2',
          })}
          mb={{ xs: 3, lg: 6 }}
        >
          {t('benefitsTitle')}
        </Typography>
        <Grid container rowSpacing={{ xs: 3, lg: 6 }} columnSpacing={3}>
          {benefitsConfig.map(({ title, img }: IBenefitItem, index: number) => {
            return (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <BenefitItem title={title} img={img} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
