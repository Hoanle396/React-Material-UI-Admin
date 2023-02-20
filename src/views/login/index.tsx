
import { ILoginResponse, IUser, loginRequest, useUser } from '@/api/auth'
import useTitle from '@/hooks/use-title'
import { setIsLogin, setUserInfor } from '@/redux/slice/auth'
import { setLocalStorage } from '@/utils/common'
import { GOOGLE_CLIENT_ID, STORAGE_KEY, __prod__ } from '@/utils/constant'
import { Box, Button, Card, styled, Typography } from '@mui/material'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    useTitle('Login')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, refetch } = useUser({
        enabled: false,
        onSuccess: (res: IUser) => {
            dispatch(setUserInfor({ ...res }))
            toast.success('You logged in successfully!')
            navigate('/admin')
        }
    })
    const { mutate, isLoading } = useMutation(loginRequest, {
        onSuccess: async (res: ILoginResponse) => {
            dispatch(setIsLogin(true))
            setLocalStorage(STORAGE_KEY.accessToken, res?.token)
            setLocalStorage(STORAGE_KEY.refreshToken, res.refreshToken)
            refetch()
        },
        onError: () => {
            toast.error('You login failed please try again!')
        }
    })

    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                // hosted_domain: __prod__ ? GOOGLE_HOSTED_DOMAIN : '',
                scope:
                    'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
            })
        })
    })

    async function onGoogleLoginSuccess(response: any) {
        const { tokenId } = response
        mutate(tokenId)
    }

    const onGoogleLoginFailure = () => {
        toast.error('You login failed please try again!')
    }

    const { signIn } = useGoogleLogin({
        onSuccess: onGoogleLoginSuccess,
        onFailure: onGoogleLoginFailure,
        clientId: GOOGLE_CLIENT_ID ?? '',
        cookiePolicy: 'single_host_origin'
    })

    return (
        <LoginBox>
            <Box position="absolute" top="40px" left="40px">
                <Link to="/">
                    <img
                        src="/vite.svg"
                        alt="Logo dark"
                        className="logo"
                        width={149}
                        height={40}
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
            </Box>
            <BoxFormLogin>
                <Card
                    variant="outlined"
                    sx={{
                        p: 2,
                        boxShadow:
                            'rgba(77, 93, 50, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                        borderRadius: 4
                    }}
                >
                    <FormLogin>
                        <div className="container-form">
                            <div className="box-title">
                                <Typography
                                    fontWeight={700}
                                    sx={{
                                        fontSize: {
                                            md: 64,
                                            sm: 40,
                                            xs: 30
                                        }
                                    }}
                                >
                                    Community
                                </Typography>
                                <Typography
                                    fontWeight={500}
                                    sx={{
                                        fontSize: {
                                            md: 24,
                                            sm: 20,
                                            xs: 18
                                        }
                                    }}
                                >
                                    Admin tools
                                </Typography>
                            </div>
                            <Typography color="#919191">
                                Admin tools software is used to manage the Community management application.
                            </Typography>
                            <Box display="flex" justifyContent="center" my={1}>
                                <img src="/vite.svg" alt="banner" width={200} height={200} />
                            </Box>
                            <Button
                                variant="outlined"
                                fullWidth
                                className="btn-login"
                                sx={{
                                    textTransform: 'none',
                                    height: 64,
                                    mt: '56px',
                                    borderRadius: '6px'
                                }}
                                onClick={signIn}
                            >
                                <img
                                    className="google-logo"
                                    src="/images/google.webp"
                                    alt="Google"
                                    width={24}
                                    height={24}
                                />
                                <Typography>Continue with Google</Typography>
                            </Button>
                        </div>
                    </FormLogin>
                </Card>
            </BoxFormLogin>
        </LoginBox>
    )
}

export default Login

const LoginBox = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '40px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
        padding: '40px 20px'
    }
}))

const BoxFormLogin = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.logo': {
        height: 40,
        width: 'auto'
    }
})

const FormLogin = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '60px 40px',

    [theme.breakpoints.down('md')]: {
        padding: '40px 20px'
    },

    '.container-form': {
        width: '100%',
        maxWidth: 500,

        '.box-title': {
            paddingLeft: 10,
            borderLeft: `8px solid ${theme.palette.primary.main}`,
            marginBottom: 32
        },

        '.google-logo': {
            width: 24,
            height: 24,
            marginRight: 10
        }
    }
}))
