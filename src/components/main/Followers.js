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

export default function Followers(props) {
  const classes = useStyles();

  const [followersList, setFollowersList] = useState([]);
  const [followersID, setFollowersID] = useState([]);
  const [followersDetail, setFollowersDetail] = useState([]);

  useEffect(() => {
    setFollowersList(props.followersList);
  }, [props]);

  useEffect(() => {
    if (followersList[0] !== undefined) {
      const temp = [];
      for (let follower in followersList) {
        temp.push(followersList[follower].ID);
      }
      console.log(temp);
      setFollowersID(temp);
    }
  }, [followersList]);

  useEffect(() => {
    if (followersID[0] !== undefined) {
      const tempDetail = [];
      for (let i in followersID) {
        const folowerDetailRef = FirebaseConfig.database()
          .ref('Users')
          .child(followersID[i]);
        folowerDetailRef.on('value', (snapshot) => {
          tempDetail.push(snapshot.val());
        });
      }
      console.log(tempDetail);
      setFollowersDetail(tempDetail);
    }
  }, [followersID]);

  return (
    <Paper className={classes.paper}>
      {followersDetail !== [] &&
        followersDetail.map((follower, index) => (
          <Paper key={index}>
            <Avatar
              alt='Remy Sharp'
              src={follower.userImageUrl}
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
                    <TableCell align='left'>{follower.userFullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Email:
                    </TableCell>
                    <TableCell align='left'>{follower.userEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Bio:
                    </TableCell>
                    <TableCell align='left'>{follower.userBio}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
    </Paper>
  );
}
