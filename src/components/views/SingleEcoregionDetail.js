import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { executeSQL } from '@carto/react/api';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById, setViewState } from '@carto/react/redux';
// import numeral from 'numeral';

import {
  Breadcrumbs,
  CircularProgress,
  Divider,
  IconButton,
  Button,
  Grid,
  Link,
  Card,
  CardActionArea,
  CardActions,

  CardContent,
  CardMedia,
  Typography,
  Box
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { baseQuery, color_dict2 } from './constants';
import { setDetailData } from 'config/appSlice';
import { DataUsageRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';




function getRGBvalue(name){
  if(color_dict2[name] !== undefined){
  // console.log('rgb(' + color_dict2[name].toString() + ')')
 
   return('rgb(' + color_dict2[name].toString() + ')')
  }
 }


const useStyles = makeStyles({
  root: {
    maxWidth: 485,
  },
  lengthCount:{

  },
  circle:{
    width: 30,
    height: 30,

    borderRadius: '50%',
    border:'.2px solid #8080807d',
    margin:'5px 10px',
    padding:20

  },
  sideBar:{

    paddingLeft:5,
    paddingRight:5
  },
  imageCards:{
    margin:2
  },
  imageCaption:{
 
    marginTop: '-20px',
    color: '#ffffffbf',
    marginLeft: '10px',
    fontSize:10,
    

  
},
cameraIcon:{
  width: '.5em',
  height: '.5em',

},
citiesAndPop:{
  margin:"5px 0px"
}
});

export default function SingleEcoregionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const [countyDetails, setCountyDetails] = useState(null);
  const data = useSelector((state) => state.app.detailData);

  const source = useSelector((state) =>
    selectSourceById(state, 'ecoregionsLayerSource')
  );

  const navigateToStores = () => {
   
       const viewState = { transitionDuration: 500, zoom: 5.7, latitude: 36.5616505, longitude: -121.5829968, };

      dispatch(setViewState(viewState));




    navigate('/ecoregions');
  };

  const getDetail = async ({ id, credentials, opts }) => {
    const query = `${baseQuery} where a.cartodb_id = ${id}`;
    console.log(query)

    return await executeSQL(credentials, query, opts).then((res) => res[0]);
  };

  // initial mount
  useEffect(() => {

    if (source) {
   
      const { credentials } = source;
      const abortController = new AbortController();

      getDetail({ id, credentials, opts: { abortController } })
        .then((res) => {
          
            // const latitude = 20;
            // const longitude = 20;

            const { latitude, longitude } = res;
            const viewState = { latitude, longitude, transitionDuration: 500, zoom: 9 };

         

            dispatch(setViewState(viewState));
            dispatch(setDetailData(res));
        //   console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (source) {
      const { credentials } = source;
      const abortController = new AbortController();

      getDetail({ id, credentials, opts: { abortController } })
        .then((res) => {
            console.log(res)

            // const latitude = 20;
            // const longitude = 20;

          const { latitude, longitude } = res;
          const viewState = { latitude, longitude, transitionDuration: 500, zoom: 9 };

          dispatch(setViewState(viewState));
   
          dispatch(setDetailData(res));

       //   console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, id, source]);

  // useEffect(() => {
  //     console.log(data)
  //  // if (!data) return;
  //   const { latitude, longitude } = data;
  //   const viewState = { latitude, longitude, transitionDuration: 500, zoom: 9 };    
  //   dispatch(setViewState(viewState));
  // }, [data, dispatch]);

  console.log(data)

  if (!data) {
    return (
      <div style={{ padding: 18 }}>
        <Grid container item justify='center' alignItems='center' style={{ flexGrow: 1 }}>
          <CircularProgress />
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ padding: 15 }}>
      <div className={classes.storeDetail}>
            <Breadcrumbs
              separator={<NavigateNextIcon />}
              aria-label='breadcrumb'
              gutterBottom
            >
              <Link color='inherit' component='button' onClick={navigateToStores}>
                All Ecoregions
              </Link>
              <Typography color='textPrimary'> {data.us_l4name} </Typography>
            </Breadcrumbs>
       
          
          </div>


       <Card className={classes.root}>
       <CardActionArea>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_3}
           title={data.us_l4name}
         />
               <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_19} 
      </Typography>
         <CardContent>


         <Box display="flex" alignItems="flex-start" justifyContent="space-between">
 
           <Typography gutterBottom variant="h5" component="h2">
           {data.us_l4code} - {data.us_l4name}
           </Typography>

           <div className={classes.circle} style={{backgroundColor: getRGBvalue(data.us_l4name) }} />
          
   
        </Box>
           <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
           </Typography>


          <Box className={classes.citiesAndPop} >

          <Typography variant="body2" color="textSecondary">Cities that touch this ecoregion: {data.city_list} </Typography>
          <Typography variant="body2" color="textSecondary">Total population living in this ecoregion: {data.ecoregion_pop} </Typography>

          </Box> 


        
         </CardContent>

       </CardActionArea>

     </Card>

     <Card>
     <CardActionArea>
       <br />

     <Typography color="textSecondary" display="block" gutterBottom> Geotagged Flickr Creative Commons from this Ecoregion </Typography>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_2}
           title={data.us_l4name}
         />
          <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_2} 
      </Typography>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_3}
           title={data.us_l4name}
         />
          <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_3} 
      </Typography>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_4}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_4} 
      </Typography>
         
           <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_5}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_5} 
      </Typography>
          <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_6}
           title={data.us_l4name}
         />

<Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_6} 
      </Typography>
          <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_7}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_7} 
      </Typography>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_8}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_8} 
      </Typography>
          <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_9}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_9} 
      </Typography>
           <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_10}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_10} 
      </Typography>
            <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_11}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_11} 
      </Typography>
              <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_12}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_12} 
      </Typography>
           <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_13}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_13} 
      </Typography>
         <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_14}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_14} 
      </Typography>
           <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_15}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_15} 
      </Typography>
           <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_16}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_16} 
      </Typography>
            <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_17}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_17} 
      </Typography>
            <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_18}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_18} 
      </Typography>
             <CardMedia
           component="img" className={classes.imageCards}
           alt={data.us_l4name}
           height="200"
           image={data.image_19}
           title={data.us_l4name}
         />
                <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {data.image_author_19} 
      </Typography>
         <CardContent>




        
         </CardContent>

       </CardActionArea>

     </Card>


         
   
    </div>
  );
}

