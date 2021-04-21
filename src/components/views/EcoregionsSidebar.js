import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { executeSQL } from '@carto/react/api';
import {  useNavigate } from 'react-router-dom';
import { setDetailData } from 'config/appSlice';
import ClampLines from 'react-clamp-lines';
import './random.css';



import {
  clearFilters,
  updateLayer,
  selectSourceById,
  setViewState,
  addLayer, 
  removeLayer, 
  addSource, 
  removeSource
} from '@carto/react/redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider,  Box, Button } from '@material-ui/core';
import { AggregationTypes, CategoryWidget, FormulaWidget } from '@carto/react/widgets';

import { useSelector } from 'react-redux';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Badge from "@material-ui/core/Badge";
import Chip from '@material-ui/core/Chip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import  CircularProgress from '@material-ui/core/CircularProgress';

import { color_dict2 } from './constants';


// import numeral from 'numeral';

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
    width: 20,
    height: 20,

    borderRadius: '50%',
    border:'.2px solid #8080807d',
    margin:'5px 10px',
    padding:15

  },
  sideBar:{

    paddingLeft:5,
    paddingRight:5
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
  listItemsLength:{
    textAlign:'center',
    fontSize:'1.7em'

  },
  cardTitle:{
    fontSize:'1.3em'

  },
  learnMoreButton:{
    color: '#99CDEC',
    border: '2px solid #99CDEC'
  },
  citiesAndPop:{
    margin:"5px 0px"
  }
});

export default function EcoregionsSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [listItems, setlistItems] = useState([]);

  const SOURCE_ID = `ecoregionsLayerSource`;
  const LAYER_ID = `ecoregionsLayer`;

  const source = useSelector((state) => selectSourceById(state, SOURCE_ID));

   // console.log(source)
 // const state  = useSelector((state) => state);

 const getData = async ({ credentials, opts, query }) => {
 // const query = `${baseQuery}`;
 // console.log(query);
  return await executeSQL(credentials, query, opts)
};

const navigateToDetail = (item) => {

  console.log(item)


       dispatch(setDetailData(item));
       navigate(`/ecoregions/${item.cartodb_id}`);
    
  
}

  useEffect(() => {
    if (source) {
      const { credentials } = source;
      const abortController = new AbortController();
    //  const queryFromSource = source.data;

    const query = `SELECT 
    a.us_l4name,
    a.us_l4code,
    a.image,
    a.description,
    a.cartodb_id,
    b.image_1,
    b.image_author_1,
    b.image_2,
    b.image_author_2,
    b.image_3,
    b.image_author_3,
    b.image_4,
    b.image_author_4,
    b.image_5,
    b.image_author_5,
    b.image_6,
    b.image_author_6,
    b.image_7,
    b.image_author_7,
    b.image_8,
    b.image_author_8,
    b.image_9,
    b.image_author_9,
    b.image_10,
    b.image_author_10,
    b.image_11,
    b.image_author_11,
    b.image_12,
    b.image_author_12,
    b.image_13,
    b.image_author_13,
    b.image_14,
    b.image_author_14,
    b.image_15,
    b.image_author_15,
    b.image_16,
    b.image_author_16,
    b.image_17,
    b.image_author_17,
    b.image_18,
    b.image_author_18,
    b.image_19,
    b.image_author_19,
    b.image_20,
    b.image_author_20,
    c.ecoregion_pop,
    c.city_list
    
    
    FROM "kyle-se".ca_ecoregions_with_descriptions_grouped a
    join ecoregions_multi_images_2 b
    on a.us_l4name = b.region_name

    join ecoregions_with_cities_and_total_pop c
    on a.us_l4name = c.us_l4name
   
  
    order by us_l3code asc`

    getData({ credentials, opts: { abortController }, query })
        .then((res) => {
      //    console.log(res)

          let array_with_city_list = res.map(e => ({...e, city_list_array: e.city_list.split(',') }));
       //   console.log(array_with_city_list)
          setlistItems(array_with_city_list)

        })
        .catch((error) => {
          console.log(error);
        });
    }

  
  }, [dispatch, source]);

  //console.log(source)

  //console.log(state)

  const toggleSelectedItem = (item, e) => {
    //console.log(item)
    // console.log(e.target)
    // console.log(e)

     dispatch(
      updateLayer({
        id: LAYER_ID,
        layerAttributes: { selectedStore: item.us_l4name },
      })
    );


  }

  const toggleSelectedItemOff = (e) => {
    console.log('off')

  }




//   const commasFormatter = (d) => {
//     return numeral(d).format('0,0');
//   };

if (listItems.length === 0) {
  return (
    <div style={{ padding: 18 }}>
      <Grid container item justify='center' alignItems='center' style={{ flexGrow: 1 }}>
        <CircularProgress />
      </Grid>
    </div>
  );
}

  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item className={classes.sideBar}>
      <div className={classes.lengthCount}>
      <Typography gutterBottom variant="h5" component="h2" className={classes.listItemsLength}>{listItems.length} Ecoregions</Typography>
      
      </div>

      <div>

        {listItems.map((item, index) => (
    
       <Card key={index} onMouseOver={(e) => toggleSelectedItem(item, e)} className={classes.root}>
       <CardActionArea>
         <CardMedia
           component="img"
           alt={item.us_l4name}
           height="200"
           image={item.image_3}
           title={item.us_l4name}
           
         />

        <Typography className={classes.imageCaption} variant="caption" display="block" gutterBottom>
        <CameraAltIcon className={classes.cameraIcon}  /> Flickr User {item.image_author_4} 
      </Typography>
         <CardContent>


         <Box display="flex" alignItems="center" justifyContent="space-between">
 
           <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
           {item.us_l4code} - {item.us_l4name}
           </Typography>

           <div className={classes.circle} style={{backgroundColor: getRGBvalue(item.us_l4name) }} />
          
   
        </Box>
        <ClampLines text= {item.description} color="textSecondary" lines={6} ellipsis='...' innerElement="div"
        moreText="Expand Description"
        lessText="Collapse"
        
                className="MuiTypography-body2 MuiTypography-root" />

                
        <Box className={classes.citiesAndPop} >

          <Typography variant="body2">Largest cities that touch this ecoregion: {item.city_list_array.slice(0, 5).toString()} </Typography>
          <Typography variant="body2">Total population living in this ecoregion: {item.ecoregion_pop} </Typography>
        
        </Box>

        
        
         </CardContent>
         <CardActions>
           <Button onClick={() => navigateToDetail(item)} size="medium" variant="outlined" className={classes.learnMoreButton}>Learn More About Ecoregion</Button>
         </CardActions>
       </CardActionArea>

     </Card>
  
        ))}

  
      </div>
        
      </Grid>
    </Grid>
  );
}

// <Typography variant="body2" color="textSecondary" component="p">
// {item.description}
// </Typography>
