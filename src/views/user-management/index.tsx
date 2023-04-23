import useTitle from "@/hooks/use-title";
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ColumnShape from "./components/column-shape";
import { IUser, deleteUser, useUser, useUsers } from "@/api/auth";
import CustomTable from "@/components/table";
import { IBlogs, deleteBlogs, useBlogs } from "@/api/blogs";
import { Link } from "react-router-dom";
import ModalDelete, { RefModal } from "@/components/ModalDelete";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
const Blogs = () => {
    useTitle('User Management');
    
    const [pageParams, setPageParams] = useState({ page: 1, skip: 0, take: 10 });
    const { user } = useUser()
    const { data, refetch } = useUsers({
        skip: pageParams.skip,
        take: pageParams.take
    })

    const { mutate } = useMutation(deleteUser, {
        onSuccess: () => {
            toast.dismiss()
            refetch()
            toast.success('deleted user successfully')
        },
        onError: () => {
            toast.dismiss()
            toast.error('deleted user failed')
        }
    })

    const refModalDelete = useRef<RefModal>(null)
    const onRefetch = useCallback(() => {
        refetch()
    }, [refetch])

    const onOpenDelete = useCallback((item: IUser) => {
        refModalDelete.current?.onOpen(item)
    }, [])

    const columns = useMemo(() => {
        return ColumnShape(pageParams.page, user, onOpenDelete);
    }, [user, pageParams.page]);

    return (
        <Box pt={2} pb={4}>
            <Stack width={"100%"} flex="1" direction="row" paddingX={10} justifyContent="end" >
                <Link to="/admin/users/create">
                    <Button variant="contained">Add new</Button>
                </Link>
            </Stack>

            {/* {isLoading && (
                <FlexBox justifyContent="center" width="100%">
                    <CircularProgress />
                </FlexBox>
            )} */}

            <CustomTable
                columnShape={columns}
                pageSize={0}
                pageCount={0}
                currentPage={0}
                data={data?.rows ?? []}
                fetchNextPage={(nextPage) => setPageParams((prevState) => ({ ...prevState, page: nextPage }))}
            />
            <ModalDelete ref={refModalDelete} onRefetch={onRefetch} onDelete={mutate} />
        </Box>
    );
}

export default Blogs
