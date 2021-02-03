import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {
          // TODO DONE
          <>
            <NavLink
              to={'/'}
              exact
              activeStyle={activeLinkStyle}>
              Listagem
            </NavLink>
            <NavLink
              to={'/import'}
              exact
              activeStyle={activeLinkStyle}>
              Importar
            </NavLink>
          </>
        }
      </nav>
    </header>
  </Container>
);

export default Header;

const activeLinkStyle = {
  borderBottom: '0.1rem solid',
  paddingBottom: '.5rem'
};
