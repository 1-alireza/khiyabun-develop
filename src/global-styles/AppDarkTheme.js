import { DarkTheme } from '@react-navigation/native';

const AppDarkTheme = {
    ...DarkTheme,
    dark: false,
    colors: {
        ...DarkTheme.colors,
        background:'#1D1D1D',

        primary: '#4A75F5',
        darkPrimary: '#6D8AE1',
        primaryContainer: '#062244',
        onPrimaryContainer: '#E7E7E7',
        primaryOutline: '#114988',

        secondary: '#E78135',
        darkSecondary: '#F0A264',
        secondaryContainer: '#4C290E',
        secondaryOutline: '#A44A02',

        confirm: '#4CAF50',
        darkConfirm: '#60DB65',
        confirmContainer: '#07380A',
        confirmOutline: '#0D8614',

        info: '#4A75F5',
        darkInfo: '#87A6FF',
        infoContainer: '#07294F',
        infoOutline: '#114988',

        warning: '#E78135',
        darkWarning: '#F0A264',
        warningContainer: '#4C290E',
        warningOutline: '#A44A02',

        error: '#DB3329',
        darkError: '#FF7A73',
        errorContainer: '#4A0300',
        errorOutline: '#630400',

        surface: '#1D1D1D',
        onSurface: '#E7E7E7',
        outlineSurface: '#282828',

        surfaceContainerLowest: '#171717',
        onSurfaceLowest: '#868686',
        outlineLowest: '#313131',

        surfaceContainerLow: '#323232',
        onSurfaceLow: '#A3A3A3',
        outlineLow: '#434343',

        surfaceContainer: '#404040',
        onSurfaceContainer: '#BABABA',
        outlineContainer: '#575757',

        surfaceContainerHigh: '#525252',
        onSurfaceHigh: '#EEEEEE',
        outlineHigh: '#777777',

        surfaceContainerHighest: '#686868',
        onSurfaceHighest: '#FFFFFF',
        outlineHighest: '#898989',

        disabledSurface: '#3D3D3D',
        onDisabled: '#6C6C6C',
        outlineDisabled: '#646464',

        textOn: '#FFFFFF',

        white: '#FFFFFF',
        black: '#000000',
    }
}

export default AppDarkTheme;