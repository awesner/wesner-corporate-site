import { Link, Stack, SxProps, Typography, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { IMainNavItem } from 'models/configs/main-nav.config';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useGenerateMobileLinkStyles } from 'utils/hooks/generateMobileLinkStyles';

interface IMobileNavCollapse {
  item: IMainNavItem;
  onClose(): void;
  linkStyles?: SxProps | any;
}

export default function MobileNavigationCollapse({
                                                   item,
                                                   onClose,
                                                 }: IMobileNavCollapse): JSX.Element {
  const router = useRouter();
  const { name, children } = item;
  const isActive = router.pathname.includes(item.path);

  const getLinkStyles = useGenerateMobileLinkStyles();

  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: 'none',
        p: 0,
        background: 'transparent',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        sx={{
          ...getLinkStyles(isActive),
          m: 0,
          p: 0,
          width: 1,
          background: 'transparent',
          minHeight: 'auto',
          '& .MuiAccordionSummary-content': { margin: 0 },
        }}
      >
        {name}
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0, pt: 1, pb: 2 }}>
        <Stack gap={2} pl={2}>
          {(children || []).map((child) => {
            if (child.children && child.children.length > 0) {
              return (
                <Box key={child.name}>
                  <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                      fontWeight: 'bold',
                      display: 'block',
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {child.name}
                  </Typography>

                  <Stack gap={1.5} pl={2}>
                    {child.children.map((subChild) => {
                      const isChildActive = router.asPath.includes(subChild.path);
                      return (
                        <NextLink key={subChild.name} href={subChild.path} passHref>
                          <Link
                            sx={{ ...getLinkStyles(isChildActive), fontSize: '0.95rem' }}
                            onClick={onClose}
                          >
                            {subChild.name}
                          </Link>
                        </NextLink>
                      );
                    })}
                  </Stack>
                </Box>
              );
            }

            const isChildActive = router.asPath.includes(child.path);
            return (
              <NextLink key={child.name} href={child.path} passHref>
                <Link sx={getLinkStyles(isChildActive)} onClick={onClose}>
                  {child.name}
                </Link>
              </NextLink>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}