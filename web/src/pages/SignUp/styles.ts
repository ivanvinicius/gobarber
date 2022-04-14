import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(150px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }

`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  animation: ${appearFromRight} 1.5s;

  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    display: flex;
    align-items: center;

    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
