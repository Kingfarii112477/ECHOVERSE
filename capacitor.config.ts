import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.echoverse.app',
  appName: 'EchoVerse AI',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    // For development: comment this out for production builds
    // url: 'http://192.168.1.100:3000',
    // cleartext: true,
  },
  android: {
    minWebViewVersion: 60,
    backgroundColor: '#0e1417',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0e1417',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#14d8ff',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
