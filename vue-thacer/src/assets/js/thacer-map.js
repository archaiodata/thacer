import * as createLayer from '@/assets/js/thacer-map-create-layer'

export function thacerMap() {
  /* global L */
  const tileLayers = createTileLayers()

  const defaultTileLayer = tileLayers['Carte claire']
  const mapConfig = createMapConfig(defaultTileLayer)
  let map = L.map('map', mapConfig)

  const controlledOverlays = createOverlays(map)

  L.control
    .layers(tileLayers, controlledOverlays, { collapsed: false, sortLayers: true })
    .addTo(map)

  L.control
    .zoom({
      position: 'bottomleft'
    })
    .addTo(map)
}

function createMapConfig(defaultTileLayer) {
  return {
    center: [40.78, 24.71],
    zoom: 15,
    minZoom: 11,
    layers: [defaultTileLayer],
    zoomControl: false,
    maxZoom: 20,
    maxBounds: [
      [40.5, 24.4], // Southwest coordinates
      [40.9, 24.9] // Northeast coordinates
    ]
  }
}

function createTileLayers() {
  let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution:
      'Imagery &copy; <a href="https://www.google.com/help/legalnotices_maps.html">Google Maps</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  })

  let topo = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }
  )

  let light = L.tileLayer(
    'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {
      maxZoom: 20,
      attribution:
        'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  )

  return {
    'Carte avec dénivellés': topo,
    'Fond satellite': googleSat,
    'Carte claire': light
  }
}

/*Create all overlays,
add a few directly to the map,
and return those which will be hid-able/show-able in the control*/
function createOverlays(map) {
  // Ceram - always displayed
  let markerClusterGroupCeram = createLayer.createMarkerClusterGroupCeram()
  let featureLayerCeram = createLayer.createFeatureLayerCeram(markerClusterGroupCeram, map)
  markerClusterGroupCeram.addTo(map)

  // Adelt and Tours - always displayed (except on some zoom level for ADelt)
  //createLayer.createFeatureLayerADelt(map).addTo(map)
  //createLayer.createFeatureLayerSites().addTo(map)

  // Chronique - hid-able/show-able in the control
  let markerClusterGroupChronique = createLayer.createMarkerClusterGroupChronique()
  createLayer.createFeatureLayerChronique(markerClusterGroupChronique)

  // The rest - hid-able/show-able in the control
  let vestiges = createLayer.createFeatureLayerVestiges()
  /* let secteur = createLayer.createFeatureLayerSecteurs(
     featureLayerCeram,
     markerClusterGroupCeram,
     map
   )
   */
  let khalil = createLayer.createImageOverlayKhalil(map)
  let sigThasos = createLayer.createTileLayerSigThasos()
  let orthophotoAgora = createLayer.createTileLayerOrthophotoAgora()
  let echantillonsGeol = createLayer.createFeatureLayerEchantillonsGeol()

  // Finally, return the list of overlays which will be hid-able/show-able in the control
  return {
    'Vestiges antiques': vestiges.addTo(map), // Display on by default,
    //'Secteurs de fouille et GTh': secteur.addTo(map), // Display on by default,
    'Plan Khalil 1954': khalil,
    'Chronique des fouilles': markerClusterGroupChronique,
    'Plan SIG agora': sigThasos,
    'Orthophoto agora EfA': orthophotoAgora,
    'Echantillons géologiques': echantillonsGeol
  }
}