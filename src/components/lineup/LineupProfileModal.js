import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Backdrop from '@material-ui/core/Backdrop'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import LineupProfile from './LineupProfile'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '100%',
    overflow: 'auto',
  },
  noOutline: {
    outline: 0,
    margin: '60px auto',
  },
}))

const LineupProfileModal = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton aria-label="profile" size="small" onClick={handleOpen}>
        <Avatar
          style={{ height: props.size, width: props.size }}
          alt={props.openUser.firstname}
          src={props.openUser.profileImgUrl}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
      >
        <Container className={classes.noOutline} maxWidth="xs">
          <LineupProfile {...props.openUser} forceMobile={true} />
          <IconButton
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: '2',
              background: 'rgba(0,0,0,0.2)',
            }}
          >
            <CloseIcon style={{ color: '#fff' }} />
          </IconButton>
        </Container>
      </Modal>
    </>
  )
}

export default LineupProfileModal
