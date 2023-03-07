import * as search from '@/assets/js/thacer-map-setup-search'

export function createOverlaySecteurs(ceram, markersCeram, map) {
  /* global L */
  return L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/secteurs.geojson')
    .on('ready', function (e) {
      // function select ceram according to the secteurs ID on the clicked secteur feature
      e.target.eachLayer(function (layer) {
        layer.eachLayer(function (e) {
          let string = ''
          let biblio = ''
          if (
            !(
              (layer.feature.properties.GTh == '') | // TODO GTh : guide de thasos
              (layer.feature.properties.GTh == 'null') |
              (layer.feature.properties.GTh == undefined)
            )
          ) {
            string = ' GTh' + layer.feature.properties.GTh // TODO : renommer la variable
          }
          if (
            !(
              (layer.feature.properties.Référenc == '') |
              (layer.feature.properties.Référenc == 'null') |
              (layer.feature.properties.Référenc == undefined)
            )
          ) {
            biblio = layer.feature.properties.Référenc
          }
          e.bindPopup(layer.feature.properties.Titre + string + '<br>' + biblio, {
            maxWidth: 300,
            minWidth: 10,
            maxHeight: 250,
            autoPan: true,
            closeButton: false,
            autoPanPadding: [0, 0]
          })
          // search ceram on click
          e.on('click', function () {
            search.searchCeramByClick(ceram, markersCeram, map, layer)
          })
        })
      })
    })
}

export function createOverlayCeram(markersCeram, map) {
  let ceram = L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson')
    .on('ready', function (e) {
      e.target.eachLayer(function (layer) {
        // Note : The name "layer" is misleading. A layer is a unique element on the map, here a ceramique.
        let archimageURL
        let Type
        let identifier

        layer.setOpacity(0.8)
        if (layer.feature.properties.Archimage == undefined) {
          archimageURL = 'Archimage non disponible<br>'
        } else {
          archimageURL =
            "<img src='https://archimage.efa.gr/action.php?kroute=image_preview_public&id=" +
            layer.feature.properties.Archimage +
            "&type=2&ext=.jpg' width='92%' margin-left='4%' /><br>"
        }
        if (layer.feature.properties.Type == undefined) {
          Type = ''
        } else {
          Type = '<br>Type : ' + layer.feature.properties.Type
        }
        if (layer.feature.properties.Inv_Fouille == null) {
          identifier = ''
        } else {
          identifier = layer.feature.properties.Inv_Fouille
        }
        if (layer.feature.properties.Pi !== null) {
          identifier = layer.feature.properties.Pi + 'Π'
        }
        layer.bindPopup(
          archimageURL +
            'Inventaire : ' +
            identifier +
            '<br>Identification : ' +
            layer.feature.properties.Identification +
            Type +
            '<br>Description : ' +
            layer.feature.properties.Description +
            '<br>Bilbiographie : ' +
            layer.feature.properties.Biblio +
            "<br><a href='ceram.php?ID=" +
            layer.feature.properties.ID +
            '&ANA=THA' +
            layer.feature.properties.Num_Analyse +
            '&INV=' +
            identifier +
            "'>Fiche complète</a>",
          {
            maxWidth: 350,
            minWidth: 350,
            maxHeight: 550,
            autoPan: true,
            closeButton: true,
            autoPanPadding: [5, 5]
          }
        )
        markersCeram.addLayer(layer)
      })
    })

  search.setupSearchCeramByText(markersCeram, map, ceram)

  return ceram
}

export function createMarkersCeram() {
  return new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
  })
}

export function designMarkersCeram(ceram) {
  ceram.on('layeradd', function (e) {
    let identifier
    let marker = e.layer,
      feature = marker.feature
    if (feature.properties.Pi == undefined) {
      identifier = feature.properties.Inv_Fouille
    } else {
      identifier = feature.properties.Pi + 'Π'
    }
    marker.setIcon(L.divIcon({ html: identifier, className: 'my-icon', iconSize: 'null' }))
  })
}

export function createOverlayVestiges() {
  let vestiges = L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/vestiges.geojson')

  vestiges.getAttribution = function () {
    return 'Plan des vestiges antique : MWK TK EfA'
  }

  return vestiges
}

export function createOverlayKhalil(map) {
  let KhalilimageBounds = [
    [40.768370395, 24.699482062],
    [40.781060633, 24.716708757]
  ] // SWNE

  map.on('overlayadd', function (eo) {
    if (eo.name === 'Khalil 1954 plan') {
      map.fitBounds(KhalilimageBounds)
    }
  })

  return L.imageOverlay(import.meta.env.VITE_API_URL + 'IMAGES/1685.png', KhalilimageBounds)
}

export function createOverlayChronique(markersChronique) {
  L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/chronique.geojson')
    .on('layeradd', function (e) {
      e.target.eachLayer(function (layer) {
        layer.on('click', function () {
          window.open(
            'https://chronique.efa.gr/?kroute=report&id=' + layer.feature.properties.ID,
            '_blank'
          )
        })
        markersChronique.addLayer(layer)
      })

      let marker = e.layer
      marker.setIcon(L.divIcon({ html: 'EfA', className: 'EFA-icon', iconSize: 'null' }))
    })
}

export function createMarkersChronique() {
  return new L.MarkerClusterGroup({
    iconCreateFunction: function (cluster) {
      let childCount = cluster.getChildCount()

      return new L.DivIcon({
        html: '<div class="circle"><span>' + childCount + '</span></div>',
        className: 'circle',
        iconSize: new L.Point(40, 40)
      })
    },
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
  })
}

// -----------------------------------EfA Geoserver WMS ---------------------------------------------
//link broken
// SIG_thasos = L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
//   id: 'vms2',
//   attribution: 'EfA',
//   layers: 'SIG_thasos:fd_thasos_4326',
//   transparent: true,
//   maxZoom: 20,
//   opacity: 0.5
// });

export function createOverlayOrthophotoAgora() {
  return L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
    layers: 'SIG_thasos:Orthophoto_Agora',
    attribution: 'EfA',
    transparent: true,
    maxZoom: 20,
    opacity: 0.5
  })
}

export function createOverlayAteliersAmphoriques() {
  return L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/ateliers_amphoriques.geojson')
    .on('layeradd', function (e) {
      e.layer.setIcon(
        L.icon({
          iconUrl: 'https://circe-antique.huma-num.fr/ThaCER/AmpTha.svg',
          iconSize: [20, 50]
        })
      )
      e.target.eachLayer(function (layer) {
        layer.bindPopup(layer.feature.properties.Nom, {
          autoPan: true,
          closeButton: false,
          autoPanPadding: [5, 5]
        })
      })
    })
}

export function createOverlayEchantillonsGeol() {
  return L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/echantillonsgeol.geojson')
    .on('layeradd', function (e) {
      let marker = e.layer,
        feature = marker.feature
      marker.setIcon(
        L.divIcon({
          html: feature.properties.RecNum,
          className: 'EFA-icon',
          iconSize: 'null'
        })
      )
    })
}

export function createOverlayADelt(map) {
  let ADelt = L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/ADelt51.geojson')
    .on('ready', function (e) {
      e.target.eachLayer(function (layer) {
        layer.bindPopup('ADelt 51 : "' + layer.feature.properties.Texte + '"<br>', {
          maxWidth: 350,
          maxHeight: 550,
          autoPan: true,
          closeButton: false,
          autoPanPadding: [5, 5]
        })
      })
    })

  ADelt.on('layeradd', function (e) {
    let marker = e.layer,
      feature = marker.feature
    marker.setIcon(
      L.divIcon({
        html: feature.properties.Nom_GR,
        className: 'ADelt-icon',
        iconSize: 'null'
      })
    )
  })

  let show_label_zoom = 12 // zoom level threshold for showing/hiding labels
  function show_hide_labels() {
    let cur_zoom = map.getZoom()
    if (cur_zoom <= show_label_zoom) {
      map.removeLayer(ADelt)
    } else if (cur_zoom > show_label_zoom) {
      map.addLayer(ADelt)
    }
  }

  map.on('zoomend', show_hide_labels)
  show_hide_labels()

  return ADelt
}

export function createOverlayTours() {
  return L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/toursOS.geojson')
    .on('layeradd', function (e) {
      e.layer.setIcon(
        L.icon({
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Maki-castle-15.svg',
          iconSize: [15, 35]
        })
      )
      e.target.eachLayer(function (layer) {
        layer.bindPopup(
          layer.feature.properties.Name +
            "<br>Description d'Osborne 1986 : " +
            layer.feature.properties.Osborne,
          {
            maxWidth: 350,
            maxHeight: 550,
            autoPan: true,
            closeButton: false,
            autoPanPadding: [5, 5]
          }
        )
      })
    })
}
