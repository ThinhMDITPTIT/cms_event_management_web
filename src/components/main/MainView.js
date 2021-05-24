import React, { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import ProfileUser from './ProfileUser';
import ListUsers from './ListUsers';
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
    backgroundColor: 'gray',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'gray',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: 'gray',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'gray',
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
    backgroundColor: 'gray',
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
  },

  // action toolbar
  action: {
    cursor: 'pointer',
    color: '#dadbdf',
  },
  selectedAction: {
    cursor: 'pointer',
    color: '#00b9ff',
  },
  logoutBtn: {
    marginLeft: 'auto',
    padding: 10,
    backgroundColor: 'green',
  },
}));

export default function MainView({ handleLogOut }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const currentUserID = FirebaseConfig.auth().currentUser.uid;
  var isAdmin = false;
  if (currentUserID == 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
    isAdmin = true;
  }

  // Default Account action
  const [currentAction, setCurrentAction] = useState('PROFILE');

  const [eventsList, setEventsList] = useState({});
  const [usersList, setUsersList] = useState({});

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
    } else {
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

    if (currentUserID == 'HGRsUSOUv8ZiYX0Fxd2UC1Dw88s1') {
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
            if (item.uid == currentUserID) {
              eventsListTbl.push(item);
            }
          });
        }
        setEventsList(eventsListTbl);
      });
      usersRef.on('value', (snapshot) => {
        var usersTbl = snapshot.val();
        setUsersList(usersTbl);
      });
    }
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
          <Typography variant='h6' noWrap>
            Welcome to EvM CMS
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
            <ListItemText>Profile User</ListItemText>
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
            <ListItemText>Events Manage</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* PROFILE USER */}
        {currentAction === 'PROFILE' && isAdmin == true && (
          <ListUsers usersList={usersList} />
        )}
        {/* PROFILE USER */}
        {currentAction === 'PROFILE' && isAdmin == false && (
          <ProfileUser usersList={usersList} />
        )}
        {/* EVENTS MANAGEMENT */}
        {currentAction === 'EVENTS' && (
          <EventsManagement eventsList={eventsList} />
        )}
      </main>
    </div>
  );
}
