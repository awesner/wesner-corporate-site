import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IPosition } from 'models/interfaces/careers/position.interface';
import { useTranslations } from 'next-intl';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import PositionsItem from './positions-item';

interface IProps {
  positions?: IPosition[];
}

export default function Positions({ positions }: IProps): JSX.Element {
  const t = useTranslations('careers');
  const getResponsiveFont = useGetResponsiveFontVariants();

  return (
    <Box component="section" pb={{ xs: 5, md: 10, lg: 17 }}>
      <Container>
        <Typography
          component="h2"
          variant={getResponsiveFont({
            small: 'h4',
            medium: 'h3',
            large: 'h2',
          })}
          mb={3}
        >
          {t('positionsTitle')}
        </Typography>
        {!!positions?.length && (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {positions.map((position, index) => (
              <Grid key={index} item xs={12} md={5} lg={5}>
                <PositionsItem position={position} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
