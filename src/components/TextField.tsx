/* eslint-disable react/react-in-jsx-scope */
import {
    Box,
    InputAdornment,
    TextField as MuiTextField,
    TextFieldProps
} from '@mui/material'
import { FC, memo, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Props = TextFieldProps & {
    name: string
    label?: any
    defaultValue?: string
    icon?: any
    hideError?: boolean
    counter?: boolean
    limit?: number
}

const TextField: FC<Props> = ({
    icon,
    name,
    defaultValue = '',
    limit,
    counter,
    hideError,
    label,
    ...props
}) => {
    const {
        control,
        formState: { errors }
    } = useFormContext()

    const startIcon = useMemo(() => {
        if (!icon) return
        return <InputAdornment position="start">{icon}</InputAdornment>
    }, [icon])

    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={name}
            render={({ field }) => (
                <Box sx={{ position: 'relative', pt: 0.1 }}>
                    <MuiTextField
                        {...field}
                        label={label}
                        InputProps={{ startAdornment: startIcon }}
                        inputProps={{ maxLength: limit || Infinity }}
                        fullWidth
                        defaultValue={defaultValue}
                        variant="outlined"
                        error={!!errors[name]}
                        helperText={
                            !hideError && errors[name]
                                ? String(errors[name]?.message ?? '')
                                : ''
                        }
                        {...props}
                    />
                    {counter && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -5,
                                right: 5,
                                color: '#AEB0C1',
                                fontSize: 13,
                                lineHeight: '24px'
                            }}
                        >
                            {field.value.length}/{limit}
                        </Box>
                    )}
                </Box>
            )}
        />
    )
}

export default memo(TextField)
