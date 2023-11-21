import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { TextFieldCustom } from '.';
import { darken, lighten } from '@mui/material';
import { AuthContext } from '../../context/auth';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { DateField, StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

interface Props {
    setValue: Dispatch<SetStateAction<any>>;
    rest: any;
}
export const CalendarCustom = (props: Props) => {
    const [value, setValue] = useState(new Date())
    const handleChange = (newValue: any) => {
        setValue(newValue)
        console.log({ fecha: moment(newValue).format('DD-MM-yyyy') })
        props.setValue(newValue);
    }
    const { authState } = useContext(AuthContext)
    return (
        <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
            <DateField
                {...props.rest}
                // inputFormat='dd-MM-yyyy'
                value={value}
                onChange={handleChange}
                sx={{
                    width: '100%',
                    '& input': {
                        fontFamily: 'Noto Sans Warang Citi',
                    },
                    '& fieldset': {
                        borderRadius: 10,
                        fontFamily: 'Noto Sans Warang Citi',
                    },
                    '& label.Mui-focused': {
                        color: darken(authState.color, 0.3),
                    },
                    '& label': {
                        fontFamily: 'Noto Sans Warang Citi'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: lighten(authState.color, 0.3),
                        },
                    },
                }}
            // renderInput={(params: any) => <TextFieldCustom {...params} />}
            />
        </LocalizationProvider>
    )
}