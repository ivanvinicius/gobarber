import React, { useCallback, useRef } from 'react';
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, AnimationContainer, Background } from './styles';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async ({ name, email, password }: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('E-mail precisa ser válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate({ name, email, password }, { abortEarly: false });

        await api.post('/users', { name, email, password });

        await signIn({ email, password });

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Login automático',
          description:
            'Você foi logado na aplicação através das credenciais do cadastro',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formattedErrors = getValidationErrors(err);

          formRef.current?.setErrors(formattedErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Erro no cadastro, tente novamente',
        });
      }
    },
    [history, addToast, signIn],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar ao logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
