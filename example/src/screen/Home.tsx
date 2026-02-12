import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';

import { StyledScrollView } from '../components/StyledScrollView';
import { StyledImage, StyledView } from '../components/StyledViews';
import { Txt } from '../components/Txt';
import { useAppTheme } from '../theme/AppThemeProvider';

const colorCards = [
  { label: 'Red', bg: 'red.500', light: 'red.100' },
  { label: 'Orange', bg: 'orange.500', light: 'orange.100' },
  { label: 'Amber', bg: 'amber.500', light: 'amber.100' },
  { label: 'Green', bg: 'green.500', light: 'green.100' },
  { label: 'Cyan', bg: 'cyan.500', light: 'cyan.100' },
  { label: 'Blue', bg: 'blue.500', light: 'blue.100' },
  { label: 'Violet', bg: 'violet.500', light: 'violet.100' },
  { label: 'Pink', bg: 'pink.500', light: 'pink.100' },
] as const;

const Home = () => {
  const { toggleDarkMode, isDarkMode, currentPreset, nextTheme } = useAppTheme();
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <StyledView flex={1} bg={'background'}>
      <StatusBar hidden />
      {/* Header */}
      <StyledView
        pt={'sfTop' as any}
        flexDirection={'row'}
        bg={'primary'}
        alignItems={'center'}
        justifyContent={'center'}
        px={4}
      >
        <Txt py={4} t={'h3'} color={'primary-foreground'}>
          {'Styled System'}
        </Txt>
        <TouchableOpacity
          style={{ position: 'absolute', right: 16, paddingTop: 48 }}
          onPress={toggleDarkMode}
        >
          <Txt t={'caption'} color={'primary-foreground'} fontWeight={'600'}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Txt>
        </TouchableOpacity>
      </StyledView>

      <StyledScrollView flex={1} contentContainerSx={{ p: 5, pb: '80px', gap: 6 }}>
        {/* Hero */}
        <StyledView>
          <Txt t={'h1'} color={'foreground'}>
            {'React Native\nStyled System'}
          </Txt>
          <Txt t={'body'} color={'muted-foreground'} mt={2}>
            {'A design-token driven styling solution for React Native, powered by defaultTheme.'}
          </Txt>
          <StyledView
            mt={3}
            bg={'secondary'}
            borderRadius={8}
            px={4}
            py={2}
            alignSelf={'flex-start'}
          >
            <Txt t={'caption'} color={'secondary-foreground'} fontWeight={'600'}>
              {`Theme: ${currentPreset.label}`}
            </Txt>
          </StyledView>
        </StyledView>

        {/* Image */}
        <StyledImage
          w={'100%'}
          maxH={'160px'}
          borderRadius={12}
          resizeMode={'cover'}
          source={require('../../assets/cabin.jpg')}
        />

        {/* Interactive Components */}
        <StyledView>
          <Txt t={'h3'} color={'foreground'} mb={3}>
            {'Interactive Components'}
          </Txt>
          <StyledView gap={3}>
            {/* Switch */}
            <StyledView
              bg={'card'}
              borderColor={'border'}
              borderWidth={1}
              borderRadius={12}
              p={4}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <StyledView>
                <Txt t={'body'} color={'card-foreground'} fontWeight={'600'}>
                  {'Notifications'}
                </Txt>
                <Txt t={'caption'} color={'muted-foreground'}>
                  {'Enable push notifications'}
                </Txt>
              </StyledView>
              <TouchableOpacity onPress={() => setSwitchOn((v) => !v)}>
                <StyledView
                  w={'48px'}
                  h={'28px'}
                  borderRadius={9999}
                  bg={switchOn ? 'primary' : 'input'}
                  justifyContent={'center'}
                  px={'2px'}
                >
                  <StyledView
                    w={'24px'}
                    h={'24px'}
                    borderRadius={9999}
                    bg={'white'}
                    alignSelf={switchOn ? 'flex-end' : 'flex-start'}
                  />
                </StyledView>
              </TouchableOpacity>
            </StyledView>

            {/* Checkbox */}
            <StyledView
              bg={'card'}
              borderColor={'border'}
              borderWidth={1}
              borderRadius={12}
              p={4}
              flexDirection={'row'}
              alignItems={'center'}
              gap={3}
            >
              <TouchableOpacity onPress={() => setChecked((v) => !v)}>
                <StyledView
                  w={'24px'}
                  h={'24px'}
                  borderRadius={4}
                  borderWidth={2}
                  borderColor={checked ? 'primary' : 'input'}
                  bg={checked ? 'primary' : 'background'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  {checked && (
                    <Txt t={'small'} color={'primary-foreground'} fontWeight={'bold'}>
                      {'v'}
                    </Txt>
                  )}
                </StyledView>
              </TouchableOpacity>
              <StyledView>
                <Txt t={'body'} color={'card-foreground'} fontWeight={'600'}>
                  {'Accept terms'}
                </Txt>
                <Txt t={'caption'} color={'muted-foreground'}>
                  {'I agree to the privacy policy'}
                </Txt>
              </StyledView>
            </StyledView>

            {/* Input */}
            <StyledView
              bg={'card'}
              borderColor={'border'}
              borderWidth={1}
              borderRadius={12}
              p={4}
              gap={2}
            >
              <Txt t={'caption'} color={'card-foreground'} fontWeight={'600'}>
                {'Email'}
              </Txt>
              <StyledView
                bg={'background'}
                borderColor={'input'}
                borderWidth={1}
                borderRadius={8}
                px={3}
                py={2}
              >
                <Txt t={'body'} color={'muted-foreground'}>
                  {'user@example.com'}
                </Txt>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Color Palette */}
        <StyledView>
          <Txt t={'h3'} color={'foreground'} mb={3}>
            {'Color Palette'}
          </Txt>
          <StyledView flexDirection={'row'} flexWrap={'wrap'} gap={3}>
            {colorCards.map(({ label, bg, light }) => (
              <StyledView key={label} bg={light} borderRadius={12} p={4} w={'47%'} flexGrow={1}>
                <StyledView bg={bg} w={10} h={10} borderRadius={9999} mb={2} />
                <Txt t={'caption'} color={bg} fontWeight={'600'}>
                  {label}
                </Txt>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Typography */}
        <StyledView bg={'secondary'} borderRadius={12} p={5} gap={2}>
          <Txt t={'h3'} color={'foreground'} mb={1}>
            {'Typography'}
          </Txt>
          <Txt t={'h1'} color={'primary'}>
            {'Heading 1'}
          </Txt>
          <Txt t={'h2'} color={'primary'}>
            {'Heading 2'}
          </Txt>
          <Txt t={'h3'} color={'accent-foreground'}>
            {'Heading 3'}
          </Txt>
          <Txt t={'body'} color={'foreground'}>
            {'Body text for regular content.'}
          </Txt>
          <Txt t={'caption'} color={'muted-foreground'}>
            {'Caption for secondary information.'}
          </Txt>
          <Txt t={'small'} color={'destructive'}>
            {'Small text for labels and hints.'}
          </Txt>
        </StyledView>

        {/* Spacing & Radii */}
        <StyledView>
          <Txt t={'h3'} color={'foreground'} mb={3}>
            {'Spacing & Radii'}
          </Txt>
          <StyledView flexDirection={'row'} gap={3}>
            {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((r, i) => (
              <StyledView
                key={r}
                bg={['sky.400', 'indigo.400', 'purple.400', 'fuchsia.400', 'rose.400'][i]}
                w={12}
                h={12}
                borderRadius={[4, 8, 12, 16, 9999][i]}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Txt t={'small'} color={'white'} fontWeight={'bold'}>
                  {r}
                </Txt>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Feature Cards */}
        <StyledView gap={3}>
          <Txt t={'h3'} color={'foreground'} mb={1}>
            {'Feature Cards'}
          </Txt>
          <StyledView bg={'primary'} borderRadius={16} p={5}>
            <Txt t={'h2'} color={'primary-foreground'}>
              {'Tokens'}
            </Txt>
            <Txt t={'body'} color={'primary-foreground'} mt={1}>
              {'Space, sizes, colors, radii, and typography \u2014 all from one theme object.'}
            </Txt>
          </StyledView>
          <StyledView bg={'destructive'} borderRadius={16} p={5}>
            <Txt t={'h2'} color={'destructive-foreground'}>
              {'Destructive'}
            </Txt>
            <Txt t={'body'} color={'destructive-foreground'} mt={1}>
              {'Semantic color tokens for error states and dangerous actions.'}
            </Txt>
          </StyledView>
          <StyledView
            bg={'card'}
            borderColor={'border'}
            borderWidth={1}
            borderRadius={16}
            p={5}
          >
            <Txt t={'h2'} color={'card-foreground'}>
              {'Card'}
            </Txt>
            <Txt t={'body'} color={'muted-foreground'} mt={1}>
              {'Semantic tokens adapt automatically to light and dark themes.'}
            </Txt>
          </StyledView>
          <StyledView bg={'accent'} borderRadius={16} p={5}>
            <Txt t={'h2'} color={'accent-foreground'}>
              {'Accent'}
            </Txt>
            <Txt t={'body'} color={'accent-foreground'} mt={1}>
              {'Accent surfaces for highlighting important content areas.'}
            </Txt>
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* FAB - Theme Switcher */}
      <TouchableOpacity
        onPress={nextTheme}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 32,
        }}
      >
        <StyledView
          bg={'primary'}
          w={'56px'}
          h={'56px'}
          borderRadius={9999}
          alignItems={'center'}
          justifyContent={'center'}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          <Txt t={'h3'} color={'primary-foreground'}>
            {'T'}
          </Txt>
        </StyledView>
      </TouchableOpacity>
    </StyledView>
  );
};

export { Home };
