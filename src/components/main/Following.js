import React from 'react';
import { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'gray',
  },
  paperItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: '10px 0 10px 0',
  },
}));

export default function Following(props) {
  const classes = useStyles();

  const [followingList, setFollowingList] = useState([]);
  const [followingID, setFollowingID] = useState([]);
  const [followingDetail, setFollowingDetail] = useState([]);

  useEffect(() => {
    setFollowingList(props.followingList);
  }, [props]);

  useEffect(() => {
    if (followingList[0] !== undefined) {
      const temp = [];
      for (let following in followingList) {
        temp.push(followingList[following].ID);
      }
      console.log(temp);
      setFollowingID(temp);
    }
  }, [followingList]);

  useEffect(() => {
    if (followingID[0] !== undefined) {
      const tempDetail = [];
      for (let i in followingID) {
        const folowerDetailRef = FirebaseConfig.database()
          .ref('Users')
          .child(followingID[i]);
        folowerDetailRef.on('value', (snapshot) => {
          tempDetail.push(snapshot.val());
        });
      }
      console.log(tempDetail);
      setFollowingDetail(tempDetail);
    }
  }, [followingID]);

  return (
    <Paper className={classes.paper}>
      {followingDetail !== [] &&
        followingDetail.map((following, index) => (
          <Paper key={index}>
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
