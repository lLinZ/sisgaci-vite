import Grid from '@mui/material/Grid'
import { OptionWidget } from '.';
import { Option } from '../../../interfaces';
type Breakpoints = {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
type Props = {
    options: Option[];
    breakpoints?: Breakpoints;
}
export const OptionsList = (props: Props) => {
    const { breakpoints = { xs: 6, sm: 6, md: 4, lg: 3 } } = props;
    return (
        <Grid container display='flex' alignItems='center' justifyContent='space-between' spacing={1} sx={{ padding: 2 }}>
            {props.options.map((option) => (
                <Grid item {...breakpoints} key={option.text}>
                    <OptionWidget option={option} />
                </Grid>
            ))}
        </Grid >
    )
}