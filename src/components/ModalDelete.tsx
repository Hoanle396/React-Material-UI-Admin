import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { forwardRef, Ref, useImperativeHandle, useState } from 'react'

export interface RefModal {
    onOpen: (item?: any) => void
}

const ModalDeleteAdmin = (props: any, ref: Ref<RefModal>) => {
    const { onRefetch, onDelete } = props

    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState<any | null>(null)
    const [loading, setLoading] = useState(false)

    useImperativeHandle(ref, () => ({ onOpen }))

    const onOpen = (item: any) => {
        setInfo(item)
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const onDeleted = () => {
        setLoading(true)
        onDelete(Number(info?.id))
        onRefetch()
        setOpen(false)
        setLoading(false)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle id="alert-dialog-title" textAlign="center">
                do you want to delete this
            </DialogTitle>
            <DialogContent>
                <DialogContentText textAlign="center">
                    you cann't undo after deleted
                </DialogContentText>
                <DialogContentText textAlign="center">are you sure</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={onClose} variant="outlined" color="primary">
                    cancel
                </Button>
                <LoadingButton
                    autoFocus
                    variant="contained"
                    color="error"
                    loading={loading}
                    onClick={onDeleted}
                >
                    delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default forwardRef(ModalDeleteAdmin)
