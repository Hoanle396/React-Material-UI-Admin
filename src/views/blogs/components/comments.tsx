import { useUser } from "@/api/auth";
import { IBlogs, IComment, deleteComment, useCommentById } from "@/api/blogs";
import ModalDelete, { RefModal } from "@/components/ModalDelete";
import CustomTable from "@/components/table";
import useTitle from "@/hooks/use-title";
import { Box } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ColumnShape from "./comment-column";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
const Comments = () => {
    useTitle('Comments')
    const [pageParams, setPageParams] = useState({ page: 1, skip: 0, take: 10 });
    let { id } = useParams();
    const navigate = useNavigate()
    const { user } = useUser()
    const { data, refetch } = useCommentById(Number(id))

    const { mutate } = useMutation(deleteComment, {
        onSuccess: () => {
            toast.dismiss()
            refetch()
            toast.success('deleted comment successfully')
        },
        onError: () => {
            toast.dismiss()
            toast.error('deleted comment failed')
        }
    })

    const refModalDelete = useRef<RefModal>(null)
    const onRefetch = useCallback(() => {
        refetch()
    }, [refetch])

    const onOpenDelete = useCallback((item: IComment) => {
        refModalDelete.current?.onOpen(item)
    }, [])

    const columns = useMemo(() => {
        return ColumnShape(pageParams.page, user, onOpenDelete);
    }, [user, pageParams.page]);

    return (
        <Box pt={2} pb={4}>
            {/* <Stack width={"100%"} flex="1" direction="row" paddingX={10} justifyContent="end" >
                <Link to="/admin/blogs/create">
                    <Button variant="contained">Add new</Button>
                </Link>
            </Stack> */}

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

export default Comments
