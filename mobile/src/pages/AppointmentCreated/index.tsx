import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OKButtonText,
} from './styles';

interface IRouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();
  const { date } = params as IRouteParams;

  const formattedDate = useMemo(() => {
    return format(date, "EEEE ', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, [date]);

  const handleOKPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOKPressed}>
        <OKButtonText>Ok</OKButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
