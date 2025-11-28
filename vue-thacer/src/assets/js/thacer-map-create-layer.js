import * as search from '@/assets/js/thacer-map-setup-search'
import L from 'leaflet'

export function setCeramLayer(ceramLayer) {
  ceramLayer.setOpacity(0.8)

  let popup = ''
  if (ceramLayer.feature.properties.Archimage) {
    popup =
      "<img src='https://archimage.efa.gr/action.php?kroute=image_preview_public&id=" +
      ceramLayer.feature.properties.Archimage +
      "&type=2&ext=.jpg' /><br>"
  }
  popup +=
    '<a class="text-decoration-none text-secondary" target="_blank" href=#/ceram?ID=' +
    ceramLayer.feature.properties.ID +
    '>'
  const fields = [
    'Forme',
    'Pi',
    'Inv_Fouille',
    'Référence tesson',
    'Numéro d’inventaire',
    'Type',
    'Catégorie',
    'Origine',
    'Description',
    'Référence',
    'Publication',
    'Bibliographie'
  ]

  fields.forEach((field) => {
    if (ceramLayer.feature.properties[field]) {
      popup += `${field === 'Pi' ? 'Inventaire musée ' : field} : ${
        ceramLayer.feature.properties[field]
      }<br>`
    }
  })

  ceramLayer.bindPopup(popup + '</a>', {
    maxWidth: 350,
    minWidth: 350, 
    maxHeight: 550,
    autoPan: true,
    closeButton: false,
    autoPanPadding: [5, 5]
  })
}

export function createFeatureLayerSecteurs(ceram, markerClusterGroupCeram, map) {
  const layer = L.geoJSON()

  fetch(import.meta.env.VITE_API_URL + 'geojson/secteurs.geojson')
    .then((response) => response.json())
    .then((data) => {
      layer.addData(data)

      // set up the popup and click events for each layer
      layer.eachLayer(function (e) {
        let stringGTh = ''
        let stringRef = ''
        if (e.feature.properties.GTh) {
          stringGTh = ' GTh' + e.feature.properties.GTh
        }
        if (e.feature.properties.Référenc) {
          stringRef = e.feature.properties.Référenc
        }
        e.bindPopup(e.feature.properties.Titre + stringGTh + '<br>' + stringRef, {
          maxWidth: 300,
          minWidth: 10,
          maxHeight: 250,
          autoPan: true,
          closeButton: false,
          autoPanPadding: [0, 0],
          offset: [0, -22]
        })
        // search ceram on click
        e.on('click', function () {
          search.searchCeramByClick(ceram, markerClusterGroupCeram, map, e)
        })
      })
    })

  // return the leaflet layer
  return layer
}

export function createFeatureLayerCeram(markerClusterGroupCeram, map) {
  let featureLayerCeram = L.geoJSON()

  const cachedData = sessionStorage.getItem('ceramData')
  if (cachedData) {
    const data = JSON.parse(cachedData)

    featureLayerCeram = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        setCeramLayer(layer)
        markerClusterGroupCeram.addLayer(layer)
      }
    })
    search.designMarkersCeram(markerClusterGroupCeram)
  } else {
    fetch(import.meta.env.VITE_API_URL + 'index.php?CERAM')
      .then((response) => response.json())
      .then((data) => {
        // Stocker les données dans le sessionStorage
        sessionStorage.setItem('ceramData', JSON.stringify(data))

        // Créer la couche GeoJSON avec les données récupérées
        featureLayerCeram = L.geoJSON(data, {
          onEachFeature: function (feature, layer) {
            setCeramLayer(layer)
            markerClusterGroupCeram.addLayer(layer)
          }
        })
        // Appliquer le design des marqueurs après ajout
        search.designMarkersCeram(markerClusterGroupCeram)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données CERAM:', error)
      })
  }

  // Configurer la recherche
  search.setupSearchCeramByText(markerClusterGroupCeram, map)

  return featureLayerCeram
}

export function createMarkerClusterGroupCeram() {
  return new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 1.5,
    spiderLegPolylineOptions: { weight: 1, color: '#fff', opacity: 0.1 }
  })
}

export function createFeatureLayerVestiges() {
  let vestiges = L.featureGroup()

  fetch(import.meta.env.VITE_API_URL + 'geojson/vestiges.geojson')
    .then((res) => res.json())
    .then((data) => {
      let layer = L.geoJSON(data, {
        style: { color: 'grey' }
      })
      vestiges.addLayer(layer)
    })

  vestiges.getAttribution = function () {
    return 'Plan des vestiges antique : MWK TK EfA'
  }

  return vestiges
}

export function createImageOverlayKahil(map) {
  let KahilimageBounds = [
    [40.768370395, 24.699482062],
    [40.781060633, 24.716708757]
  ] // SWNE

  map.on('overlayadd', function (eo) {
    if (eo.name === 'Plan Kahil 1954') {
      map.fitBounds(KahilimageBounds)
    }
  })

  return L.imageOverlay('Plan_Kahil_1954.png', KahilimageBounds)
}

export function createFeatureLayerChronique(markersChronique) {
  fetch(import.meta.env.VITE_API_URL + 'geojson/chronique.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.on('click', function () {
            window.open(
              'https://chronique.efa.gr/?kroute=report&id=' + feature.properties.ID,
              '_blank'
            )
          })
          markersChronique.addLayer(layer)
        },
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: L.divIcon({ html: 'EfA', className: 'marker EFA-marker', iconSize: [40, 40] })
          })
        }
      })
    })
}

export function createMarkerClusterGroupChronique() {
  return new L.MarkerClusterGroup({
    iconCreateFunction: function (cluster) {
      let childCount = cluster.getChildCount()

      return new L.DivIcon({
        html: '<div class="efa-cluster"><span>' + childCount + '</span></div>',
        className: 'efa-cluster',
        iconSize: [40, 40]
      })
    },
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 2
  })
}

// -----------------------------------EfA Geoserver WMS ---------------------------------------------
export function createTileLayerSigThasos() {
  return L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
    layers: 'SIG_thasos:fd_thasos_4326',
    attribution: 'Plan SIG Agora : C. Guillaume, N. Trippé, L. Fadin, EfA',
    transparent: true,
    maxZoom: 20,
    opacity: 0.5
  })
}

export function createTileLayerOrthophotoAgora() {
  return L.tileLayer.wms('https://geoserver.efa.gr/geoserver/wms?', {
    layers: 'SIG_thasos:Orthophoto_Agora',
    attribution: 'Orthophoto Agora : L. Fadin, N. Trippé, EfA',
    transparent: true,
    maxZoom: 20,
    opacity: 0.5
  })
}

export function createFeatureLayerEchantillonsGeol() {
  let echantillons = L.featureGroup()
  fetch(import.meta.env.VITE_API_URL + 'geojson/echantillonsgeol.geojson')
    .then((response) => response.json())
    .then((data) => {
      let layer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: L.divIcon({
              html: feature.properties.RecNum,
              className: 'marker echantillons-geol-marker',
              iconSize: [40, 40]
            })
          })
        }
      })
      echantillons.addLayer(layer)
    })
  return echantillons
}

export function createFeatureLayerADelt(map) {
  let ADelt = L.featureGroup()

  fetch(import.meta.env.VITE_API_URL + 'geojson/ADelt51.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: L.divIcon({
              html: feature.properties.Nom_GR,
              className: 'ADelt-dot',
              iconSize: 0
            })
          })
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('ADelt 51 : "' + feature.properties.Texte + '"<br>', {
            maxWidth: 350,
            maxHeight: 550,
            autoPan: true,
            closeButton: false,
            autoPanPadding: [5, 5]
          })
        },

        pane: 'markerPane',
        interactive: true
      }).addTo(ADelt)
    })

  ADelt.on('add', function () {
    map.on('zoomend', show_hide_labels)
    show_hide_labels()
  })

  function show_hide_labels() {
    let cur_zoom = map.getZoom()
    if (cur_zoom <= 13) {
      ADelt.eachLayer(function (layer) {
        map.removeLayer(layer)
      })
    } else if (cur_zoom > 13) {
      ADelt.eachLayer(function (layer) {
        map.addLayer(layer)
      })
    }
  }

  return ADelt
}

export function createFeatureLayerSites() {
  let sites = L.featureGroup()

  fetch(import.meta.env.VITE_API_URL + 'geojson/sites.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          let iconUrl =
            feature.properties.type === 'Atelier'
              ? 'AmpTha.svg'
              : 'https://upload.wikimedia.org/wikipedia/commons/8/84/Maki-castle-15.svg'
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: iconUrl,
              iconSize: feature.properties.type === 'Atelier' ? [20, 50] : [15, 35]
            })
          })
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.Nom + ': ' + feature.properties.desc, {
            maxWidth: 350,
            maxHeight: 550,
            autoPan: true,
            closeButton: false,
            autoPanPadding: [5, 5]
          })
        }
      }).addTo(sites)
    })
  return sites
}

// Fetch an ArcGIS FeatureLayer (MapServer/<id>) via its query endpoint and
// convert to a Leaflet layer. The ArcGIS service may be behind a proxy;
// provide `proxyPath` if needed (for example `/arcgisproxyportal/proxy.ashx?`).
// Options:
//  - layerUrl: required. e.g. 'https://.../MapServer/4'
//  - proxyPath: optional prefix used to proxy the request
//  - where: optional ArcGIS WHERE clause (default: '1=1')
//  - outFields: optional fields (default: '*')
//  - markerClusterGroup: optional L.MarkerClusterGroup to add points to
//  - pointToLayer / onEachFeature: optional handlers passed to L.geoJSON
export function createFeatureLayerArcgis(options) {
  const {
    layerUrl,
    proxyPath = import.meta.env.VITE_ARCGIS_PROXY || '',
    where = '1=1',
    outFields = '*',
    markerClusterGroup = null,
    pointToLayer = null,
    onEachFeature = null,
    // Optional ArcGIS token. NOTE: embedding a token in client-side code
    // exposes it to users; prefer a server-side proxy that stores the token.
    token = null
  } = options || {}

  if (!layerUrl) {
    console.error('createFeatureLayerArcgis: missing layerUrl')
    return L.featureGroup()
  }

  let arcgisQuery = `${layerUrl}/query?where=${encodeURIComponent(where)}&outFields=${encodeURIComponent(
    outFields
  )}&outSR=4326&f=geojson`

  // If a token is provided, append it as a query parameter. Prefer server-side
  // proxy for token management; this is only for quick client-side testing.
  if (token) {
    arcgisQuery += `&token=${encodeURIComponent(token)}`
  }
  const url = proxyPath ? `${proxyPath}${arcgisQuery}` : arcgisQuery

  // Helpful debug: show the full URL we will fetch so devs can inspect network
  // requests and adjust `proxyPath` (which may need to be an absolute URL).
  // Example proxy usage (absolute):
  // 'https://ops.arxaiologikoktimatologio.gov.gr/arcgisproxyportal/proxy.ashx?'
  console.debug('ArcGIS query URL:', url)

  const layerGroup = L.featureGroup()

  // Paginated fetch to bypass `maxRecordCount` (commonly 1000).
  // We request pages with `resultOffset` and `resultRecordCount`.
  ;(async function loadAllPages() {
    // small helper to build proxied URLs
    const buildProxied = (raw) => (proxyPath ? `${proxyPath}${raw}` : raw)

    // Try to fetch layer metadata first. If the layer is point-only but the
    // parent MapServer exposes polygon sibling layers, auto-load those polygons
    // so the client view matches the remote portal.
    try {
      const metaRes = await fetch(buildProxied(`${layerUrl}?f=json`))
      if (metaRes && metaRes.ok) {
        const layerMeta = await metaRes.json()
        const autoLoadPolygons = options.autoLoadSiblingPolygons !== false
        if (autoLoadPolygons && layerMeta && layerMeta.geometryType === 'esriGeometryPoint') {
          const parentUrl = layerUrl.replace(/\/(\d+)$/, '')
          if (parentUrl !== layerUrl) {
            try {
              const parentMetaRes = await fetch(buildProxied(`${parentUrl}?f=json`))
              if (parentMetaRes && parentMetaRes.ok) {
                const parentMeta = await parentMetaRes.json()
                const polygonLayers = (parentMeta.layers || []).filter(
                  (l) => l.geometryType === 'esriGeometryPolygon'
                )
                for (const pl of polygonLayers) {
                  try {
                    const purl = `${parentUrl}/${pl.id}/query?where=1%3D1&outFields=${encodeURIComponent(
                      outFields
                    )}&outSR=4326&f=geojson`
                    const pres = await fetch(buildProxied(purl))
                    if (pres && pres.ok) {
                      const pdata = await pres.json()
                      L.geoJSON(pdata, {
                        style: options.polygonStyle || { color: '#3388ff', weight: 1, fillOpacity: 0.2 },
                        onEachFeature: function (feature, layer) {
                          if (onEachFeature) {
                            onEachFeature(feature, layer)
                          }
                          layerGroup.addLayer(layer)
                        }
                      })
                    }
                  } catch (e) {
                    console.debug('Failed to load sibling polygon layer', pl.id, e)
                  }
                }
              }
            } catch (e) {
              console.debug('Failed to fetch parent MapServer metadata', e)
            }
          }
        }
      }
    } catch (e) {
      console.debug('Could not fetch layer metadata:', e)
    }
    const pageSize = options.pageSize || 1000
    let offset = 0
    try {
      let lastCount = 0
      do {
        const pageUrl = `${url}&resultOffset=${offset}&resultRecordCount=${pageSize}`
        console.debug('Fetching ArcGIS page:', pageUrl)

        const res = await fetch(pageUrl)
        if (!res.ok) {
          let txt = ''
          try {
            txt = await res.text()
          } catch (e) {
            txt = '<unable to read response body>'
          }
          const msg = `ArcGIS query failed: ${res.status} ${res.statusText} - ${txt}`
          throw new Error(msg)
        }

        const geojson = await res.json()
        if (!geojson || !geojson.type) {
          console.error('ArcGIS query returned unexpected payload', geojson)
          break
        }

        const features = geojson.features || []
        if (features.length === 0) {
          // no more features
          break
        }

        // create a layer for this page and add features. onEachFeature will
        // handle adding to markerClusterGroup if provided.
        L.geoJSON(geojson, {
          pointToLayer: pointToLayer || undefined,
          onEachFeature: function (feature, layer) {
            if (onEachFeature) {
              onEachFeature(feature, layer)
            }
            if (markerClusterGroup && layer instanceof L.Marker) {
              markerClusterGroup.addLayer(layer)
            } else {
              layerGroup.addLayer(layer)
            }
          }
        })

        lastCount = features.length
        offset += lastCount
      } while (lastCount === pageSize)
    } catch (err) {
      console.error('Error loading ArcGIS FeatureLayer:', err)
    }
  })()

  return layerGroup
}
