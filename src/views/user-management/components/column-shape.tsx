import { IUser } from '@/api/auth';
import { IBlogs } from '@/api/blogs';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface IRecord {
    row: {
        original: IUser;
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
    onOpenDelete?: (row: IUser) => void
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
                    original: { fullname, id },
                },
            }: IRecord) => {
                return (
                    <Tooltip title={fullname || ''}>
                        <p>{fullname ?? '------'}</p>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ row }: IRecord) => {
                const { email, id } = row.original;
                return (
                    <Tooltip title={email || ''}>
                        <Typography noWrap sx={{ maxWidth: 150 }} fontWeight={400}>
                            {email || ''}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            Header: 'Role',
            accessor: 'creator_name',
            Cell: ({
                row: {
                    original: { roles },
                },
            }: IRecord) => {
                return (
                    <Chip label={roles} />
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
                            <Link to={`/admin/users/${original.id}`}>
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