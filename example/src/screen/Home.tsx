import React from 'react';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import { StyledScrollView } from '../components/StyledScrollView';
import { StyledView } from '../components/StyledView';
import { Txt } from '../components/Txt';

type HomeProps = {};

const Home = ({}: HomeProps) => {
  return (
    <StyledView flex={1} bg={'black'}>
      <ExpoStatusBar hidden />
      <StyledView
        pt={'sfTop' as any}
        flexDirection={'row'}
        alignItems={'center'}
        bg={'violet800'}
        py={4}
        justifyContent={'center'}
      >
        <Txt t={'title'} color={'white'}>
          {'Header'}
        </Txt>
      </StyledView>
      <StyledScrollView flex={1} contentContainerSx={{ p: 5, pb: '64px' }}>
        <Txt t={'title'}>{'Welcome to\nReact Native Styled System🧩'}</Txt>
        <Txt t={'body'} mt={4} lineHeight={24}>
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
