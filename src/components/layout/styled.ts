import { ListItemButton, ListItemIcon, Theme } from "@mui/material";
import styled from "@emotion/styled";

export const StyledListItemButton = styled(ListItemButton)(
  ({ theme }: { theme: Theme }) => ({
    minHeight: 48,
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: "0 12px",
    "&:hover": { backgroundColor: theme.palette.action.hover },
  })
);

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 0;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
