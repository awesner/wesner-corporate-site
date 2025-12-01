import { Link } from '@mui/material';

export const WebSiteLink = (): JSX.Element => {
  return (
    <Link
      href="https://www.wesner-software.de"
      target="_blank"
      underline="hover"
      sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}
    >
      https://www.wesner-software.de
    </Link>
  );
};

export const MailToLink = (): JSX.Element => {
  return (
    <Link
      href="mailto:contact@wesner-software.de"
      target="_blank"
      underline="hover"
      sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}
    >
      contact us
    </Link>
  );
};
