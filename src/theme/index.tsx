import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
  keyframes
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

//import BentoBackground from '../assets/kashi/bento-background.jpg'
import BrickWallBackground from '../assets/kashi/brickwall.png'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtra2Small: 320,
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg1: darkMode ? '#18212e' : '#FFFFFF',
    bg2: darkMode ? '#202d3f' : '#F7F8FA',
    bg3: darkMode ? '#2a3a50' : '#EDEEF2',
    bg4: darkMode ? '#3a506f' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#232636' : '#CED0D9', // bentobox base
    bg7: darkMode ? '#19212e' : '#FFFFFF', // bentobox dark card

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#0094ec' : '#0e0e23',
    primary2: darkMode ? '#0097fb' : '#FF8CC3',
    primary3: darkMode ? '#00aff5' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#ebebeb',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#0e0e23',

    // secondary colors
    secondary1: darkMode ? '#0094ec' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#ebebeb',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#0094ec',

    borderRadius: '20px',
    darkMode: darkMode,

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // BentoBox/Kashi
    extraHighEmphesisText: '#e3e3e3',
    lowEmphesisText: '#575757',
    mediumEmphesisText: '#7f7f7f',
    highEmphesisText: '#bfbfbf',
    mediumDarkPurple: '#1d212f',
    extraDarkPurple: '#1a1d29',
    primaryPink: 'rgb(221, 85, 151)',
    baseCard: '#222636',
    alertYellow: '#bfbf31',
    primaryBlue: 'rgb(108, 168, 255)'
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  //const darkMode = useIsDarkMode()
  const darkMode = true

  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  //console.log('themeObject:', themeObject)

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={[12, 14, 16]} color={'highEmphesisText'} {...props} />
  },
  extraLargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={[20, 28, 36]} color={'extraHighEmphesisText'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={[16, 22, 28]} color={'highEmphesisText'} {...props} />
  },
  mediumLargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={[14, 20, 24]} color={'highEmphesisText'} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={[14, 16, 18]} color={'mediumEmphesisText'} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={700} color={'primaryBlue'} {...props} />
  },
  pink(props: TextProps) {
    return <TextWrapper fontWeight={700} color={'primaryPink'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={700} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={700} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={700} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={700} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: "DM Sans", sans-serif;
  font-display: fallback;
}
input, textarea {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, button {
    font-family: "DM Sans", sans-serif;
  }
  input, textarea {
    // font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`

const breatheAnimation = keyframes`
  0% {filter: hue-rotate(0deg) brightness(1)}
  100% {filter: hue-rotate(90deg) brightness(1.5)}
  100% {filter: hue-rotate(360deg) brightness(1)}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%239C92AC' fill-opacity='0.01'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

body {
  min-height: 100vh;
  /*background-image: ${({ theme }) =>
    theme.darkMode
      ? `radial-gradient(rgba(29, 45, 65, 1), rgba(29, 45, 65, 0.8), rgba(29, 45, 65, 0.2)), url(${BrickWallBackground});`
      : `none`}; 
  background-repeat: repeat */
  /* background-size: cover; */
}

body::after {    
  content: "";
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.8, '#9d53f8')} 0%, ${transparentize(1, '#dd5597')} 100%)`};

  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;

  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 1;
}
`
