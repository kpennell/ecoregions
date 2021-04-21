import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  setModalOpen} from 'config/appSlice';
import CoolCard from './CoolCard';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paperWidthLg:{
    background: '#fff0',
    width: 784,
    boxShadow: 'none'
   

  },
  paperWidthSm:{
    maxWidth:900,
    width:900
    
  },
  customizedButton: {
    position: 'absolute',
    left: '97%',
    top: '-5%',
    backgroundColor: 'lightgray',
    color: 'gray',
    borderRadius:"50%"
  },
  paper:{
    margin:0,
    boxShadow:'none'
  }
  
}));

export default function SuperCoolDialog() {
//  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles();

  const modalOpen = useSelector((state) => state.app.modalOpen);
  const dispatch = useDispatch();

  const handleClickOpen = () => {

    dispatch(setModalOpen(!modalOpen));
  };


  const handleClose = () => {
   

    dispatch(setModalOpen(!modalOpen));
  };

  return (
    <div>

      <Dialog
        maxWidth='lg'
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          scrollPaper: classes.scrollPaper,
          paper: classes.paper,
          root:classes.root,
          paperWidthLg:classes.paperWidthLg
        }}
      >

        <CoolCard />
      </Dialog>
    </div>
  );
}