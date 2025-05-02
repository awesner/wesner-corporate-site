import ControlledInput from '@components/shared/controlled-input';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from './validation-schema';

interface IProps {
  onSubmit(values: FieldValues): void;
  isLoading: boolean;
}

export default function ContactUsForm({
  onSubmit,
  isLoading,
}: IProps): JSX.Element {
  const methods = useForm({ resolver: yupResolver(validation) });
  const { handleSubmit } = methods;
  const t = useTranslations();

  return (
    <FormProvider {...methods}>
      <Stack component="form" mb={{ xs: 2, lg: 3 }} gap={4}>
        <ControlledInput
          name="name"
          variant="filled"
          label={t('contactUsPage.nameLabel')}
        />
        <ControlledInput
          name="email"
          variant="filled"
          label={t('contactUsPage.emailLabel')}
        />
        <ControlledInput
          name="message"
          variant="filled"
          multiline
          label={t('contactUsPage.textareaLabel')}
          minRows={4}
          maxRows={4}
        />
      </Stack>
      <Button
        type="submit"
        fullWidth={true}
        onClick={handleSubmit(onSubmit)}
        sx={{ position: 'relative' }}
        startIcon={
          isLoading && (
            <CircularProgress
              color="inherit"
              size={20}
              sx={{
                position: 'absolute',
                left: 16,
                top: 14,
              }}
            />
          )
        }
      >
        {t('contactUs.button')}
      </Button>
    </FormProvider>
  );
}
