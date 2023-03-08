import * as overlay from '@/assets/js/thacer-map-create-overlay'

export function thacerMap () {
  /* global L */
  L.mapbox.accessToken =
    'pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA'

  const tileLayers = createTileLayers()

  const defaultTileLayer = tileLayers['Carte claire']
  const mapConfig = createMapConfig(defaultTileLayer)
  let map = L.map('map', mapConfig)

  const overlays = createOverlays(map)

  L.control.layers(tileLayers, overlays,
    { collapsed: false, sortLayers: true }).addTo(map)
}

function createMapConfig (defaultTileLayer) {
  return {
    center: [40.78, 24.71],
    zoom: 15,
    minZoom: 11,
    layers: [defaultTileLayer],
    maxZoom: 20,
    maxBounds: [
      [40.5, 24.4], // Southwest coordinates
      [40.9, 24.9] // Northeast coordinates
    ]
  }
}

function createTileLayers () {
  let googleSat = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution:
        'Imagery © <a href="https://www.google.com/help/legalnotices_maps.html">Google Maps</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })
  let outdoors = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
    {
      id: 'mapbox/outdoors-v9'
    }
  )
  let light = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
    {
      id: 'mapbox/light-v9'
    }
  )

  return {
    'Carte avec dénivellés': outdoors,
    'Fond satellite': googleSat,
    'Carte claire': light
  }
}

function createOverlays (map) {
  // Ceram - always displayed
  let markersCeram = overlay.createMarkersCeram()
  let ceram = overlay.createOverlayCeram(markersCeram, map)
  overlay.designMarkersCeram(ceram)
  map.addLayer(markersCeram)

  // Adelt and Tours - always displayed (except on some zoom level for ADelt)
  overlay.createOverlayADelt(map).addTo(map)
  overlay.createOverlayTours().addTo(map)

  // Chronique - hid-able/show-able in the control
  let markersChronique = overlay.createMarkersChronique()
  overlay.createOverlayChronique(markersChronique)

  // The rest - hid-able/show-able in the control
  let vestiges = overlay.createOverlayVestiges()
  let secteur = overlay.createOverlaySecteurs(ceram, markersCeram, map)
  let khalil = overlay.createOverlayKhalil(map)
  let orthophotoAgora = overlay.createOverlayOrthophotoAgora()
  let ateliersAmphoriques = overlay.createOverlayAteliersAmphoriques()
  let echantillonsGeol = overlay.createOverlayEchantillonsGeol()

  // Finally, return the list of overlays which will be hid-able/show-able in the control
  return {
    'Vestiges antiques': vestiges.addTo(map), // Display on  by default,
    'Secteurs de fouille et GTh': secteur.addTo(map), // Display on by default,
    'Plan Khalil 1954': khalil,
    'Chronique des fouilles': markersChronique,
    // 'Plan SIG agora': SIG_thasos,
    'Orthophoto agora EfA': orthophotoAgora,
    'Ateliers amphoriques': ateliersAmphoriques,
    'Echantillons géologiques': echantillonsGeol
  }
}
