import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  flex-direction: row;

  border-radius: 10px;
  background-color: #ff9000;
`;

export const ButtonText = styled.Text`
  flex: 1;

  text-align: center;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
`;
