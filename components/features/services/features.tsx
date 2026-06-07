import { Box, Container, Stack, Typography } from '@mui/material';
import { IServiceFull } from 'models/interfaces/services/service.interface';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import Benefits from './benefits';
import ServiceFeature from './service-feature';

interface IProps {
  service: IServiceFull;
}

export default function Features({ service }: IProps): JSX.Element {
  const { subtitle, mainTexts, features, benefits } = service;
  const getResponsiveFont = useGetResponsiveFontVariants();

  const gridLength = (features?.length || 0) + 2;

  return (
    <Box component="section" py={{ xs: 7, md: 8, lg: 14 }}>
      <Container>
        <Typography
          component="h2"
          mb={{ xs: 1, md: 2 }}
          variant={getResponsiveFont({ medium: 'h4', large: 'h3' })}
          maxWidth={{ xs: 1, md: 3 / 4, lg: 2 / 3 }}
        >
          {subtitle}
        </Typography>
        <Stack
          display="grid"
          gridTemplateColumns={{ xs: '1fr', lg: 'minmax(1px, 1fr) 360px' }}
          gridAutoRows="min-content"
          rowGap={{ xs: 3, md: 5, lg: 6 }}
          columnGap={9}
        >
          <Stack gap={{ xs: 0.5, lg: 1 }}>
            {mainTexts?.map(({ text, list }, index) => (
              <Stack key={index} gap={{ xs: 0.5, lg: 1 }}>
                <Typography
                  variant={getResponsiveFont({
                    medium: 'body2',
                    large: 'body1',
                  })}
                  color="grey.800"
                >
                  {text}
                </Typography>
                {!!list?.length && (
                  <Stack key={index} component="ul" m={0} pl={3}>
                    {list.map((text, index) => (
                      <Typography
                        variant={getResponsiveFont({
                          medium: 'body2',
                          large: 'body1',
                        })}
                        key={index}
                        component="li"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Stack>
            ))}
          </Stack>
          <Box
            gridColumn={{ xs: 1, lg: 2 }}
            sx={{ gridRow: { xs: 2, lg: `1/${gridLength}` } }}
          >
            <Benefits benefits={benefits} />
          </Box>
          {features?.map((feature, index) => (
            <ServiceFeature key={index} feature={feature} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
