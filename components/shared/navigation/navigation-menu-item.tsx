import { Link, MenuItem, SxProps, Tooltip } from '@mui/material';
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

  const { name, path, children } = item;

  return (
    <Tooltip
      placement="bottom-start"
      title={
        <>
          {(children || []).map(({ name, path }) => {
            const isActive = router.asPath.includes(path);
            return (
              <NextLink key={name} href={path} prefetch={false}>
                <MenuItem
                  autoFocus={false}
                  sx={{
                    color: isActive ? 'primary.main' : 'grey.800',
                  }}
                >
                  {name}
                </MenuItem>
              </NextLink>
            );
          })}
        </>
      }
    >
      <span style={{ display: 'inline-block' }}>
        <NextLink href={path} passHref>
          <Link sx={sx} style={{ cursor: 'pointer' }}>
            {name}
          </Link>
        </NextLink>
      </span>
    </Tooltip>
  );
}