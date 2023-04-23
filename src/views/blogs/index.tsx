import useTitle from "@/hooks/use-title";
import { Box, Button, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ColumnShape from "./components/column-shape";
import { useUser } from "@/api/auth";
import CustomTable from "@/components/table";
import { useBlogs } from "@/api/blogs";
import { Link } from "react-router-dom";
const Blogs = () => {
    useTitle('Blogs')
    const [pageParams, setPageParams] = useState({ page: 1, skip: 0, take: 10 });
    const { user } = useUser()
    const { data } = useBlogs({
        skip: pageParams.skip,
        take: pageParams.take
    })
    const columns = useMemo(() => {
        return ColumnShape(pageParams.page, user);
    }, [user, pageParams.page]);

    return (
        <Box pt={2} pb={4}>
            <Stack width={"100%"} flex="1" direction="row" paddingX={10} justifyContent="end" >
                <Link to={"#"}>
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
        </Box>
    );
}

export default Blogs
