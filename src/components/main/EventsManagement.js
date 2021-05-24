import React, { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
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

  const handleClickRemove = (ID) => {
    console.log(eventsList);
  };

  const handleClickEdit = (ID) => {
    console.log(eventsList);
  };

  return (
    <Paper className={classes.paper}>
      <Box className={classes.titleProfile}>
        <h1>Events Management</h1>
      </Box>
      {eventsList &&
        eventsList.map((eventItem, index) => (
          <Paper key={index} className={classes.paperTbl}>
            <Box className={classes.sliderImage}>
              <Carousel className={classes.carousel}>
                {eventItem.ImgUri_list &&
                  eventItem.ImgUri_list.map((image, indexItem) => (
                    // <Avatar
                    //   key={indexItem}
                    //   src={image}
                    //   className={classes.large}
                    // />
                    <img src={image} key={indexItem} />
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
                    {/* <TableCell></TableCell>
                    <TableCell align='right'>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleClickRemove(index)}
                      >
                        Remove
                      </Button>
                    </TableCell> */}
                    {/* <TableCell align='center'>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleClickEdit(index)}
                      >
                        Edit
                      </Button>
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
    </Paper>
  );
}
