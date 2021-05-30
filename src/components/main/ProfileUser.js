import React, { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  titleProfile: {
    margin: '10px 0px 10px 0px',
  },
  TableContainer: {
    width: 650,
    margin: '50px 0 50px 0',
  },
  table: {
    width: 650,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'gray',
  },
  btn: {
    backgroundColor: 'green',
  },
}));

export default function ProfileUser(props) {
  const classes = useStyles();
  const { usersList } = props;

  const [userFN, setUserFN] = useState('');
  const [userE, setUserE] = useState('');
  const [userB, setUserB] = useState('');

  const [open, setOpen] = useState(false);

  const handleChangeFullName = (event) => {
    setUserFN(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setUserE(event.target.value);
  };
  const handleChangeBio = (event) => {
    setUserB(event.target.value);
  };

  const handleCloseEditProfle = () => {
    setOpen(false);
  };

  const handleOpenEditProfile = () => {
    setOpen(true);
  };

  const handleEditProfile = () => {
    setOpen(false);
    const usersRef = FirebaseConfig.database()
      .ref('Users')
      .child(usersList.userID);

    usersRef.update({
      userBio: userB,
      userEmail: userE,
      userFullName: userFN,
    });
  };

  useEffect(() => {
    setUserFN(usersList.userFullName);
    setUserE(usersList.userEmail);
    setUserB(usersList.userBio);
    console.log('not admin');
  }, [usersList]);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.titleProfile}>
        <h1>Profile User</h1>
      </Box>
      <Avatar
        alt='Remy Sharp'
        src={usersList.userImageUrl}
        className={classes.large}
      />
      <TableContainer component={Paper} className={classes.TableContainer}>
        <Table className={classes.table} aria-label='simple table'>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                Fullname:
              </TableCell>
              <TableCell align='left'>{usersList.userFullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Email:
              </TableCell>
              <TableCell align='left'>{usersList.userEmail}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Bio:
              </TableCell>
              <TableCell align='left'>{usersList.userBio}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant='contained'
        color='secondary'
        className={classes.btn}
        onClick={() => handleOpenEditProfile()}
      >
        Edit profile
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseEditProfle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your pretty profile</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Full name'
            type='text'
            value={userFN}
            onChange={handleChangeFullName}
            fullWidth
          />
          <TextField
            margin='dense'
            id='email'
            label='Email'
            type='email'
            value={userE}
            onChange={handleChangeEmail}
            fullWidth
          />
          <TextField
            margin='dense'
            id='bio'
            label='Bio'
            type='text'
            value={userB}
            onChange={handleChangeBio}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProfle} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEditProfile} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
