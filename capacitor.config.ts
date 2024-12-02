import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Recetin.Recetin',
  appName: 'Recetin',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: false, 
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
    },
  },
};

export default config;
