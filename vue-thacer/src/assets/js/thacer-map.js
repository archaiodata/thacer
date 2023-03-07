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
  let markersCeram = createMarkersCeram()
  let ceram = createOverlayCeram(markersCeram)
  designMarkersCeram(ceram)
  map.addLayer(markersCeram) // Always displayed

  setupSearchCeramText(markersCeram, map, ceram)

  let markersChronique = createMarkersChronique()
  createOverlayChronique(markersChronique)

  createOverlayADelt(map).addTo(map) // Always displayed (except on some zoom level)
  createOverlayTours().addTo(map) // Always displayed

  return {
    'Vestiges antiques': createOverlayVestiges().addTo(map), // Display enabled by default
    'Secteurs de fouille et GTh': createOverlaySecteurs(ceram, markersCeram, map).addTo(map), // Display enabled by default
    'Plan Khalil 1954': createOverlayKhalil(map),
    'Chronique des fouilles': markersChronique,
    // 'Plan SIG agora': SIG_thasos,
    'Orthophoto agora EfA': createOverlayOrthophotoAgora(),
    'Ateliers amphoriques': createOverlayAteliersAmphoriques(),
    'Echantillons géologiques': createOverlayEchantillonsGeol()
  }
}

function createOverlaySecteurs(ceram, markersCeram, map) {
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
            searchCeramByClick(ceram, markersCeram, map, layer)
          })
        })
      })
    })
}

function createOverlayCeram(markersCeram) {
  return L.mapbox
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
}

function createMarkersCeram() {
  return new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
  })
}

function designMarkersCeram(ceram) {
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

function createOverlayVestiges() {
  let vestiges = L.mapbox
    .featureLayer()
    .loadURL(import.meta.env.VITE_API_URL + 'geojson/vestiges.geojson')

  vestiges.getAttribution = function () {
    return 'Plan des vestiges antique : MWK TK EfA'
  }

  return vestiges
}

function createOverlayKhalil(map) {
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

function createOverlayChronique(markersChronique) {
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

function createMarkersChronique() {
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

function createOverlayOrthophotoAgora() {
  return L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
    layers: 'SIG_thasos:Orthophoto_Agora',
    attribution: 'EfA',
    transparent: true,
    maxZoom: 20,
    opacity: 0.5
  })
}

function createOverlayAteliersAmphoriques() {
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

function createOverlayEchantillonsGeol() {
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

function createOverlayADelt(map) {
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

function createOverlayTours() {
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

function setupSearchCeramText(markersCeram, map, ceram) {
  let filterInput = document.getElementById('filter-input')
  filterInput.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
      let value = e.target.value.trim().toLowerCase()
      document.getElementById('nonloc').innerHTML = []

      fetch(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson')
        .then((r) => r.json())
        .then((json) => {
          // console.log(json.features)
          Object.keys(json.features).forEach((k) => {
            let obj = json.features[k]

            if (
              (obj.properties.x == 0 && obj.properties.Pi == value) ||
              (obj.properties.x == 0 &&
                obj.properties.Identification.toString().toLowerCase().indexOf(value) > -1)
            ) {
              if (obj.properties.Pi != null) {
                document.getElementById('nonloc').innerHTML += [
                  '<a class="lost-icon px-1 m-0 border border-white" style="color:white;" href="ceram.php?ID=' +
                    obj.properties.ID +
                    '&ANA=8888880&INV=88880">Π' +
                    obj.properties.Pi +
                    '</a>'
                ]
              } else {
                document.getElementById('nonloc').innerHTML += [
                  '<a class="lost-icon px-1 m-0 border border-white" style="color:white;" href="ceram.php?ID=' +
                    obj.properties.ID +
                    '&ANA=8888880&INV=88880">' +
                    obj.properties.Inv_Fouille +
                    '</a>'
                ]
              }
            }
          })
        })

      markersCeram.clearLayers()
      map.removeLayer(markersCeram)
      ceram.loadURL(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson') // je ne sais pourquoi j'avais mis ça là, déjà fait plus haut mais sinon map.addlayer ne marche pas

      ceram
        .setFilter(function (e) {
          let return1
          let return2
          let return3
          if (e.properties['Identification'] !== null) {
            return1 = e.properties['Identification'].toString().toLowerCase().indexOf(value) > -1
          }
          if (e.properties['Pi'] !== null) {
            return2 = e.properties['Pi'] == value
          } else {
            return2 = return1
          }
          if (e.properties['Description'] !== null) {
            return3 = e.properties['Description'].toString().toLowerCase().indexOf(value) > -1
          }
          return return1 + return2 + return3
        })
        .on('ready', function (e) {
          e.target.eachLayer(function (layer) {
            let archimageURL
            let identifier

            if (layer.feature.properties.Archimage == undefined) {
              archimageURL = 'Archimage non disponible<br>'
            } else {
              archimageURL =
                "<img src='https://archimage.efa.gr/action.php?kroute=image_preview_public&id=" +
                layer.feature.properties.Archimage +
                "&type=2&ext=.jpg' width='92%' margin-left='4%' /><br>"
            }
            if (layer.feature.properties.Inv_Fouille == null) {
              identifier = ''
            } else {
              identifier = '<br>Type : ' + layer.feature.properties.Type
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
                '<br>Type : ' +
                layer.feature.properties.Type +
                '<br>Description : ' +
                layer.feature.properties.Description +
                '<br>Bilbiographie : ' +
                layer.feature.properties.Biblio +
                "<br><a href='ceram.php?ID=" +
                layer.feature.properties.ID +
                '&THA' +
                layer.feature.properties.Num_Analyse +
                '&INV=' +
                layer.feature.properties.Inv_Fouille +
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
      map.addLayer(markersCeram)
    }
  })
}

function searchCeramByClick(ceram, markersCeram, map, layer) {
  map.removeLayer(markersCeram)
  markersCeram.clearLayers()
  let value = layer.feature.properties.secteur_ID
  ceram.loadURL(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson')
  ceram
    .setFilter(function (feature) {
      return feature.properties['secteur_ID'] == value
    })
    .on('ready', function (e) {
      e.target.eachLayer(function (layer) {
        let archimageURL

        if (layer.feature.properties.ArchImage == undefined) {
          archimageURL = 'Archimage non disponible<br>'
        } else {
          archimageURL =
            "<img src='https://archimage.efa.gr/action.php?kroute=image_thumb&id=" +
            layer.feature.properties.ArchImage +
            "'/><br>"
        }
        layer.bindPopup(
          archimageURL +
            'Inventaire : ' +
            // identifier + // TODO check with jean-sé
            '<br>Identification : ' +
            layer.feature.properties.Identification +
            '<br>Type : ' +
            layer.feature.properties.Type +
            '<br>Description : ' +
            layer.feature.properties.Description +
            '<br>Bilbiographie : ' +
            layer.feature.properties.ETh7 +
            "<br><a href='ceram.php?ID=" +
            layer.feature.properties.ID +
            '&ANA=THA' +
            layer.feature.properties.Num_Analyse +
            '&INV=' +
            // identifier + // TODO check with jean-sé
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
      //  map.addLayer(ceram);
      //map.fitBounds(ceram.getBounds());
    })

  map.addLayer(markersCeram)
}
