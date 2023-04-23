import { IUser } from '@/api/auth';
import { IBlogs } from '@/api/blogs';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface IRecord {
    row: {
        original: IBlogs;
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
    user?: IUser
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
            Header: 'Nane',
            accessor: 'name',
            Cell: ({
                row: {
                    original: { name, id },
                },
            }: IRecord) => {
                return (
                    <Tooltip title={name || ''}>
                        <p>{name ?? '------'}</p>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Description',
            accessor: 'description',
            Cell: ({ row }: IRecord) => {
                const { description, id } = row.original;
                return (
                    <Tooltip title={description || ''}>
                        <Typography noWrap sx={{ maxWidth: 150 }} fontWeight={400}>
                            {description || ''}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Create By',
            accessor: 'creator_name',
            Cell: ({
                row: {
                    original: { createdBy },
                },
            }: IRecord) => {
                return (
                    <Tooltip title={createdBy.fullname || createdBy.email}>
                        <p>{createdBy.fullname ?? createdBy.email}</p>
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
                        <Tooltip title={'update'} placement="top">
                            <Link to={`#`}>
                                <Button variant="contained" sx={{ m: 1 }}>
                                    <Edit />
                                </Button>
                            </Link>
                        </Tooltip>

                        <Tooltip title={'delete'} placement="top">
                            <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                color="error"
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