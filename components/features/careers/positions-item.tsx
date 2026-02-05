import { Card, Link, Stack, Typography, useTheme } from '@mui/material';
import { ERoutes } from 'models/enums/routes.enum';
import { IPosition } from 'models/interfaces/careers/position.interface';
import NextLink from 'next/link';
import EastIcon from '@mui/icons-material/East';

interface IProps {
  position: IPosition;
}

export default function PositionsItem({ position }: IProps): JSX.Element {
  const theme = useTheme();
  const { id, title, location } = position;

  return (
    <NextLink href={`${ERoutes.Careers}/${id}`} passHref>
      <Link
        underline="none"
        sx={{
          display: 'flex',
          height: 1,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.short,
          }),
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Card
          sx={{
            width: 1,
            position: 'relative',
            p: { xs: theme.spacing(5, 3, 8), lg: theme.spacing(6, 4, 9) },
            height: 1,
            minHeight: { xs: 290, md: 260 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack justifyContent="space-between" gap={1} height={1} flexGrow={1}>
            <Typography
              component="h3"
              variant="h4"
              sx={{
                wordBreak: 'break-word',
                hyphens: 'auto',
              }}
            >
              {title}
            </Typography>
            <Typography color={theme.palette.grey[800]}>{location}</Typography>
            <EastIcon
              sx={{
                position: 'absolute',
                bottom: { xs: 16, md: 28 },
                right: { xs: 16, md: 24 },
              }}
            />
          </Stack>
        </Card>
      </Link>
    </NextLink>
  );
}