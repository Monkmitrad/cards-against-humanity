import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Cards Against Humanity',
    url: '/game',
  },
  {
    title: true,
    name: 'Game'
  },
  {
    name: 'Login',
    url: '/login',
    icon: 'icon-login'
  },
  {
    name: 'Game',
    url: '/game',
    icon: 'icon-game-controller'
  },
  {
    name: 'Decks',
    url: '/decks',
    icon: 'icon-drawer'
  }
];
