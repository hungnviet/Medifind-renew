# MediFind New Version

## Run the application

Make sure you already install NodeJS and Expo

1. Localize network: All devices must use the same network system.

2. Fix/Upgrade ```expo``` (làm một lần duy nhất thôi nhé)

```shell
npm install expo 
npm i expo@49.0.16
expo doctor --fix-dependencies
npx expo-doctor
npx expo install --fix
expo upgrade
```

3. Run ```npm```
```shell
npm install
```

4. IMPORTANT: There are some problems with the versions of ```make_plural```. Go to the path ```node_modules/i18n-js/dist/import/Pluralization.js``` and change:
```typescript
// import { en } from "make-plural";
export function useMakePlural({ pluralizer, includeZero = true, ordinal = false, }) {
    return function (_i18n, count) {
        return [
            includeZero && count === 0 ? "zero" : "",
            pluralizer(count, ordinal),
        ].filter(Boolean);
    };
}
export const defaultPluralizer = useMakePlural({
    pluralizer: (n: number | string, ord?: boolean) => "one" | "two" | "few" | "other",
    includeZero: true,
});
export class Pluralization {
    constructor(i18n) {
        this.i18n = i18n;
        this.registry = {};
        this.register("default", defaultPluralizer);
    }
    register(locale, pluralizer) {
        this.registry[locale] = pluralizer;
    }
    get(locale) {
        return (this.registry[locale] ||
            this.registry[this.i18n.locale] ||
            this.registry["default"]);
    }
}
//# sourceMappingURL=Pluralization.js.map
```

## Fix dependencies

Some packages include some source files that Metro does not pick up by default. Fix this by making sure the extension is included in the ```resolver.sourceExts``` setting in your ```metro.config.js``` like

```typescript
// metro.config.js - see https://docs.expo.dev/guides/customizing-metro/#customizing
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watcher.additionalExts.push('mjs', 'cjs');

module.exports = config;
```

## Fix warning

The ```SSRProvider``` is now unused. Go to the path ```node_modules/native_base/src/core/NativeBaseProvider.tsx``` and change:
```typescript
import React from 'react';
import {
  SafeAreaProvider,
  Metrics,
  initialWindowMetrics as defaultInitialWindowMetrics,
} from 'react-native-safe-area-context';
// import { SSRProvider } from '@react-native-aria/utils';
import { theme as defaultTheme, ITheme } from './../theme';
import type { IColorModeProviderProps } from './color-mode';
import HybridProvider from './hybrid-overlay/HybridProvider';
import { OverlayProvider } from '@react-native-aria/overlays';
import { ToastProvider, ToastRef } from '../components/composites/Toast';
import {
  defaultConfig,
  INativebaseConfig,
  NativeBaseConfigProvider,
} from './NativeBaseContext';
import { useToast } from '../components/composites/Toast';
import { Platform, useWindowDimensions } from 'react-native';
import {
  getClosestBreakpoint,
  platformSpecificSpaceUnits,
} from '../theme/tools/utils';
import { ResponsiveQueryProvider } from '../utils/useResponsiveQuery';

// For SSR to work, we need to pass initial insets as 0 values on web.

// https://github.com/th3rdwave/react-native-safe-area-context/issues/132
const defaultInitialWindowMetricsBasedOnPlatform: Metrics | null = Platform.select(
  {
    web: {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    },
    default: defaultInitialWindowMetrics,
  }
);

export interface NativeBaseProviderProps {
  theme?: ITheme;
  colorModeManager?: IColorModeProviderProps['colorModeManager'];
  children?: React.ReactNode;
  initialWindowMetrics?: any;
  config?: INativebaseConfig;
  isSSR?: boolean;
  disableContrastText?: boolean;
  // Refer https://github.com/th3rdwave/react-native-safe-area-context#testing
}

const NativeBaseProvider = (props: NativeBaseProviderProps) => {
  const {
    colorModeManager,
    config = defaultConfig,
    children,
    theme: propsTheme = defaultTheme,
    initialWindowMetrics,
    isSSR,
    disableContrastText,
  } = props;
  const theme = config.theme ?? propsTheme;

  const newTheme = React.useMemo(() => {
    if (config.enableRem) {
      return platformSpecificSpaceUnits(theme);
    }
    return theme;
  }, [config.enableRem, theme]);

  const windowWidth = useWindowDimensions()?.width;

  const currentBreakpoint = React.useMemo(
    () => getClosestBreakpoint(newTheme.breakpoints, windowWidth),
    [windowWidth, newTheme.breakpoints]
  );

  return (
    <NativeBaseConfigProvider
      theme={newTheme}
      config={config}
      currentBreakpoint={currentBreakpoint}
      isSSR={isSSR}
      disableContrastText={disableContrastText}
    >
      <SafeAreaProvider
        initialMetrics={
          initialWindowMetrics ?? defaultInitialWindowMetricsBasedOnPlatform
        }
      >
        <ResponsiveQueryProvider disableCSSMediaQueries={!isSSR}>
          <HybridProvider
            colorModeManager={colorModeManager}
            options={theme.config}
          >
            <OverlayProvider isSSR>
              <ToastProvider>
                <InitializeToastRef />
                {children}
              </ToastProvider>
            </OverlayProvider>
          </HybridProvider>
        </ResponsiveQueryProvider>
      </SafeAreaProvider>
    </NativeBaseConfigProvider>
  );
};

const InitializeToastRef = () => {
  const toast = useToast();
  ToastRef.current = toast;
  return null;
};

export { NativeBaseProvider };
```

# Datasets
## Drugbank
## UMLS
