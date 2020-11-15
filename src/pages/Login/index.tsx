import React, { useState } from 'react';
import {
  Container,
  LogoImage,
  Input,
  Title,
  LogoText,
  Button,
  ButtonText,
  SignUpContainer,
  SignUpText,
} from './styles';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native';
import logoImg from '../../assets/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: '#39AFB0',
      text: '#444540',
      placeholder: '#a09e9e',
      background: '#fcfcfc',
    },
    roundess: 0.4,
    fonts: configureFonts({
      default: {
        regular: {
          fontFamily: 'Roboto_400Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Roboto_500Medium',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Roboto_400Regular',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Roboto_400Regular',
          fontWeight: 'normal',
        },
      },
    }),
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <KeyboardAwareScrollView style={{ flex: 1, paddingTop: 60 }}>
        <TouchableWithoutFeedback
          style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center' }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <Container>
            <LogoImage source={logoImg} resizeMode='contain' />
            <LogoText>
              daily<Text style={{ color: '#76C7C5' }}>Fit</Text>
            </LogoText>

            <Title>Faça seu login</Title>
            <Input
              label='E-mail'
              mode='outlined'
              autoCapitalize='none'
              value={email}
              theme={inputTheme}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label='Senha'
              mode='outlined'
              autoCapitalize='none'
              theme={inputTheme}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Button>
              <ButtonText>Entrar</ButtonText>
            </Button>

            <SignUpContainer>
              <Feather name='log-in' size={24} color='#9CA9A7' />
              <SignUpText>Criar conta</SignUpText>
            </SignUpContainer>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </PaperProvider>
  );
};

export default Login;
