import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 16px;

  border: 0;
  background-color: #ff9000;
  color: #312e38;
  font-weight: 500;
  border-radius: 10px;
  padding: 0 16px;

  transition: background 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
