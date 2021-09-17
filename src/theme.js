import { Platform } from 'react-native';
const theme = {
  colors: {
    textPrimary: '#282a36',
    textSecondary: '#f8f8f2',
    background: '#282a36',
    grey: '#44475a',
    purple: '#bd93f9',
    error: '#ff5555',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
