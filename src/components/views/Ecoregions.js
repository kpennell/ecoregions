import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

export default function Ecoregions() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const SOURCE_ID = `ecoregionsLayerSource`;
  const LAYER_ID = `ecoregionsLayer`;

  useEffect(() => {

    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `select *, st_y(st_centroid(the_geom)) as latitude, st_x(st_centroid(the_geom)) as longitude from ca_ecoregions_with_descriptions_grouped order by us_l3code asc`,
        type: 'sql',
      })
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: SOURCE_ID,
      })
    );
    
    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch, SOURCE_ID, LAYER_ID]);

  return <Outlet />;
};
