import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
    // margin: '10px 0px 10px 0px',
  },
  warningTitle: {
    color: '#f44336',
  },
  TableContainer: {
    width: '100%',
    minWidth: 600,
  },
  table: {
    width: '100%',
  },
  tblCellButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  paperTbl: {
    margin: '25px 0 25px 0',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '60%',
    alignItems: 'center',
    background:
      'linear-gradient(to right bottom,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    borderRadius: '2rem',
    zIndex: 2,
    boxShadow: '6px 6px 20px rgba(122, 122, 122, 0.6)',
    backdropFilter: 'blur(2rem)',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    minWidth: '100%',
    minHeight: '80vh',
    background:
      'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
    borderRadius: '2rem',
    boxShadow: '6px 6px 20px rgba(122, 122, 122, 0.212)',
    zIndex: 2,
    backdropFilter: 'blur(2rem)',
  },
  hideEvent: {
    display: 'none',
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

export default function JoinedEvents(props) {
  const classes = useStyles();
  const { joinedEventsList } = props;
  const currentUserID = FirebaseConfig.auth().currentUser.uid;
  var isAdmin = false;
  if (currentUserID === 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
    isAdmin = !isAdmin;
  }
  // Check if have any joined event?
  const [checkJoinedList, setCheckJoinedList] = useState(true);

  useEffect(() => {
    if (joinedEventsList.length === 0) {
      setCheckJoinedList(false);
    }
  }, [joinedEventsList]);

  return (
    <Paper className={classes.paper}>
      {checkJoinedList === true && isAdmin === false && (
        <Box className={classes.titleProfile}>
          <h1 style={{ color: '#3f51b5' }}>Joined Events</h1>
        </Box>
      )}
      {checkJoinedList === false && isAdmin === false && (
        <Box className={classes.titleProfile}>
          <h1 style={{ color: '#3f51b5' }}>Joined Events</h1>
          <p className={classes.warningTitle}>
            You don't have any joined events yet.
          </p>
        </Box>
      )}
      {joinedEventsList &&
        isAdmin === false &&
        checkJoinedList === true &&
        joinedEventsList.map((eventItem, index) => (
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
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
    </Paper>
  );
}
