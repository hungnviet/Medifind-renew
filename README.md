# MediFind New Version

## Run the application

Make sure you already install NodeJS and Expo

1. Localize network: All devices must use the same network system.

2. Fix/Upgrade ```expo``` (did it only once)

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

4. **IMPORTANT:** There are some problems with the versions of ```make_plural```. Go to the path ```node_modules/i18n-js/dist/import/Pluralization.js``` and change:
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

The SSRProvider is now unused in native_base. Go to the path ```node_modules/native_base/src/core/NativeBaseProvider.tsx``` and change:

1. Delete <SSRProvider><SSRProvider> that wraps {children} (only delete <><> not {children}).
2. Remove SSRProvider import.
3. Run ```npx patch-package native-base```. Select yes in the prompt.

# Datasets
## Drugbank
## UMLS
