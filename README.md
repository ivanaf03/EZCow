# EZCow


### 1.Project setup
Create a new project with the following command:

```
npx create-expo-app 
```

Set the project name to `ezcow` and install the following packages:

```
cd ezcow

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-reanimated expo-sqlite

npm install nativewind@2.0.11

npm install tailwindcss@3.3.2
```


### 2.Project configuration
Create the file `tailwind.config.js` in the root of the project:

```
npx tailwindcss init
```

Modify `tailwind.config.js`:

```
// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create and modify the file `babel.config.js` in the root of the project:

```
// babel.config.js

module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: ['nativewind/babel'],
    };
};
```

Edit the file `app.json` and choose the appropriate assets for the project.

#### Oauth config
Install the following packages:
```
npx expo install expo-auth-session expo-crypto

npm install react-native-dotenv
```

Edit the file `app.json` and add the following configuration:
```
"android": {
  "package": "com.ezcow.app",
  ...
}
```

Install the following packages:
```
npm install -g eas-cli
```

Run the following commands:
```
eas login
eas build:configure
eas credentials
```

Simulate the production build:
```
npx expo prebuild --clean
```

### 3.Testing
Install the following packages:
```
npx expo install jest-expo jest

npm install --save-dev @testing-library/react-native
```

### 4.Git format
Branches:
- main
- develop
- featureX

Commits:
- [FEATUREX] Commit message
- [CONFIG] Commit message

### 5.Bibliography
https://reactnative.dev/docs/getting-started > React Native documentation
https://docs.expo.dev > Expo docs
https://docs.expo.dev/versions/latest/sdk/router/ > Expo docs for router
https://docs.expo.dev/versions/latest/sdk/auth-session/ > OAuth2 library documentation
https://youtu.be/ff9phJxk5ck?si=G4pFdbglUFRjHM6i > OAuth2 with Expo (Neunapp)
https://docs.expo.dev/router/advanced/tabs/ > Expo docs for tabs
https://www.sqlite.org/datatype3.html > SQLite documentation