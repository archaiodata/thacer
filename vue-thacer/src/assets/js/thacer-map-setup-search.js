import { isObject } from '@/assets/js/utils.js'
import { setCeramLayer } from '@/assets/js/thacer-map-create-layer'

const doesCeramObjectPassesSearch = (ceramObject, searchString) => {
  if (!isObject(ceramObject)) {
    console.error(`Error in doesCeramObjectPassFilter, ceramObject is not an object :`, ceramObject)
    return false
  }

  const isValueContainedInIdentification =
    ceramObject['Identification'] &&
    ceramObject['Identification'].toString().toLowerCase().includes(searchString)

  const isValueEqualsPi = ceramObject['Pi'] && ceramObject['Pi'] === searchString

  const isValueContainedInDescription =
    ceramObject['Description'] &&
    ceramObject['Description'].toString().toLowerCase().includes(searchString)

  return isValueContainedInIdentification || isValueEqualsPi || isValueContainedInDescription
}

export function setupSearchCeramByText(markerClusterGroupCeram, map, featureLayerCeram) {
  let filterInput = document.getElementById('filter-input')
  filterInput.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
      let value = e.target.value.trim().toLowerCase()
      document.getElementById('nonloc').innerHTML = []

      fetch(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson')
        .then((r) => r.json())
        .then((json) => {
          Object.keys(json.features).forEach((k) => {
            let obj = json.features[k]

            if (obj.properties.x == 0) {
              if (doesCeramObjectPassesSearch(obj.properties, value)) {
                let label
                if (obj.properties.Pi != null) {
                  label = 'Π' + obj.properties.Pi
                } else {
                  label = obj.properties.Inv_Fouille
                }
                document.getElementById('nonloc').innerHTML += [
                  '<a class="unlocalised-tag px-1 m-0 border border-white" href="ceram?ID=' +
                    obj.properties.ID +
                    '&ANA=8888880&INV=88880">' +
                    label +
                    '</a>'
                ]
              }
            }
          })
        })

      markerClusterGroupCeram.clearLayers()
      map.removeLayer(markerClusterGroupCeram)
      featureLayerCeram.loadURL(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson') // je ne sais pourquoi j'avais mis ça là, déjà fait plus haut mais sinon map.addlayer ne marche pas

      featureLayerCeram
        .setFilter((e) => doesCeramObjectPassesSearch(e?.properties, value))
        .on('ready', function (e) {
          e.target.eachLayer(function (layer) {
            setCeramLayer(layer)
            markerClusterGroupCeram.addLayer(layer)
          })
        })
      map.addLayer(markerClusterGroupCeram)
    }
  })
}

export function searchCeramByClick(featureLayerCeram, markerClusterGroupCeram, map, layer) {
  map.removeLayer(markerClusterGroupCeram)
  markerClusterGroupCeram.clearLayers()
  let value = layer.feature.properties.secteur_ID
  featureLayerCeram.loadURL(import.meta.env.VITE_API_URL + 'geojson/ceram.geojson')
  featureLayerCeram
    .setFilter(function (feature) {
      return feature.properties['secteur_ID'] == value
    })
    .on('ready', function (e) {
      e.target.eachLayer(function (layer) {
        setCeramLayer(layer)
        markerClusterGroupCeram.addLayer(layer)
      })
    })

  map.addLayer(markerClusterGroupCeram)
}