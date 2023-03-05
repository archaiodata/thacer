export function thacerMap() {
  L.mapbox.accessToken =
    'pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA'

  var bounds = [
    [40.5, 24.4], // Southwest coordinates
    [40.9, 24.9] // Northeast coordinates
  ]

  var satellite = L.mapbox.tileLayer('mapbox.satellite'),
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: 'Imagery © <a href="www.google.com/help/legalnotices_maps.html">Google Maps</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),
    outdoors = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
      {
        id: 'mapbox/outdoors-v9'
      }
    ),
    light = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
      {
        id: 'mapbox/light-v9'
      }
    ),
    dark = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10'
      }
    ),
    streets = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianNncm9zIiwiYSI6ImNqOHQ0azNjcDBoYTEycXF1dzB0MzN4cDEifQ.DdPsBcV1XpWefQUPmBg9QA',
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }
    )

  var map = L.map('map', {
    center: [40.78, 24.71],
    zoom: 15,
    minZoom: 11,
    layers: [light],
    maxZoom: 20,
    maxBounds: bounds // Sets bounds as max
  })

  //---------------------------- Cluster ----------------------------

  var markers = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
    //disableClusteringAtZoom: 20
  })

  //---------------------------- Cluster pour Chronique ----------------------------

  var markers2 = new L.MarkerClusterGroup({
    iconCreateFunction: function (cluster) {
      var childCount = cluster.getChildCount()
      var c = ' marker-cluster-'
      if (childCount < 10) {
        c += 'small'
      } else if (childCount < 100) {
        c += 'medium'
      } else {
        c += 'large'
      }

      return new L.DivIcon({
        html: '<div class="circle"><span>' + childCount + '</span></div>',
        className: 'marker-cluster' + c,
        className: 'circle',
        iconSize: new L.Point(40, 40)
      })
    },
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
  })

  //---------------------------- Couche CERAM ------------------------------------

  var result = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/ceram.geojson')
    .on('ready', function (e) {
      e.target.eachLayer(function (layer) {
        layer.setOpacity(0.8)
        if (layer.feature.properties.Archimage == undefined) {
          var archimageURL = 'Archimage non disponible<br>'
        } else {
          var archimageURL =
            "<img src='https://archimage.efa.gr/action.php?kroute=image_preview_public&id=" +
            layer.feature.properties.Archimage +
            "&type=2&ext=.jpg' width='92%' margin-left='4%' /><br>"
        }
        if (layer.feature.properties.Type == undefined) {
          var Type = ''
        } else {
          var Type = '<br>Type : ' + layer.feature.properties.Type
        }
        if (layer.feature.properties.Inv_Fouille == null) {
          var NUM = ''
        } else {
          var NUM = layer.feature.properties.Inv_Fouille
        }
        if (layer.feature.properties.Pi !== null) {
          var NUM = layer.feature.properties.Pi + 'Π'
        }
        layer.bindPopup(
          archimageURL +
            'Inventaire : ' +
            NUM +
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
            NUM +
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
        markers.addLayer(layer)
      })
    })

  //add the MarkerClusterGroup to the map:
  map.addLayer(markers)

  //---------------------------- search Couche CERAM ----------------------------
  var filterInput = document.getElementById('filter-input')
  filterInput.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
      var value = e.target.value.trim().toLowerCase()
      document.getElementById('nonloc').innerHTML = []

      fetch('API/geojson/ceram.geojson')
        .then((r) => r.json())
        .then((json) => {
          // console.log(json.features)
          Object.keys(json.features).forEach((k) => {
            let obj = json.features[k]

            if (
              (obj.properties.x == 0 && obj.properties.Pi == value) ||
              // obj.properties.x == 0 && obj.properties.Description.toString().toLowerCase().indexOf(value) > -1 ||
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

      markers.clearLayers()
      map.removeLayer(markers)
      result.loadURL('API/geojson/ceram.geojson') // je ne sais pourquoi j'avais mis ça là, déjà fait plus haut mais sinon map.addlayer ne marche pas

      result
        .setFilter(function (e) {
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
            if (layer.feature.properties.Archimage == undefined) {
              var archimageURL = 'Archimage non disponible<br>'
            } else {
              var archimageURL =
                "<img src='https://archimage.efa.gr/action.php?kroute=image_preview_public&id=" +
                layer.feature.properties.Archimage +
                "&type=2&ext=.jpg' width='92%' margin-left='4%' /><br>"
            }
            if (layer.feature.properties.Type == undefined) {
              var Type = ''
            } else {
              var Type = '<br>Type : ' + layer.feature.properties.Type
            }
            if (layer.feature.properties.Inv_Fouille == null) {
              var NUM = ''
            } else {
              var NUM = '<br>Type : ' + layer.feature.properties.Type
            }
            if (layer.feature.properties.Pi !== null) {
              var NUM = layer.feature.properties.Pi + 'Π'
            }
            layer.bindPopup(
              archimageURL +
                'Inventaire : ' +
                NUM +
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
            markers.addLayer(layer)
          })
        })
      map.addLayer(markers)
    }
  })

  //-------------------------------------------  secteurs + select ceram  _______________________________________________________

  var secteurs = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/secteurs.geojson')
    .on('ready', function () {
      // function select ceram according to the secteurs ID on the clicked secteur feature
      secteurs.eachLayer(function (layer) {
        layer.eachLayer(function (e) {
          var string = ''
          var biblio = ''
          if (
            (layer.feature.properties.GTh == '') |
            (layer.feature.properties.GTh == 'null') |
            (layer.feature.properties.GTh == undefined)
          ) {
            var GTh = ' '
          } else {
            var string = ' GTh' + layer.feature.properties.GTh
          }
          if (
            (layer.feature.properties.Référenc == '') |
            (layer.feature.properties.Référenc == 'null') |
            (layer.feature.properties.Référenc == undefined)
          ) {
            var GTh = ' '
          } else {
            var biblio = layer.feature.properties.Référenc
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
            map.removeLayer(markers)
            markers.clearLayers()
            var value = layer.feature.properties.secteur_ID
            result.loadURL('API/geojson/ceram.geojson')
            result
              .setFilter(function (feature) {
                return feature.properties['secteur_ID'] == value
              })
              .on('ready', function (e) {
                e.target.eachLayer(function (layer) {
                  if (layer.feature.properties.ArchImage == undefined) {
                    var archimageURL = 'Archimage non disponible<br>'
                  } else {
                    var archimageURL =
                      "<img src='https://archimage.efa.gr/action.php?kroute=image_thumb&id=" +
                      layer.feature.properties.ArchImage +
                      "'/><br>"
                  }
                  layer.bindPopup(
                    archimageURL +
                      'Inventaire : ' +
                      NUM +
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
                      NUM +
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
                  markers.addLayer(layer)
                })
                //  map.addLayer(result);
                //map.fitBounds(result.getBounds());
              })

            map.addLayer(markers)
          })
        })
      })
    })
    .addTo(map)

  //_____________________________________ design marker _____________________________________

  result.on('layeradd', function (e) {
    var marker = e.layer,
      feature = marker.feature
    if (feature.properties.Pi == undefined) {
      var NUM = feature.properties.Inv_Fouille
    } else {
      var NUM = feature.properties.Pi + 'Π'
    }
    marker.setIcon(L.divIcon({ html: NUM, className: 'my-icon', iconSize: 'null' }))
  })

  // ------------------------- Chronique -----------------------------
  var chronique = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/chronique.geojson')
    .on('layeradd', function (e) {
      e.target.eachLayer(function (layer) {
        layer.on('click', function () {
          window.open(
            'https://chronique.efa.gr/?kroute=report&id=' + layer.feature.properties.ID,
            (target = '_blank')
          )
        })
        markers2.addLayer(layer)
      })
    })

  chronique.on('layeradd', function (e) {
    // map.addLayer(markers2);
    var marker = e.layer,
      feature = marker.feature
    marker.setIcon(L.divIcon({ html: 'EfA', className: 'EFA-icon', iconSize: 'null' }))
  })

  // ------------------------- ADelt -----------------------------

  var ADelt = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/ADelt51.geojson')
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
    .addTo(map)

  ADelt.on('layeradd', function (e) {
    var marker = e.layer,
      feature = marker.feature
    marker.setIcon(
      L.divIcon({
        html: feature.properties.Nom_GR,
        className: 'ADelt-icon',
        iconSize: 'null'
      })
    )
  })

  var show_label_zoom = 12 // zoom level threshold for showing/hiding labels
  function show_hide_labels() {
    var cur_zoom = map.getZoom()
    if (cur_zoom <= show_label_zoom) {
      map.removeLayer(ADelt)
    } else if (cur_zoom > show_label_zoom) {
      map.addLayer(ADelt)
    }
  }

  map.on('zoomend', show_hide_labels)
  show_hide_labels()

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

  Orthophoto_Agora = L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
    layers: 'SIG_thasos:Orthophoto_Agora',
    attribution: 'EfA',
    transparent: true,
    maxZoom: 20,
    opacity: 0.5
  })

  //_____________________________________ vestiges _____________________________________

  var vestiges = L.mapbox.featureLayer().loadURL('API/geojson/vestiges.geojson').addTo(map)
  vestiges.getAttribution = function () {
    return 'Plan des vestiges antique : MWK TK EfA'
  }

  //_____________________________________ Atλas  _____________________________________

  // var AtlasGeonamePleiades = L.mapbox.featureLayer()
  // 	.loadURL('AtlasGeonamePleiades.geojson')
  // 	.on('ready', function(e) {
  //   		e.target.eachLayer(function(layer) {
  //    			layer.bindPopup(layer.feature.properties.toponame_lat + "<br><a href='https://www.geonames.org/" + layer.feature.properties.GEONAME_ID + "'>Geoname</a>",{maxWidth: 350, maxHeight: 550, autoPan: true, closeButton: false, autoPanPadding: [5, 5]})
  //  		});
  // 	});

  //     AtlasGeonamePleiades.on('layeradd', function(e) {
  //   var marker = e.layer,
  //     feature = marker.feature;
  //    marker.setIcon(L.divIcon({"html": feature.properties.toponame_lat,"className":"ADelt-icon","iconSize":"null"}));
  // });

  // 	AtlasGeonamePleiades.getAttribution = function() { return 'Atλas JSG'; };

  //_____________________________________ Ateliers _____________________________________

  var ateliers_amphoriques = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/ateliers_amphoriques.geojson')
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

  //_____________________________________ echantillonsgeol _____________________________________

  var echantillonsgeol = L.mapbox.featureLayer().loadURL('API/geojson/echantillonsgeol.geojson')

  echantillonsgeol.on('layeradd', function (e) {
    var marker = e.layer,
      feature = marker.feature
    marker.setIcon(
      L.divIcon({
        html: feature.properties.RecNum,
        className: 'EFA-icon',
        iconSize: 'null'
      })
    )
  })

  //_____________________________________ tours _____________________________________

  var tours = L.mapbox
    .featureLayer()
    .loadURL('API/geojson/toursOS.geojson')
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
    .addTo(map)

  map.on('overlayadd', function (eo) {
    if (eo.name === 'Khalil 1954 plan') {
      map.fitBounds(KhalilimageBounds)
    }
  })

  /*
      Add raster
  */

  var KhalilimageBounds = [
    [40.768370395, 24.699482062],
    [40.781060633, 24.716708757]
  ] // SWNE
  var Khalil = L.imageOverlay('1685.png', KhalilimageBounds)

  /*
      Control.layers
  */
  var baseMaps = {
    'Carte avec dénivellés': outdoors,
    'Fond satellite': googleSat,
    'Carte claire': light
    // 'dark': dark,
    //'streets' : streets
  }

  var overlayMaps = {
    'Vestiges antiques': vestiges,
    'Secteurs de fouille et GTh': secteurs,
    'Plan Khalil 1954': Khalil,
    'Chronique des fouilles': markers2,
    // 'Plan SIG agora': SIG_thasos,
    'Orthophoto agora EfA': Orthophoto_Agora,
    'Ateliers amphoriques': ateliers_amphoriques,
    //'Toponymes Atλas' : AtlasGeonamePleiades,
    // 'Osborne 1986 Island towers' : tours,
    'Echantillons géologiques': echantillonsgeol
  }

  L.control.layers(baseMaps, overlayMaps, { collapsed: false, sortLayers: true }).addTo(map)
}
