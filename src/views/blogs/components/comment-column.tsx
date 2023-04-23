import { IUser } from '@/api/auth';
import { IBlogs, IComment } from '@/api/blogs';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface IRecord {
    row: {
        original: IComment;
        index: number;
    };
    value: any;
    state: {
        pageIndex: number;
        pageSize: number;
    };
}

const ColumnShape = (
    currentPage: number,
    user?: IUser,
    onOpenDelete?: (row: IComment) => void
) => [
        {
            Header: 'ID',
            accessor: 'id',
            width: 30,
            Cell: ({ row }: IRecord) => {
                const { id } = row.original;

                return (
                    // <Link to={` + id}`}>
                    <Typography color="text.primary">{id}</Typography>
                    // </Link>
                );
            },
        },
        {
            Header: 'Text',
            accessor: 'name',
            Cell: ({
                row: {
                    original: { text, id },
                },
            }: IRecord) => {
                return (
                    <Tooltip title={text || ''}>
                        <p>{text ?? '------'}</p>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Create By',
            accessor: 'creator_name',
            Cell: ({
                row: {
                    original: { createBy },
                },
            }: IRecord) => {
                return (
                    <Tooltip title={createBy.fullname || createBy.email}>
                        <p>{createBy.fullname ?? createBy.email}</p>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            Cell: ({
                row: {
                    original: { createAt },
                },
            }: IRecord) => dayjs(createAt).format('DD-MM-YYYY HH:mm:ss')
        },
        {
            Header: 'Action',
            accessor: 'verified',
            align: 'center',
            Cell: ({ row: { original } }: IRecord) => {
                return (
                    <Stack direction="row" justifyContent="center" sx={{ minWidth: '200px' }}>
                        <Tooltip title={'delete'} placement="top">
                            <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                color="error"
                                onClick={() => onOpenDelete && onOpenDelete(original)}
                            >
                                <Delete />
                            </Button>
                        </Tooltip>
                    </Stack >
                );
            },
        },
    ];

export default ColumnShape;