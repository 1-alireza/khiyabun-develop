import {DefaultTheme} from "@react-navigation/native";

const AppLightTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        background:'#F2F2F2',

        primary: '#4A75F5',
        darkPrimary: '#3B5EC4',
        primaryContainer: '#D8EAFF',
        onPrimaryContainer: '#232323',
        primaryOutline: '#AAC8EB',

        secondary: '#E78135',
        darkSecondary: '#BD6C31',
        secondaryContainer: '#FFE6D2',
        secondaryOutline: '#FFCEA6',

        confirm: '#4CAF50',
        darkConfirm: '#3D8C40',
        confirmContainer: '#D6F5D8',
        confirmOutline: '#ABECAF',

        info: '#4A75F5',
        darkInfo: '#3B5EC4',
        infoContainer: '#D8EAFF',
        infoOutline: '#C5E0FF',

        warning: '#E78135',
        darkWarning: '#BD6C31',
        warningContainer: '#FFE6D2',
        warningOutline: '#FFDFC5',

        error: '#DB3329',
        darkError: '#B3261E',
        errorContainer: '#FFDBD9',
        errorOutline: '#E3BEBC',

        surface: '#F2F2F2',
        onSurface: '#404040',
        outlineSurface: '#E5E5E5',

        surfaceContainerLowest: '#FFFFFF',
        onSurfaceLowest: '#A3A3A3',
        outlineLowest: '#DADADA',

        surfaceContainerLow: '#EBEBEB',
        onSurfaceLow: '#7A7A7A',
        outlineLow: '#D3D3D3',

        surfaceContainer: '#D6D6D6',
        onSurfaceContainer: '#525252',
        outlineContainer: '#C5C5C5',

        surfaceContainerHigh: '#C2C2C2',
        onSurfaceHigh: '#292929',
        outlineHigh: '#AFAFAF',

        surfaceContainerHighest: '#ADADAD',
        onSurfaceHighest: '#000000',
        outlineHighest: '#9C9C9C',

        disabledSurface: '#DADADA',
        onDisabled: '#9A9A9A',
        outlineDisabled: '#C6C6C6',

        textOn: '#FFFFFF',

        white: '#FFFFFF',
        black: '#000000',
    }
}

export default AppLightTheme;