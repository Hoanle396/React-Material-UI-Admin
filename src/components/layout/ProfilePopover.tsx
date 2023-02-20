import { useUser } from '@/api/auth'
import { setIsLogin } from '@/redux/slice/auth'
import theme from '@/styles/theme'
import { removeLocalStorage } from '@/utils/common'
import { STORAGE_KEY } from '@/utils/constant'
import { ExpandLess, ExpandMore, Login } from '@mui/icons-material'
import { Avatar, Box, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePopover = () => {
    const anchorRef = useRef(null)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const dispath = useDispatch()
    const { refetch } = useUser()
    const handleOpen = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        dispath(setIsLogin(false))
        removeLocalStorage(STORAGE_KEY.accessToken)
        removeLocalStorage(STORAGE_KEY.refreshToken)
        refetch()
        navigate('/login')
    }

    return (
        <Box sx={{ position: 'relative', width: '250px' }}>
            <Button sx={{ textTransform: 'none' }}>
                <Stack direction="row" alignItems="center" onClick={handleOpen} ref={anchorRef}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {'H'}
                    </Avatar>
                    <Box sx={{ mx: '20px' }}>
                        <Typography fontSize={14} fontWeight={600}>
                            {'Super Admin'}
                        </Typography>
                        <Typography fontSize={12} fontWeight={400}>
                            {'hoanle396@gmail.com'}
                        </Typography>
                    </Box>
                    {open ? <ExpandMore /> : <ExpandLess />}
                </Stack>
            </Button>
            {open && (
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-end"
                    transition
                    disablePortal
                    sx={{ zIndex: 1 }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                width: '250px',
                                marginTop: 10
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleOpen}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        sx={{ p: '10px' }}
                                    >
                                        <MenuItem onClick={handleLogout} sx={{ px: 0 }}>
                                            <Box
                                                p="5px 10px"
                                                // width="32px"
                                                height="32px"
                                                mr="12px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Login width="30px" height="30px" />
                                            </Box>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            )}
        </Box>

    )
}

export default ProfilePopover