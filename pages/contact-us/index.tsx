import type { NextPage } from 'next';
import { BaseLayout } from '@components/layouts/base-layout';
import { ReactElement, useState } from 'react';
import Container from '@mui/material/Container';
import { Alert, Box, Snackbar, Stack } from '@mui/material';
import Title from 'components/features/contact-us/title';
import Image from 'next/image';
import StartDecoration from 'public/images/contact-us/start-decoration.png';
import Success from 'components/features/contact-us/success';
import ContactUsForm from '@components/features/contact-us/contact-us-form';
import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const ContactUs: NextPage = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
  });

  const t = useTranslations('meta');

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar({ open: false, message: '' });
  };

  const onFormSubmit = (values: FieldValues) => {
    setIsLoading(true);
    axios
      .post('/api/contact', values)
      .then((res) => {
        if (res.status === 200) {
          setIsSubmited(true);
        }
      })
      .catch((err) => {
        setSnackBar({ open: true, message: err.message });
        console.log(snackBar);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta
          name="description"
          content={t('description')}
        />
      </Head>
      <Container fixed>
        {isSubmited ? (
          <Success />
        ) : (
          <Stack
            display="grid"
            gridTemplateColumns={{ xs: '1fr', lg: '1fr 456px' }}
            pt={{ xs: 6, lg: 14 }}
            pb={{ xs: 2, md: 3 }}
            rowGap={{ xs: 5, lg: 6 }}
            columnGap={12}
          >
            <Title />
            <Image src={StartDecoration} alt="" priority />
            <Box gridColumn={{ xs: 1, lg: 2 }} gridRow={{ xs: 2, lg: '1/3' }}>
              <ContactUsForm onSubmit={onFormSubmit} isLoading={isLoading} />
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleClose}
                open={snackBar.open}
                autoHideDuration={2000}
              >
                <Alert
                  onClose={() => setSnackBar({ open: false, message: '' })}
                  severity="error"
                  sx={{ bgcolor: 'error.main', color: 'grey.300' }}
                >
                  {snackBar.message}
                </Alert>
              </Snackbar>
            </Box>
          </Stack>
        )}
      </Container>
    </>
  );
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/contact-us.json`),
      },
    },
  };
}

export default ContactUs;