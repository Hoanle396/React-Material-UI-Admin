/* eslint-disable react/no-unescaped-entities */
import { Delete, UploadFile } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { DropZoneContainer, StyledImage } from './styled';

type Props = {
    onSuccess?: (file?: File) => void;
    accept?: Accept;
    maxSize?: number;
    name?: string;
    initFile?: string | File;
    sx?: SxProps;
    disable?: boolean;
    children: ReactNode
};

const UploadZone: FC<Props> = ({
    children,
    onSuccess,
    accept = {
        'image/*': ['.jpg', '.png', '.gif'],
    },
    maxSize,
    name,
    initFile,
    disable,
    sx,
}) => {
    const [file, setFile] = useState(initFile);
    useEffect(() => {
        setFile(initFile);
    }, [initFile]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;
            // Do something with the files
            onSuccess && onSuccess(acceptedFiles[0]);
            setFile(acceptedFiles[0]);
        },
        [onSuccess]
    );

    const onDropRejected = useCallback((acceptedFiles: any) => {
        const firstFile = acceptedFiles?.[0];
        if (firstFile.errors && firstFile.errors[0] && firstFile.errors[0].code === 'file-too-large') {
            toast.error('File is too large.');
            return null;
        }

        toast.error('Invalid file extension');
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const previewFile = useMemo(() => {
        if (!file) return undefined;
        return typeof file === 'string' ? file : URL.createObjectURL(file);
    }, [file]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: accept,
        maxSize: maxSize,
        disabled: !!previewFile || disable,
    });

    return (
        <Paper
            sx={{
                mx: 'auto',
                position: 'relative',
                p: 0,
                borderWidth: 1,
                borderColor: 'gray.300',
                borderStyle: isDragActive ? 'dashed' : 'solid',
                ...sx,
            }}
        >
            <DropZoneContainer {...getRootProps()}>
                <input name={name} {...getInputProps()} disabled={disable} />
                {previewFile ? (
                    <Stack
                        sx={{ zIndex: 2, color: '#fff', background: 'rgba(0,0,0,.6)', borderRadius: '8px' }}
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {!disable && (
                            <Button
                                onClick={() => {
                                    onSuccess && onSuccess(undefined);
                                    setFile(undefined);
                                }}
                                startIcon={<Delete />}
                            >
                                remove
                            </Button>
                        )}
                    </Stack>
                ) : (
                    <>
                        <Stack sx={{ zIndex: 2 }} spacing={2} alignItems="center" justifyContent="center">
                            <UploadFile fontSize="large" />

                            <Stack spacing={1}>
                                <Typography align="center" fontWeight={700} fontSize="16px">
                                    Browse or drop file here
                                </Typography>
                                <Typography align="center" variant="caption">
                                    Support JPG, PNG, GIF
                                </Typography>
                                <Typography align="center" variant="caption">
                                    {children}
                                </Typography>
                            </Stack>
                        </Stack>
                    </>
                )}
                {previewFile && <StyledImage src={previewFile} />}
            </DropZoneContainer>
        </Paper>
    );
};

export default UploadZone;