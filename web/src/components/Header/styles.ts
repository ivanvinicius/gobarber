import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderContainer = styled.header`
  padding: 32px 0;
  background-color: #23232e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    > img {
      width: 100px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  button {
    margin-left: auto;
    background-color: transparent;
    border: 0;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #999591;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
