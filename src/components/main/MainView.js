import React, { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import ProfileUser from './ProfileUser';
import ListUsers from './ListUsers';
import Followers from './Followers';
import Following from './Following';
import EventsManagement from './EventsManagement';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventIcon from '@material-ui/icons/Event';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  menuButton: {
    marginRight: 36,
    color: '#010811',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    fontFamily: '"Poppins", sans-serif',
    minHeight: '100vh',
    background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
  },
  mainView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // action toolbar
  action: {
    cursor: 'pointer',
    color: '#273f5f',
  },
  selectedAction: {
    cursor: 'pointer',
    color: '#010811',
  },
  logoutBtn: {
    fontSize: '0.8rem',
    fontWeight: 600,
    marginLeft: 'auto',
    padding: '5 10',
  },
  colorText: {
    color: '#426696',
    fontWeight: 600,
    fontSize: '1.8rem',
    opacity: 0.9,
  },
}));

const hideElement = {
  display: 'none',
};

const showElement = {
  display: 'flex',
};

export default function MainView({ handleLogOut }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const currentUserID = FirebaseConfig.auth().currentUser.uid;
  var isAdmin = false;
  if (currentUserID === 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
    isAdmin = !isAdmin;
  }

  // Default Account action
  const [currentAction, setCurrentAction] = useState('PROFILE');

  const [eventsList, setEventsList] = useState({});
  const [usersList, setUsersList] = useState({});
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Action callback
  const actionCallBack = (action) => {
    if (action === currentAction) {
      // toggle to disable
      // setCurrentAction(0);
      setTimeout(function () {
        console.clear();
      }, 0);
    } else {
      // setTimeout(function () {
      //   console.clear();
      // }, 0);
      setCurrentAction(action);
    }
    try {
      // Do something
    } catch (error) {
      console.log('Error... ' + error);
    }
  };

  useEffect(() => {
    const eventsRef = FirebaseConfig.database().ref('Events');
    const usersAdminRef = FirebaseConfig.database().ref('Users');
    const usersRef = FirebaseConfig.database()
      .ref('Users')
      .child(currentUserID);
    const followersRef = usersRef.child('Follow').child('Followers');
    const followingRef = usersRef.child('Follow').child('Following');

    if (currentUserID === 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
      eventsRef.on('value', (snapshot) => {
        var eventsTbl = snapshot.val();
        const temp = [];
        for (let id in eventsTbl) {
          temp.push({ id, ...eventsTbl[id] });
        }
        setEventsList(temp);
      });
      usersAdminRef.on('value', (snapshot) => {
        var usersTbl = snapshot.val();
        const tempAd = [];
        for (let id in usersTbl) {
          tempAd.push({ id, ...usersTbl[id] });
        }
        setUsersList(tempAd);
      });
    } else {
      eventsRef.on('value', (snapshot) => {
        const eventsTbl = snapshot.val();
        const eventsListTbl = [];
        const temp = [];
        for (let hostEvent in eventsTbl) {
          temp.push(hostEvent);
        }
        const tempEvents = temp;
        for (let i = 0; i < tempEvents.length; i++) {
          eventsRef.child(tempEvents[i]).on('value', (snapshotEV) => {
            const item = snapshotEV.val();
            let ID = tempEvents[i];
            if (item.uid === currentUserID) {
              eventsListTbl.push({ ID, ...item });
            }
          });
        }
        setEventsList(eventsListTbl);
      });
      usersRef.on('value', (snapshot) => {
        setUsersList(snapshot.val());
      });
      followersRef.on('value', (snapshot) => {
        const follower = [];
        for (let ID in snapshot.val()) {
          follower.push({ ID });
        }
        const tempFollowers = [];
        for (let i in follower) {
          tempFollowers.push(follower[i].ID);
        }
        const tempFollowersDetail = [];
        for (let i in tempFollowers) {
          const folowerDetailRef = FirebaseConfig.database()
            .ref('Users')
            .child(tempFollowers[i]);
          folowerDetailRef.on('value', (snapshot) => {
            tempFollowersDetail.push(snapshot.val());
          });
        }
        setFollowersList(tempFollowersDetail);
      });
      followingRef.on('value', (snapshot) => {
        const following = [];
        for (let ID in snapshot.val()) {
          following.push({ ID });
        }
        const tempFollowing = [];
        for (let i in following) {
          tempFollowing.push(following[i].ID);
        }
        const tempFollowingDetail = [];
        for (let i in tempFollowing) {
          const followingDetailRef = FirebaseConfig.database()
            .ref('Users')
            .child(tempFollowing[i]);
          followingDetailRef.on('value', (snapshot) => {
            tempFollowingDetail.push(snapshot.val());
          });
        }
        setFollowingList(tempFollowingDetail);
      });
    }
    setTimeout(function () {
      console.clear();
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap className={classes.colorText}>
            Event Management
          </Typography>
          <Button
            className={classes.logoutBtn}
            variant='contained'
            color='primary'
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* PROFILE */}
          <ListItem
            button
            className={
              currentAction === 'PROFILE'
                ? classes.selectedAction
                : classes.action
            }
            onClick={() => actionCallBack('PROFILE')}
          >
            <ListItemIcon
              className={
                currentAction === 'PROFILE'
                  ? classes.selectedAction
                  : classes.action
              }
            >
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>

          {/* Events */}
          <ListItem
            button
            onClick={() => actionCallBack('EVENTS')}
            className={
              currentAction === 'EVENTS'
                ? classes.selectedAction
                : classes.action
            }
          >
            <ListItemIcon
              className={
                currentAction === 'EVENTS'
                  ? classes.selectedAction
                  : classes.action
              }
            >
              <EventIcon />
            </ListItemIcon>
            <ListItemText>Events</ListItemText>
          </ListItem>
          {/* Followers */}
          <ListItem
            button
            onClick={() => actionCallBack('FOLLOWERS')}
            className={
              currentAction === 'FOLLOWERS'
                ? classes.selectedAction
                : classes.action
            }
            style={isAdmin === true ? hideElement : showElement}
          >
            <ListItemIcon
              className={
                currentAction === 'FOLLOWERS'
                  ? classes.selectedAction
                  : classes.action
              }
            >
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText>Followers</ListItemText>
          </ListItem>
          {/* Following */}
          <ListItem
            button
            onClick={() => actionCallBack('FOLLOWING')}
            className={
              currentAction === 'FOLLOWING'
                ? classes.selectedAction
                : classes.action
            }
            style={isAdmin === true ? hideElement : showElement}
          >
            <ListItemIcon
              className={
                currentAction === 'FOLLOWING'
                  ? classes.selectedAction
                  : classes.action
              }
            >
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText>Following</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.mainView}>
          {/* PROFILE USER */}
          {currentAction === 'PROFILE' && isAdmin === true && (
            <ListUsers usersList={usersList} />
          )}
          {/* PROFILE USER */}
          {currentAction === 'PROFILE' && isAdmin === false && (
            <ProfileUser usersList={usersList} />
          )}
          {/* EVENTS MANAGEMENT */}
          {currentAction === 'EVENTS' && (
            <EventsManagement eventsList={eventsList} />
          )}
          {/* FOLLOWERS */}
          {currentAction === 'FOLLOWERS' && isAdmin === false && (
            <Followers followersList={followersList} />
          )}
          {/* FOLLOWING */}
          {currentAction === 'FOLLOWING' && isAdmin === false && (
            <Following followingList={followingList} />
          )}
        </div>
      </main>
    </div>
  );
}
