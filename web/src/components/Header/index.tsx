import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import logoImg from '../../assets/logo.svg';
import { Container, HeaderContainer, HeaderContent, Profile } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" />
          </Link>

          <Profile>
            <img src={user.avatar_url} alt="Logo" />

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
