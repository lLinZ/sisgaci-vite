import { FormControl, FormLabel, FormControlLabel, Radio, RadioProps, RadioGroup, darken, FormHelperText } from '@mui/material'
import { ChangeEvent, useContext } from 'react'
import { AuthContext } from '../../context/auth'

interface Props extends RadioProps {
  label: string;
  defaultvalue: string;
  options: RadioOption[];
  error: boolean;
  helpertext: string;
  onChange: (e: ChangeEvent<any>) => void;
}
type RadioOption = {
  label: string;
  value: string;
}
export const RadioGroupCustom = (props: Props) => {
  const { authState } = useContext(AuthContext);
  return (
    <FormControl fullWidth error={props.error}>
      <FormLabel id={`custom-radio-button-name-${props.label}`} sx={{
        '&.Mui-focused': {
          color: darken(authState.color, 0.1),
        }
      }}>{props.label}</FormLabel>
      <RadioGroup
        aria-labelledby={`custom-radio-button-name-${props.label}`}
        defaultValue={props.defaultvalue}
        onChange={props.onChange}
        name={props.name}
      >
        {props.options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio sx={{
            color: authState.color,
            '&.Mui-checked': {
              color: authState.color
            }
          }} />} label={option.label} />
        ))}
      </RadioGroup>
      {props.helpertext && props.error ? <FormHelperText>{props.helpertext}</FormHelperText> : ''}
    </FormControl>
  )
}