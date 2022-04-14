import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, AnimationContainer, Background } from './styles';

interface IForgotPasswordFormaData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ email }: IForgotPasswordFormaData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail precisa ser válido')
            .required('E-mail obrigatório'),
        });

        await schema.validate({ email }, { abortEarly: false });

        await api.post('/password/forgot', { email });

        addToast({
          type: 'success',
          title: 'E-mail enviado',
          description: 'Cheque sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formattedErrors = getValidationErrors(err);

          formRef.current?.setErrors(formattedErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao enviar e-mail',
          description:
            'Não foi possível enviar o e-mail de recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperação de senha</h1>

            <p>Enviaremos um e-mail com mais informações.</p>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button
              loading={{ state: loading, description: 'Enviando...' }}
              type="submit"
            >
              Enviar e-mail
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar ao logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
