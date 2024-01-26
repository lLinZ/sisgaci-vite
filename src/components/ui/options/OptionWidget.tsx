import { ReactElement, useContext } from 'react'
import Chip, { ChipPropsColorOverrides, chipClasses } from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Option } from '../../../interfaces';
import { AuthContext } from '../../../context/auth';

type Props = {
    option: Option
}
export const OptionWidget = (props: Props) => {
    const theme = useTheme();
    const { authState } = useContext(AuthContext);
    const router = useNavigate();
    return (<Chip icon={props.option.icon as ReactElement<any>} label={props.option.text} onClick={() => router(props.option.path)} variant='filled' sx={{ outline: 'none', borderRadius: 2, display: 'flex', justifyContent: 'start', padding: 2, background: '#FFF', boxShadow: '0px 2px 8px rgba(100,100,100,0.1)', [`& .${chipClasses.icon}`]: { color: authState.darken }, fontFamily: 'Geologica', width: '100%' }} />)
}