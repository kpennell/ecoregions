import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {  setModalOpen} from 'config/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 700,
    marginLeft: 'auto',
    overflow: 'initial',
    overflowY: 'unset',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {

    minWidth:260,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #99CDEC 0%, #6b8fa5 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
    fontSize:30
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  customizedButton: {
    position: 'absolute',
    left: '97%',
    top: '-5%',
    backgroundColor: 'lightgray',
    color: 'gray',
    borderRadius:"50%"
  },
  header:{
    fontSize:'2.00rem'

  },
  bodyText:{
    fontSize:'.975rem'

  }
}));

export const CoolCard = React.memo(function BlogCard() {
  const styles = useStyles();
  const modalOpen = useSelector((state) => state.app.modalOpen);
  const dispatch = useDispatch();

  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const handleModalToggle = () => {
    dispatch(setModalOpen(!modalOpen));
  };
  const shadowStyles = useOverShadowStyles();

  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
    

      <CardMedia
        className={styles.media}
        image={
          'https://www.epa.gov/sites/production/files/styles/large/public/2017-04/level_iv_ecoregions_usa_450_top_2.jpg'
        }
      />
      <CardContent>
          <Typography gutterBottom variant="h3" component="h2" className={styles.header}>
            What are Ecoregions?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"  className={styles.bodyText}>
          <a href='https://www.epa.gov/eco-research/ecoregions'>The EPA defines ecoregions</a> as areas where ecosystems (and the type, quality, and quantity of environmental resources) are generally similar. 
          <br /> <br />This ecoregion framework was originally created by <a href='https://pubmed.ncbi.nlm.nih.gov/25223620/'> James Omernik in 1987</a> and has since been built upon and mapped by EPA regional offices, other Federal agencies, state resource management agencies, and neighboring North American countries. 
          <br /><br /> Designed to serve as a spatial framework for the research, assessment, and monitoring of ecosystems and ecosystem components, ecoregions denote areas of similarity in the mosaic of biotic, abiotic, terrestrial, and aquatic ecosystem components with humans being considered as part of the biota.
          </Typography><br />
          <Typography variant="body2" color="textSecondary" component="p"  className={styles.bodyText}>This page was made by <a href='https://www.kyleapennell.com'>Kyle Pennell</a> using <a href='https://www.carto.com'>CARTO</a> as a way to help people learn about the ecoregions of California.</Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p"  className={styles.bodyText}>The images come from Flickr Creative Commons images.</Typography>
       
      </CardContent>
    </Card>
  );
});

export default CoolCard


// <TextInfoContent
// classes={contentStyles}
// overline={'About this site'}
// heading={'What is an Ecoregion?'}
// body={
//   'Ecoregions are areas where ecosystems (and the type, quality, and quantity of environmental resources) are generally similar. This ecoregion framework is derived from Omernik (1987) and from mapping done in collaboration with EPA regional offices, other Federal agencies, state resource management agencies, and neighboring North American countries. Designed to serve as a spatial framework for the research, assessment, and monitoring of ecosystems and ecosystem components, ecoregions denote areas of similarity in the mosaic of biotic, abiotic, terrestrial, and aquatic ecosystem components with humans being considered as part of the biota.'
// }
// />
// <Button className={buttonStyles} onClick={handleModalToggle}>Explore the Map</Button>
