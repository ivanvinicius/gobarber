import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-style: solid;
  border-color: #232129;

  border-radius: 10px;
  background-color: #232129;

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
  font-size: 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;

  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
