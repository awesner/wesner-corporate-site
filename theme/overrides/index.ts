import { Theme } from '@mui/material';
import Button from './Button';
import Card from './Card';
import Container from './Container';
import Menu from './Menu';

export function overrides(theme: Theme) {
  return Object.assign(Button(theme), Card(theme), Container(theme), Menu(theme));
}
