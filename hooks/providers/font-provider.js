import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const FontContext = React.createContext();

const FontProvider = ({ children }) => {

    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    React.useEffect(() => {
        const loadFonts = async () => {
            await SplashScreen.preventAutoHideAsync();
            await Font.loadAsync({
                'Nunito-Black': require('../../assets/fonts/Nunito-Black.ttf'),
                'Nunito-BlackItalic': require('../../assets/fonts/Nunito-BlackItalic.ttf'),
                'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
                'Nunito-BoldItalic': require('../../assets/fonts/Nunito-BoldItalic.ttf'),
                'Nunito-ExtraBold': require('../../assets/fonts/Nunito-ExtraBold.ttf'),
                'Nunito-ExtraBoldItalic': require('../../assets/fonts/Nunito-ExtraBoldItalic.ttf'),
                'Nunito-ExtraLight': require('../../assets/fonts/Nunito-ExtraLight.ttf'),
                'Nunito-ExtraLightItalic': require('../../assets/fonts/Nunito-ExtraLightItalic.ttf'),
                'Nunito-Italic': require('../../assets/fonts/Nunito-Italic.ttf'),
                'Nunito-Light': require('../../assets/fonts/Nunito-Light.ttf'),
                'Nunito-LightItalic': require('../../assets/fonts/Nunito-LightItalic.ttf'),
                'Nunito-Medium': require('../../assets/fonts/Nunito-Medium.ttf'),
                'Nunito-MediumItalic': require('../../assets/fonts/Nunito-MediumItalic.ttf'),
                'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
                'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf'),
                'Nunito-SemiBoldItalic': require('../../assets/fonts/Nunito-SemiBoldItalic.ttf'),
            });
            setFontsLoaded(true);
            await SplashScreen.hideAsync();
        };
        loadFonts();
    }, []);

    return (
        <FontContext.Provider value={fontsLoaded}>
            {children}
        </FontContext.Provider>
    );
}

export default FontProvider;

export const useFonts = () => React.useContext(FontContext);