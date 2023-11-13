import { useContext } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AuthContext } from '../../context/auth';

export function TextFieldWithIconCustom(
    props: TextFieldProps
) {
    const { children, ...rest } = props;

    const { authState } = useContext(AuthContext);
    return <TextField fullWidth InputProps={{
        endAdornment: children
    }} sx={{
        '& input': {
            fontFamily: 'Noto Sans Warang Citi',
        },
        '& fieldset': {
            borderRadius: '10em',
            fontFamily: 'Noto Sans Warang Citi',
            background: 'rgba(100,100,100,0.1)',
            border: 'none'
        },
        '& label.Mui-focused': {
            color: authState.color,
        },
        '& label': {
            fontFamily: 'Noto Sans Warang Citi'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                border: '2px solid',
                borderColor: authState.color,
            },
        },
    }
    } {...rest} />;
}