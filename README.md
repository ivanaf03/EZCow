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