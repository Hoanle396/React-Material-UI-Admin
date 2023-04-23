import { Pagination, styled } from '@mui/material';

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  '& .MuiPaginationItem-page:hover': {
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '& .MuiPaginationItem-previousNext': {
    margin: 10,
    borderRadius: 20,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': { backgroundColor: 'transparent' },
  },
}));