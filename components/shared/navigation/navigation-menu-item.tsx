import { Box, MenuItem, SxProps, Tooltip, Typography } from '@mui/material';
import { IMainNavItem } from 'models/configs/main-nav.config';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface INavMenuItem {
  item: IMainNavItem;
  sx?: SxProps;
}

export default function NavigationMenuItem({
                                             item,
                                             sx,
                                           }: INavMenuItem): JSX.Element {
  const router = useRouter();
  const { name, children } = item;

  const hasSubCategories = children?.some(
    (child) => child.children && child.children.length > 0
  );

  return (
    <Tooltip
      key={router.asPath}
      disableFocusListener
      placement="bottom-start"
      title={
        <Box
          sx={{
            p: 1,
            display: hasSubCategories ? 'grid' : 'flex',
            gridTemplateColumns: hasSubCategories ? 'repeat(2, 1fr)' : 'none',
            flexDirection: hasSubCategories ? 'unset' : 'column',
            gap: hasSubCategories ? 2 : 0,
            maxWidth: hasSubCategories ? 600 : 'auto',
          }}
        >
          {(children || []).map((child) => {
            if (child.children && child.children.length > 0) {
              return (
                <Box key={child.name} sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      px: 2,
                      color: 'primary.main',
                      fontWeight: 'bold',
                      lineHeight: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    {child.name}
                  </Typography>
                  {child.children.map((subChild) => {
                    const isActive = router.asPath.includes(subChild.path);
                    return (
                      <NextLink key={subChild.name} href={subChild.path} passHref prefetch={false}>
                        <MenuItem
                          component="a"
                          sx={{
                            color: isActive ? 'primary.main' : 'grey.800',
                            py: 0.5,
                            minHeight: 'auto',
                            textDecoration: 'none',
                          }}
                        >
                          {subChild.name}
                        </MenuItem>
                      </NextLink>
                    );
                  })}
                </Box>
              );
            }

            const isActive = router.asPath.includes(child.path);
            return (
              <NextLink key={child.name} href={child.path} passHref prefetch={false}>
                <MenuItem
                  component="a"
                  sx={{
                    color: isActive ? 'primary.main' : 'grey.800',
                    textDecoration: 'none',
                  }}
                >
                  {child.name}
                </MenuItem>
              </NextLink>
            );
          })}
        </Box>
      }
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'common.white',
            boxShadow: 3,
            p: 0,
            maxWidth: 'none',
            pointerEvents: 'auto',
            '& .MuiMenuItem-root': {
              fontSize: '0.875rem',
            },
          },
        },
      }}
    >
      <Box component="span" sx={{ ...sx, cursor: 'default' }}>
        {name}
      </Box>
    </Tooltip>
  );
}