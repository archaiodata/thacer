import * as overlay from '@/assets/js/thacer-map-create-overlay'

export function thacerMap() {
  /* global L */
  L.mapbox.accessToken =
    'pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA'

  let baseMaps = createBaseMaps()

  let map = L.map('map', createMap(baseMaps['Carte claire']))

  let overlayMaps = createOverlayMaps(map)

  L.control.layers(baseMaps, overlayMaps, { collapsed: false, sortLayers: true }).addTo(map)
}

function createMap(defaultLayer) {
  return {
    center: [40.78, 24.71],
    zoom: 15,
    minZoom: 11,
    layers: [defaultLayer],
    maxZoom: 20,
    maxBounds: [
      [40.5, 24.4], // Southwest coordinates
      [40.9, 24.9] // Northeast coordinates
    ]
  }
}

function createBaseMaps() {
  let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
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

function createOverlayMaps(map) {
  let markersCeram = overlay.createMarkersCeram()
  let ceram = overlay.createOverlayCeram(markersCeram, map)
  overlay.designMarkersCeram(ceram)
  map.addLayer(markersCeram) // Always displayed

  let markersChronique = overlay.createMarkersChronique()
  overlay.createOverlayChronique(markersChronique)

  overlay.createOverlayADelt(map).addTo(map) // Always displayed (except on some zoom level)
  overlay.createOverlayTours().addTo(map) // Always displayed

  return {
    'Vestiges antiques': overlay.createOverlayVestiges().addTo(map), // Display enabled by default
    'Secteurs de fouille et GTh': overlay
      .createOverlaySecteurs(ceram, markersCeram, map)
      .addTo(map), // Display enabled by default
    'Plan Khalil 1954': overlay.createOverlayKhalil(map),
    'Chronique des fouilles': markersChronique,
    // 'Plan SIG agora': SIG_thasos,
    'Orthophoto agora EfA': overlay.createOverlayOrthophotoAgora(),
    'Ateliers amphoriques': overlay.createOverlayAteliersAmphoriques(),
    'Echantillons géologiques': overlay.createOverlayEchantillonsGeol()
  }
}
