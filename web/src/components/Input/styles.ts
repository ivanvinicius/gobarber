import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;

  background-color: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    flex: 1;
    background-color: transparent;
    border: none;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background-color: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
