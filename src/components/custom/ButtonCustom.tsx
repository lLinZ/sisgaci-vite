import Button, { ButtonProps } from "@mui/material/Button";
import { lighten, darken, useTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export function ButtonCustom<C extends React.ElementType>(
    props: ButtonProps<C, { component?: C, customcolor?: string, nofull?: boolean }>
) {
    const { children, ...rest } = props;
    const { authState } = useContext(AuthContext);
    const { customcolor, nofull } = rest;
    const theme = useTheme();
    return <Button fullWidth={nofull ? false : true} disableElevation sx={{
        fontFamily: 'Geologica',
        borderRadius: '10em',
        textTransform: 'none',
        p: 1.8,
        fontSize: 16,
        background: rest.variant && rest.variant === 'outlined' ? 'transparent' : customcolor ? lighten(customcolor, 0.3) : authState.lighten,
        borderColor: customcolor ? lighten(customcolor, 0.3) : authState.lighten,
        color: rest.variant && rest.variant !== 'outlined' ? '#FFF' : customcolor ? darken(customcolor, 0.3) : authState.darken,
        '&:hover': {
            borderColor: customcolor ? customcolor : authState.color,
            background:
                rest.variant && rest.variant === 'outlined'
                    ? customcolor ? lighten(customcolor, 0.3) : authState.lighten
                    : customcolor ? customcolor : authState.color
            ,
            color: theme.palette.getContrastText(
                rest.variant && rest.variant === 'outlined'
                    ? customcolor ? lighten(customcolor, 0.3) : authState.lighten
                    : customcolor ? customcolor : authState.color
            )
        }
    }} {...rest} >{children}</Button>;
}