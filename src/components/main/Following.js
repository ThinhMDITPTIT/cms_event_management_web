import React from 'react';
import { useState, useEffect } from 'react';
// import FirebaseConfig from '../../firebaseConfig';

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
    margin: '0px 0px 20px 0px',
  },
  TableContainer: {
    width: 650,
    margin: '50px 0 10px 0',
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
    minHeight: '80vh',
    minWidth: '100%',
    background:
      'linear-gradient(to right bottom,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    borderRadius: '2rem',
    zIndex: 2,
    boxShadow: '6px 6px 20px rgba(122, 122, 122, 0.212)',
    backdropFilter: 'blur(2rem)',
  },
  paperTbl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    // minHeight: '80vh',
    minWidth: '60%',
    background:
      'linear-gradient(to right bottom,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    borderRadius: '2rem',
    zIndex: 2,
    boxShadow: '6px 6px 20px rgba(122, 122, 122, 0.6)',
    backdropFilter: 'blur(2rem)',
  },
  hideEvent: {
    display: 'none',
  },
  warningTitle: {
    color: '#f44336',
  },
}));

export default function Following(props) {
  const classes = useStyles();

  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setFollowingList(props.followingList);
  }, [props]);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.titleProfile}>
        <h1 style={{ color: '#3f51b5' }}>Following</h1>
        <p
          className={
            followingList.length !== 0
              ? classes.hideEvent
              : classes.warningTitle
          }
        >
          You haven't followed anyone yet.
        </p>
      </Box>
      {followingList !== [] &&
        followingList.map((following, index) => (
          <Paper key={index} className={classes.paperTbl}>
            <Avatar
              alt='Remy Sharp'
              src={following.userImageUrl}
              className={classes.large}
            />
            <TableContainer
              component={Paper}
              className={classes.TableContainer}
            >
              <Table className={classes.table} aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Fullname:
                    </TableCell>
                    <TableCell align='left'>{following.userFullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Email:
                    </TableCell>
                    <TableCell align='left'>{following.userEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Bio:
                    </TableCell>
                    <TableCell align='left'>{following.userBio}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
    </Paper>
  );
}
