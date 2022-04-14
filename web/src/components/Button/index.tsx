import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: {
    state: boolean;
    description: string;
  };
}

const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading?.state ? loading.description : children}
    </Container>
  );
};

export default Button;
