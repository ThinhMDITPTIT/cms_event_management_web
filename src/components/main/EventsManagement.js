import React from 'react';
import { useState } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
  },
  table: {
    width: 650,
  },
  paperTbl: {
    margin: '25px 0 25px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'gray',
  },
  sliderImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0px 15px 0px',
  },
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500,
  },
}));

export default function EventsManagement(props) {
  const classes = useStyles();
  const { eventsList } = props;
  const currentUserID = FirebaseConfig.auth().currentUser.uid;
  var isAdmin = false;
  if (currentUserID === 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
    isAdmin = !isAdmin;
  }
  const eventsRef = FirebaseConfig.database().ref('Events');
  const usersRef = FirebaseConfig.database().ref('Users').child(currentUserID);

  const [eventEditing, setEventEditing] = useState({});
  const [eventRemoving, setEventRemoving] = useState({});

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [eventLimit, setEventLimit] = useState('');

  const handleChangeEventName = (event) => {
    setEventName(event.target.value);
  };
  const handleChangeEventDescription = (event) => {
    setEventDescription(event.target.value);
  };
  const handleChangeEventPlace = (event) => {
    setEventPlace(event.target.value);
  };
  const handleChangeEventLimit = (event) => {
    setEventLimit(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleCloseEditEvent = (event) => {
    setOpen(false);
  };
  const handleOpenEditEvent = (event) => {
    setOpen(true);
    setEventName(event.event_name);
    setEventDescription(event.description);
    setEventPlace(event.place);
    setEventLimit(event.Limit);
  };
  const handleUpdateEvent = () => {
    try {
      const eventsRef = FirebaseConfig.database()
        .ref('Events')
        .child(eventEditing.ID);
      eventsRef.update({
        event_name: eventName,
        description: eventDescription,
        place: eventPlace,
        Limit: eventLimit,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [confirmRemove, setConfirmRemove] = useState('');
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const handleCloseConfirmRemoveEvent = (event) => {
    setOpenConfirmRemove(false);
  };
  const handleOpenConfirmRemoveEvent = (eventID) => {
    setOpenConfirmRemove(true);
    eventsRef.child(eventID).on('value', (snapshot) => {
      setEventRemoving({ eventID, ...snapshot.val() });
    });
  };
  const handleChangeConfirm = (event) => {
    setConfirmRemove(event.target.value);
  };

  const handleRemoveEvent = () => {
    eventsRef.child(eventRemoving.eventID).on('value', (snapshot) => {
      console.log('remove this: ' + eventRemoving.eventID);
    });
    usersRef.child('userEvents').on('value', (snapshot) => {
      const tempEV = [];
      for (let i in snapshot.val()) {
        tempEV.push(snapshot.val()[i]);
      }
      for (let i in tempEV) {
        if (tempEV[i] === eventRemoving.eventID) {
          console.log('remove this: ' + tempEV[i]);
        }
      }
    });
    setOpenConfirmRemove(false);
  };

  const handleClickEdit = (ID) => {
    eventsRef.child(ID).on('value', (snapshot) => {
      handleOpenEditEvent({ ID, ...snapshot.val() });
      setEventEditing({ ID, ...snapshot.val() });
    });
  };

  return (
    <Paper className={classes.paper}>
      <Box className={classes.titleProfile}>
        <h1>Events Management</h1>
      </Box>
      {eventsList &&
        isAdmin === false &&
        eventsList.map((eventItem, index) => (
          <Paper key={index} className={classes.paperTbl}>
            <Box className={classes.sliderImage}>
              <Carousel className={classes.carousel}>
                {eventItem.ImgUri_list &&
                  eventItem.ImgUri_list.map((image, indexItem) => (
                    <img src={image} key={indexItem} alt='event_images' />
                  ))}
              </Carousel>
            </Box>
            <TableContainer
              component={Paper}
              className={classes.TableContainer}
            >
              <Table className={classes.table} aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Host:
                    </TableCell>
                    <TableCell align='left'>{eventItem.uid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Event Name:
                    </TableCell>
                    <TableCell align='left'>{eventItem.event_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Description:
                    </TableCell>
                    <TableCell align='left'>{eventItem.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Place:
                    </TableCell>
                    <TableCell align='left'>{eventItem.place}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Limit:
                    </TableCell>
                    <TableCell align='left'>{eventItem.Limit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Start Date:
                    </TableCell>
                    <TableCell align='left'>{eventItem.start_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      End date:
                    </TableCell>
                    <TableCell align='left'>{eventItem.end_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align='right'>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() =>
                          handleOpenConfirmRemoveEvent(eventItem.ID)
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleClickEdit(eventItem.ID)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
      {eventsList &&
        isAdmin === true &&
        eventsList.map((eventItem, index) => (
          <Paper key={index} className={classes.paperTbl}>
            <Box className={classes.sliderImage}>
              <Carousel className={classes.carousel}>
                {eventItem.ImgUri_list &&
                  eventItem.ImgUri_list.map((image, indexItem) => (
                    <img src={image} key={indexItem} alt='event_images' />
                  ))}
              </Carousel>
            </Box>
            <TableContainer
              component={Paper}
              className={classes.TableContainer}
            >
              <Table className={classes.table} aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Host:
                    </TableCell>
                    <TableCell align='left'>{eventItem.uid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Event Name:
                    </TableCell>
                    <TableCell align='left'>{eventItem.event_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Description:
                    </TableCell>
                    <TableCell align='left'>{eventItem.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Place:
                    </TableCell>
                    <TableCell align='left'>{eventItem.place}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Limit:
                    </TableCell>
                    <TableCell align='left'>{eventItem.Limit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Start Date:
                    </TableCell>
                    <TableCell align='left'>{eventItem.start_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      End date:
                    </TableCell>
                    <TableCell align='left'>{eventItem.end_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}

      <Dialog
        open={open}
        onClose={handleCloseEditEvent}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit your event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='event_name'
            label='Event name'
            type='text'
            value={eventName}
            onChange={handleChangeEventName}
            fullWidth
          />
          <TextField
            margin='dense'
            id='description'
            label='Description'
            type='text'
            value={eventDescription}
            onChange={handleChangeEventDescription}
            fullWidth
          />
          <TextField
            margin='dense'
            id='place'
            label='Place'
            type='text'
            value={eventPlace}
            onChange={handleChangeEventPlace}
            fullWidth
          />
          <TextField
            margin='dense'
            id='limit'
            label='Limit'
            type='number'
            value={eventLimit}
            onChange={handleChangeEventLimit}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditEvent} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleUpdateEvent} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmRemove}
        onClose={handleCloseConfirmRemoveEvent}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Are you sure to remove your event
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='confirm_remove'
            label='Enter "CONFIRM_REMOVE"'
            type='text'
            value={confirmRemove}
            onChange={handleChangeConfirm}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmRemoveEvent} color='primary'>
            Cancel
          </Button>
          <Button
            disabled={confirmRemove === 'CONFIRM_REMOVE' ? false : true}
            onClick={handleRemoveEvent}
            color='primary'
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
