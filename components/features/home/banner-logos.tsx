import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Image from 'next/image';
import Logo1 from 'public/images/home/logos/logo1.png';
import Logo2 from 'public/images/home/logos/logo2.png';
import Logo3 from 'public/images/home/logos/logo3.png';
import Logo4 from 'public/images/home/logos/logo4.png';
import LogoTHW from 'public/images/home/logos/thw.png';

export default function BannerLogos(): JSX.Element {
  const logoHoverStyle = {
    opacity: 0.6,
    transition: 'opacity 0.3s ease-in-out',
    cursor: 'default',
    '&:hover': {
      opacity: 1,
    },
  };

  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="center"
      gap={{ xs: 3, md: 5, lg: 10 }}
      py={{ xs: 1, md: 2 }}
      alignItems="center"
      flexWrap="wrap"
    >
      <Box sx={logoHoverStyle}>
        <Image src={Logo1} alt="Schneider Electric" width="158" height="48" objectFit="contain" />
      </Box>

      <Box sx={logoHoverStyle}>
        <Image src={Logo2} alt="Vattenfall" width="168" height="26" objectFit="contain" />
      </Box>

      <Box height={22} sx={logoHoverStyle}>
        <Image src={Logo3} alt="Liebherr" width="168" height="22" objectFit="contain" />
      </Box>

      <Box sx={logoHoverStyle}>
        <Image src={Logo4} alt="2G" width="72" height="48" objectFit="contain" />
      </Box>

      <Box
        height={48}
        display="flex"
        alignItems="center"
        sx={{
          ...logoHoverStyle,
          filter: 'brightness(0) invert(1)',
        }}
      >
        <Image src={LogoTHW} alt="THW" width="130" height="70" objectFit="contain" />
      </Box>
    </Stack>
  );
}