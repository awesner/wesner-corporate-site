import { Card, CardContent, Link, Typography, useTheme } from '@mui/material';
import { ERoutes } from 'models/enums/routes.enum';
import NextLink from 'next/link';
import Image from 'next/image';
import { useGetResponsiveFontVariants } from 'utils/hooks/responsiveFontVariant.util';
import EastIcon from '@mui/icons-material/East';

interface IServiceItem {
  title: string;
  description: string;
  img: string;
  path: string;
}

export default function ServiceItem({
  title,
  description,
  img,
  path,
}: IServiceItem): JSX.Element {
  const theme = useTheme();
  const getFontVariants = useGetResponsiveFontVariants();

  return (
    <NextLink href={`${ERoutes.Services}/${path}`} passHref>
      <Link
        sx={{
          textDecoration: 'none',
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
            position: 'relative',
            pt: { xs: 3, md: 3 },
            pb: { xs: 6, md: 8 },
            height: 1,
          }}
        >
          <CardContent>
            <Image src={img} alt="" width={80} height={80} />
            <Typography
              component="h3"
              variant={getFontVariants({ medium: 'h5', large: 'h4' })}
              mt={{ xs: 1, md: 3, lg: 5 }}
              sx={{
                wordBreak: 'break-word',
                hyphens: 'auto',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant={getFontVariants({ medium: 'body2', large: 'body1' })}
              mt={1}
            >
              {description}
            </Typography>
            <EastIcon
              sx={{
                position: 'absolute',
                bottom: { xs: 16, md: 28 },
                right: { xs: 16, md: 24 },
              }}
            />
          </CardContent>
        </Card>
      </Link>
    </NextLink>
  );
}
