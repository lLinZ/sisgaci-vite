import React, { useContext } from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography';
import { amber, blue, green, red } from '@mui/material/colors';
import { AuthContext } from '../../context/auth';
import { lighten } from '@mui/material';

export function TypographyCustom<C extends React.ElementType>(
    props: TypographyProps<C, { component?: C, fontmode?: number, _color?: string }>
) {
    const { children, ...rest } = props;
    const { authState } = useContext(AuthContext)
    let mode = '1'
    mode = !rest.fontmode ? mode : String(rest.fontmode);

    const colorHash: any = {
        'p': authState.color,
        's': lighten(authState.color, 0.6),
        'success': green[500],
        'info': blue[500],
        'warning': amber[500],
        'error': red[500],
    }

    const fontFamilyHash: any = {
        '1': 'Geologica',
        '2': 'Noto Sans Warang Citi',
        '3': 'Open Sans',
        '4': 'Ubuntu',
    }
    let styles = {};

    styles = rest._color ? {
        fontFamily: fontFamilyHash[mode],
        color: colorHash[rest._color]
    } : {
        fontFamily: fontFamilyHash[mode],
    };
    return <Typography sx={{ ...styles }} {...rest}>{children}</Typography>;
}