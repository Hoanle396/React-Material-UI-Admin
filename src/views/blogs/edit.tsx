import { IBlogs, IPayloadCreateBlogs, updateBlogs, useBlogById } from "@/api/blogs";
import FormWrapper from "@/components/FormWrapper";
import TextField from "@/components/TextField";
import UploadZone from "@/components/UploadZone";
import useTitle from "@/hooks/use-title";
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Stack, Typography } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
const EditBlogs = () => {
    useTitle('Edit Blogs')
    let { id } = useParams();
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState<IBlogs>()

    const { mutate, isLoading } = useMutation(updateBlogs, {
        onSuccess: () => {
            toast.dismiss()
            toast.success('updated blog successfully')
            navigate('/admin/blogs')
        },
        onError: () => {
            toast.dismiss()
            toast.error('updated blog failed')
        }
    })

    const schema = yup.object().shape({
        name: yup.string().max(255).required(),
        slugs: yup.string(),
        image: yup.mixed().required(),
        description: yup.string()
    })

    const methods = useForm<IPayloadCreateBlogs>({
        defaultValues: {
            name: blogData?.name ?? "",
            slugs: blogData?.slugs ?? '',
            image: blogData?.image ?? '',
            description: blogData?.description ?? ''
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const { isLoading: blogLoading } = useBlogById(Number(id), {
        onSuccess: (data) => {
            setBlogData(data)
            methods.reset(data)
        }
    })


    const handleSubmit = (data: IPayloadCreateBlogs) => {
        const formData = new FormData()
        formData.append('file', data.image)
        formData.append('upload_preset', 'vdrkseig')
        axios.post('https://api.cloudinary.com/v1_1/vku-blog/image/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((response) => {
                mutate({ ...data, image: response.data.url, id: Number(blogData?.id) })
            })
            .catch(err => {
                toast.error("Upload image failed")
            })
    }


    return (
        <Box pt={2} pb={4}>
            <Box p={5} width="100%">
                <FormWrapper methods={methods} onSubmit={handleSubmit}>
                    <Stack flexDirection="column" spacing={3}>
                        <Typography fontSize={16} fontWeight={600}>
                            Edit Blog
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                label="Blog Title"
                                fullWidth
                                name="name"
                                id="name"
                                defaultValue={blogData?.name}
                                limit={255}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField label="Blog Slug" fullWidth name="slugs" defaultValue={blogData?.slugs} id="slugs" />
                        </FormControl>
                        <Stack flexDirection="row" justifyContent="flex-start">
                            <Typography fontSize={16} fontWeight={600}>
                                Upload Image
                            </Typography>
                            &nbsp;
                            <Typography fontSize={14} fontWeight={400}>
                                ( Recommended size 852*246 )
                            </Typography>
                        </Stack>
                        <UploadZone
                            initFile={blogData?.image}
                            sx={{ width: '100%', height: 246, mx: 'unset' }}
                            onSuccess={file => methods.setValue('image', file!)}
                            maxSize={4 * 1024 * 1024}
                        >
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Typography fontSize={16} fontWeight={400}>
                                    Click or drag file to this area to upload
                                </Typography>
                                <Typography fontSize={12} fontWeight={400}>
                                    PNG,JPEG format. Maximun size is 4MB
                                </Typography>
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<Upload />}
                                    id="image"
                                >
                                    Upload Image
                                </Button>
                            </Box>
                        </UploadZone>
                        {methods.formState.errors.image && (
                            <Typography fontSize={12} sx={{ color: 'red', mt: 1 }}>
                                {methods.formState.errors.image.message?.toString()}
                            </Typography>
                        )}
                        <FormControl fullWidth>
                            <TextField label="Blog Description" multiline rows={5} id="description" fullWidth name="description" defaultValue={blogData?.description} />
                        </FormControl>
                    </Stack>

                    <FormControl margin="dense">
                        <LoadingButton variant="contained" loading={isLoading} type="submit" name="submit">Submit</LoadingButton>
                    </FormControl>
                </FormWrapper>
            </Box>
        </Box>
    );
}

export default EditBlogs
