import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  Divider,
  Hidden,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Link,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HelpOutline from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import UserMenu from 'components/views/login/UserMenu';
import { NavLink, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import { useDispatch, useSelector } from 'react-redux';
import {  setModalOpen} from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  navBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.modal + 1,
    overflow: 'hidden',
    
  },
  toolBar:{
    backgroundColor:"#89cff0"
  

  },
  navTabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.common.white,
    },
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  menuButton: {
    margin: theme.spacing(0, 0.75, 0, -1.25),

    '& + hr': {
      marginRight: theme.spacing(1.5),
    },
  },
  drawer: {
    minWidth: 260,
  },
  title: {
    '& h1': {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.common.white,

      '& img': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(1.5),
        verticalAlign: 'bottom',
      },
    },
  },
}));

const NavigationMenu = (props) => {
  const { location, column: vertical } = props;
  const classes = useStyles();

  

  return (
    <React.Fragment>
      <Grid
        container
        direction={vertical ? 'column' : 'row'}
        className={!vertical ? classes.navTabs : ''}
      >
        <Tabs
          value={location.pathname.split('/')[1] || ''}
          textColor={vertical ? 'primary' : 'inherit'}
          orientation={vertical ? 'vertical' : 'horizontal'}
          variant={vertical ? 'fullWidth' : 'standard'}
        >
     
           
          {/* Auto import links */}
        </Tabs>
      </Grid>
    </React.Fragment>
  );
};

export function Header() {
  const classes = useStyles();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const modalOpen = useSelector((state) => state.app.modalOpen);
  const dispatch = useDispatch();
  

  const handleClickOpen = () => {

    dispatch(setModalOpen(!modalOpen));
  };


  const handleClose = () => {
  
    dispatch(setModalOpen(!modalOpen));
  };


  const handleModalToggle = () => {
    dispatch(setModalOpen(!modalOpen));
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar variant='regular' className={classes.toolBar}>

        <Hidden smUp>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Divider orientation='vertical' light />
        </Hidden>
        <Link component={NavLink} to='/' className={classes.title}>
       
          <Typography component='h1' variant='subtitle1' noWrap>
          <Box display="flex" alignItems="center">
            <Hidden xsDown>
              <img src='/bearlogo.png' alt='CARTO ' />
            </Hidden>
            <Hidden smUp>
              <img src='/bearlogo.png' alt='CARTO ' />
            </Hidden> 
            <strong style={{fontFamily:'Lobster, cursive', fontSize:'2em'}}>California Ecoregions</strong> 
            </Box>
          </Typography>
  
        </Link>
        <Hidden xsDown>
          <Divider orientation='vertical' className={classes.divider} light />
          <NavigationMenu location={location} />
        </Hidden>
        <Hidden smUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={{
              className: classes.drawer,
            }}
          >
            <Toolbar variant='regular' />
            <Grid container direction='column' justify='space-between' item xs>
              <NavigationMenu location={location} column={true} />
            </Grid>
          </Drawer>
        </Hidden>

        <Button size="large" color="inherit" startIcon={<HelpOutline />} onClick={handleModalToggle}>About</Button>

        <Grid container item xs justify='flex-end'>
    
        </Grid>

      </Toolbar>
    </AppBar>
  );
}
