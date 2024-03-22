import React from 'react';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import { StyledButton } from '../components/StyledButton';
import { StyledImage } from '../components/StyledImage';
import { StyledScrollView } from '../components/StyledScrollView';
import { StyledView } from '../components/StyledView';
import { Txt } from '../components/Txt';
import { useDarkTheme } from '../theme/AppThemeProvider';

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const { toggleDarkMode, isDarkMode } = useDarkTheme();

  return (
    <StyledView flex={1} bg={'bg'}>
      <ExpoStatusBar hidden />
      <StyledView
        pt={'sfTop' as any}
        flexDirection={'row'}
        bg={'primary'}
        alignItems={'center'}
        justifyContent={'center'}
        px={4}
      >
        <Txt py={4} t={'title'} color={'onPrimary'}>
          {'Header'}
        </Txt>
        <StyledButton
          pos={'absolute'}
          right={4}
          pt={'sfTop' as any}
          title={isDarkMode ? 'Dark' : 'Light'}
          onPress={toggleDarkMode}
        />
      </StyledView>
      <StyledScrollView flex={1} contentContainerSx={{ p: 5, pb: '64px' }}>
        <Txt t={'title'}>{'Welcome to\nReact Native Styled System🧩'}</Txt>
        <StyledImage
          my={6}
          w={'100%'}
          maxH={'150px'}
          resizeMode={'cover'}
          source={require('../../assets/cabin.jpg')}
        />
        <Txt t={'body'} lineHeight={24}>
          {'styled-system is useful for rapid UI development by providing a consistent approach to'}
          {
            'styling in React applications. It offers a design system with predefined style props that'
          }
          {
            'streamline component styling, ensuring scalability, consistency, and responsive design.'
          }
          {'But original styled-system is for CSS not in React Native. We introduce React Native'}
          {'Styled System 🎉'}
        </Txt>
      </StyledScrollView>
    </StyledView>
  );
};

export { Home };
export type { HomeProps };
