import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fbfbfb'
        },
        primary: {
            main: '#2f9439',
        },
        secondary: {
            main: '#84967f',
        },
        info: {
            main: '#6b989e',
        }
    },
    typography: {
        allVariants: {
            fontFamily: ['Geologica', 'Noto Sans Warang Citi', 'Open Sans', 'Ubuntu', 'Sans-serif'].join(','),
        },
        htmlFontSize: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#fbfbfb",
                },
            },
        },
    }
});
