# MediFind+ New Version

## Run the application

Make sure you already have npm and expo

1. Localize the network (all devices must use the same network system).

2. Fix/Upgrade expo

```shell
npm install expo 
npm i expo@49.0.16
expo doctor --fix-dependencies
npx expo-doctor
npx expo install --fix
expo upgrade
```

3. Start ```react-native```

Sometimes, the bundler's cache is causing problems. You can clear it with these commands.

For Metro (React Native's bundler):
```shell
npx react-native start --reset-cache
```

or:

```shell
expo start -c
```

## Fix dependencies

The problem is some packages include some source files that Metro does not pick up by default. You can fix this by making sure the extension is included in the ```resolver.sourceExts``` setting in your ```metro.config.js``` like

```typescript
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts
const sourceExts = [ 'jsx', 'js', 'ts', 'tsx', 'json', 'svg', 'd.ts', 'mjs' ].concat(defaultSourceExts)

module.exports = {
  resolver: {
    sourceExts
  },
}
```