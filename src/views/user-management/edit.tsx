import { IPayloadCreateUser, IUser, createUser, updateUser, useUserById } from "@/api/auth";
import FormWrapper from "@/components/FormWrapper";
import TextField from "@/components/TextField";
import useTitle from "@/hooks/use-title";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, Stack, Typography } from '@mui/material';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
const UpdateUsers = () => {
    useTitle('Update Users')
    const navigate = useNavigate()
    let { id } = useParams();
    const [user, setUser] = useState<IUser>()

    const { mutate, isLoading } = useMutation(updateUser, {
        onSuccess: () => {
            toast.dismiss()
            toast.success('update User successfully')
            navigate('/admin/user')
        },
        onError: () => {
            toast.dismiss()
            toast.error('update User failed')
        }
    })

    const schema = yup.object().shape({
        fullname: yup.string().max(255).required(),
        email: yup.string().email().required()
    })
    const methods = useForm<IPayloadCreateUser>({
        defaultValues: { fullname: '', email: '' },
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const handleSubmit = (data: IPayloadCreateUser) => {
        mutate({ ...data, id: Number(user?.id) })

    }

    const { isLoading: blogLoading } = useUserById(Number(id), {
        onSuccess: (data) => {
            setUser(data)
            methods.reset(data)
        }
    })
    return (
        <Box pt={2} pb={4}>
            <Box p={5} width="100%">
                <FormWrapper methods={methods} onSubmit={handleSubmit}>
                    <Stack flexDirection="column" spacing={3}>
                        <Typography fontSize={16} fontWeight={600}>
                            Update User
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                label="Profile Name"
                                fullWidth
                                name="fullname"
                                limit={100}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField label="User email" fullWidth name="email" />
                        </FormControl>
                    </Stack>

                    <FormControl margin="dense">
                        <LoadingButton variant="contained" loading={isLoading} type="submit">Submit</LoadingButton>
                    </FormControl>
                </FormWrapper>
            </Box>
        </Box>
    );
}

export default UpdateUsers
