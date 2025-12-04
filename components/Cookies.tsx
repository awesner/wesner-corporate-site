import {
  IconButton,
  Typography,
  useTheme,
  Button,
  Box,
  Link,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { ERoutes } from 'models/enums/routes.enum';
import React, { useState } from 'react';
import { deleteCookie, setCookie } from 'utils/cookies';
import { CloseIcon } from './shared/icons';
import NextLink from 'next/link';
import CookiePreferences from './shared/cookie-preferences';

interface IProps {
  open: boolean;
  setOpen(Value: boolean): void;
}

export default function Cookies({ open, setOpen }: IProps): JSX.Element {
  const theme = useTheme();
  const [isGoogleSelected, setIsGoogleChecked] = useState(true);
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

  const onAccept = () => {
    if (isGoogleSelected) {
      deleteCookie('user_cookie_consent');
      setCookie('user_cookie_consent', 1, 30);
    }
    setOpen(false);
  };

  const onSave = (value: boolean) => {
    setIsGoogleChecked(value);
    setPreferencesOpen(false);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <Box
        sx={{
          gap: 1,
          width: 500,
          height: 200,
          maxWidth: '90vw',
          p: 3,
          borderTop: `4px solid ${theme.palette.primary.main}`,
          background:
            'linear-gradient(0deg, rgba(64, 84, 215, 0.04), rgba(64, 84, 215, 0.04)), #FFFFFF;',
          borderRadius: 1,
        }}
      >
        {isPreferencesOpen ? (
          <CookiePreferences
            isGoogleChecked={isGoogleSelected}
            onCancel={() => setPreferencesOpen(false)}
            onAccept={onSave}
            onClose={() => setOpen(false)}
          />
        ) : (
          <Stack direction="column" gap={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={1}
            >
              <Typography component="div" variant="h4">
                Cookies
              </Typography>
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Typography variant="body1" color="grey.800">
              We Use cookies to give you a great user experience on our website.
              To learn more, read our{' '}
              <NextLink href={ERoutes.Policy} passHref>
                <Link color="inherit">Cookie Policy</Link>
              </NextLink>{' '}
              {/* or manage your settings at{' '}
              <Link
                color="inherit"
                sx={{ cursor: 'pointer' }}
                onClick={() => setPreferencesOpen(true)}
              >
                Cookie Preferences.
              </Link> */}
            </Typography>
            <Stack width={1} direction="row" justifyContent="flex-end" mt={1}>
              <Button variant="outlined" onClick={onAccept}>
                Accept
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Snackbar>
  );
}
