import { useContext, useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { lighten } from '@mui/material/styles';
import { AuthContext } from '../../../context/auth';
import { TypographyCustom } from '../../custom';
import Box from '@mui/material/Box';
import CheckRounded from '@mui/icons-material/CheckRounded';
interface Props {
    mensaje: string;
}
const ProgressBar = ({ mensaje }: Props) => {
    const [progress, setProgress] = useState(100);
    const { authState } = useContext(AuthContext)
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => prevProgress - 1);
        }, 20);

        setTimeout(() => {
            clearInterval(timer);
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ background: '#FFF', p: 2, width: '100%' }}>
            <CheckRounded color='success' />
            <TypographyCustom>{mensaje}</TypographyCustom>
            <LinearProgress variant="determinate" value={progress} sx={{ background: 'rgba(100,100,100,0.1)', '& .MuiLinearProgress-bar': { backgroundColor: lighten(authState.color, 0.2) } }} />
        </Box>
    );
};

export default ProgressBar;
