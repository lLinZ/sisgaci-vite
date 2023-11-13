import { useContext } from 'react'
import { AuthContext } from '../../context/auth';
import { lighten, darken, useTheme, InputLabel, Select, SelectProps, FormControl, FormHelperText } from '@mui/material';

interface CustomSelectProps extends SelectProps {
    helpertext: string;
    uppersx?: any;
}
export function SelectCustom(
    props: CustomSelectProps
) {
    const { children, ...rest } = props;

    const { authState } = useContext(AuthContext);
    const theme = useTheme();
    const paperProps = {
        sx: {
            '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: authState.color,
                color: theme.palette.getContrastText(authState.color)
            },
            "& .MuiMenuItem-root:hover": {
                backgroundColor: lighten(authState.color, 0.7),
                color: theme.palette.getContrastText(lighten(authState.color, 0.7))
            },
            "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: darken(authState.color, 0.5),
                color: theme.palette.getContrastText(darken(authState.color, 0.5))
            }
        }
    }
    const baseStyles = {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: lighten(authState.color, 0.3),
        },
        '& fieldset': {
            borderRadius: '10em',
        },
        '& .MuiSelect-select': {
            fontFamily: 'Noto Sans Warang Citi',
        },
    }
    const selectSx = rest.sx
        ? {
            ...baseStyles,
            ...rest.sx,
        }
        : baseStyles
    return (
        <FormControl fullWidth error={rest.error}>
            <InputLabel id={rest.labelId} sx={{
                fontFamily: 'Noto Sans Warang Citi',
                '&.Mui-focused': {
                    color: authState.color
                },
            }}>{rest.label}</InputLabel>
            <Select fullWidth MenuProps={paperProps} sx={selectSx} {...rest} >
                {children}
            </Select>
            {rest.helpertext && rest.error ? <FormHelperText>{rest.helpertext}</FormHelperText> : ''}
            </FormControl>
        )
}

