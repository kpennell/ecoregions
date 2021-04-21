import { useSelector, useDispatch } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';
import { useNavigate } from 'react-router-dom';
import { setDetailData } from 'config/appSlice';
import { useEffect } from 'react';

import { selectSourceById, setViewState } from '@carto/react/redux';

import { color_dict2 } from '../views/constants';

function getRGBvalue(name, selectedStore) {
  //console.log(JSON.parse(color_dict[name]))

  if (name === selectedStore) {
    return [255, 255, 255];
  } else {
    return color_dict2[name];
  }
}

function getLineWidthFunc(name, selectedStore) {
  if (name === selectedStore) {
    return 1000;
  } else {
    return 0.5;
  }
}

function getLineColorFunc(name, selectedStore) {
  if (name === selectedStore) {
    return [255, 255, 255];
  } else {
    return [80, 80, 80];
  }
}

export default function EcoregionsLayer() {
  const { ecoregionsLayer } = useSelector((state) => state.carto.layers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, ecoregionsLayer?.source));

  if (ecoregionsLayer && source) {
    // const viewState = { transitionDuration: 500, zoom: 5.7, latitude: 36.5616505, longitude: -121.5829968, };

    // dispatch(setViewState(viewState));

    return new CartoSQLLayer({
      id: 'ecoregionsLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      pickable: true,
      stroked: true,
      filled: true,
      getStrokeColor: (d) => [255, 255, 255, 255],
      getFillColor: (object) =>
        getRGBvalue(object.properties.us_l4name, ecoregionsLayer.selectedStore),
      getLineColor: (object) =>
        getLineColorFunc(object.properties.us_l4name, ecoregionsLayer.selectedStore),
      getLineWidth: (object) =>
        getLineWidthFunc(object.properties.us_l4name, ecoregionsLayer.selectedStore),
      lineWidthScale: 1,
      lineWidthMinPixels: 0.2,
      // getLineColor: (object) => object.properties.us_l4name === ecoregionsLayer.selectedStore ? [80, 80, 80] : [255, 255, 255],
      // getLineWidth: (object) => object.properties.us_l4name === ecoregionsLayer.selectedStore ? 1000 : .2,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `
              <strong> ${info.object.properties.us_l4name}</strong><br>
            
            `,
          };
        }
      },
      onClick: (info) => {
        if (info && info.object) {
          console.log(info.object.properties);
          //dispatch(setDetailData(info.object.properties));
          navigate(`/ecoregions/${info.object.properties.cartodb_id}`);
        }
      },
      updateTriggers: {
        getFillColor: { selectedStore: ecoregionsLayer.selectedStore },
        getLineWidth: { selectedStore: ecoregionsLayer.selectedStore },
        getLineColor: { selectedStore: ecoregionsLayer.selectedStore },
      },
    });
  }
}
