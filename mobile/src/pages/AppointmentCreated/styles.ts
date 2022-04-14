import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 32px;
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  font-size: 18px;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  margin-top: 24px;
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
`;

export const OKButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 16px;
`;
