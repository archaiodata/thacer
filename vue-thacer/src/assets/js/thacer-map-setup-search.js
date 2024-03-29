import { isObject, notifyProgrammaticError } from '@/assets/js/utils.js'
import { setCeramLayer } from '@/assets/js/thacer-map-create-layer'
import { mapToRealKeyName } from '@/assets/js/key-mapping'

export function setupSearchCeramByText(markerClusterGroupCeram, map) {
  /* global L */
  const filterInput = document.getElementById('filter-input')
  filterInput.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) {
      return
    }
    if (!e.target.value) {
      // Clear filter on submiting an empty field
      document.getElementById('nonloc').innerHTML = []

      markerClusterGroupCeram.clearLayers()
      return
    }
    const inputSearchString = e.target.value.trim().toLowerCase()
    document.getElementById('nonloc').innerHTML = []

    document.getElementById('loading-unlocalised').classList.remove('d-none')
    fetch(import.meta.env.VITE_API_URL + 'index.php?CERAM')
      .then((r) => r.json())
      .then((json) => {
        Object.keys(json.features).forEach((k) => {
          let obj = json.features[k]

          // Adding current ceramObject only if unlocalised and passing input search string :
          if (
            obj.geometry.coordinates[0] === 0 &&
            doesCeramObjectPassesInputSearchString(obj.properties, inputSearchString)
          ) {
            let label = obj.properties.Pi ? 'Π' + obj.properties.Pi : obj.properties.ID

            document.getElementById('nonloc').innerHTML += [
              '<a class="unlocalised-tag px-1 m-0 border border-white" href="#/ceram?ID=' +
                obj.properties.ID +
                '">' +
                label +
                '</a>'
            ]
          }
        })

        document.getElementById('loading-unlocalised').classList.add('d-none')
      })

    markerClusterGroupCeram.clearLayers()

    const ceramGeojsonUrl = import.meta.env.VITE_API_URL + 'index.php?CERAM'
    document.getElementById('loading-localised').classList.remove('d-none')
    fetch(ceramGeojsonUrl)
      .then((response) => response.json())
      .then((data) => {
        const geojsonLayer = L.geoJSON(data, {
          filter: (e) => {
            return (
              e.geometry.coordinates[0] !== 0 &&
              doesCeramObjectPassesInputSearchString(e?.properties, inputSearchString)
            )
          },
          onEachFeature: (feature, layer) => {
            setCeramLayer(layer)
          }
        })

        markerClusterGroupCeram.clearLayers()
        markerClusterGroupCeram.addLayer(geojsonLayer)
        map.addLayer(markerClusterGroupCeram)
        document.getElementById('loading-localised').classList.add('d-none')
      })
  })
}

// This function will be launched for each ceramObject.
// It returns true if ceramObject correspond with the input search string
const doesCeramObjectPassesInputSearchString = (ceramObject, inputSearchString) => {
  // Programmatic errors :
  if (!isObject(ceramObject)) {
    notifyProgrammaticError(
      `Error in doesCeramObjectPassFilter, ceramObject is not an object : ${ceramObject}`
    )
    return false
  }
  if (typeof inputSearchString !== 'string') {
    notifyProgrammaticError(
      `Error in doesCeramObjectPassFilter, inputSearchString is not an string :  ${ceramObject}`
    )
    return false
  }

  // Trim and lower case :
  inputSearchString = inputSearchString.trim()
  inputSearchString = inputSearchString.toLowerCase()

  // If empty search query :
  if (inputSearchString === '') {
    return true
  }

  // All good until here, let's search :
  let searchItemArray = inputSearchString.split(' ')
  // For the user search input to "pass" for this ceramObject,
  // each (every) single search item would have to return true
  return searchItemArray.every((searchItemSingle) =>
    isSearchItemSingleFound(searchItemSingle, ceramObject)
  )
}

// this function is launched for each search item, to check if it passes with current ceramObject
// (searchItemSingle is expected to be lower case)
function isSearchItemSingleFound(searchItemSingle, ceramObject) {
  const searchItemSingleSplit = searchItemSingle.split(':')

  // Search without key will hit fields: Identification, Pi, Description and Corpus:
  if (searchItemSingleSplit.length === 1) {
    const searchItemValue = searchItemSingleSplit[0]

    const isValueContainedInIdentification = ceramObject['Identification']
      ?.toLowerCase()
      .includes(searchItemValue)

    const isValueContainedInForme = ceramObject['Forme']?.toLowerCase().includes(searchItemValue)

    const isValueEqualsPi = ceramObject['Pi'] === searchItemValue

    const isValueContainedInDescription = ceramObject['Description']
      ?.toLowerCase()
      .includes(searchItemValue)

    const isValueEqualsCollection = ceramObject['Corpus']?.toLowerCase().includes(searchItemValue)

    return (
      isValueContainedInIdentification ||
      isValueContainedInForme ||
      isValueEqualsPi ||
      isValueContainedInDescription ||
      isValueEqualsCollection
    )
  }
  // Search with key :
  // (More than 2 elements would mean that there was 2 or more colons in the searchItemSingle.
  // In this case we will just not consider everything after the second colon)
  else if (searchItemSingleSplit.length >= 2) {
    const searchItemValue = searchItemSingleSplit[1]
    let searchItemKey = searchItemSingleSplit[0]
    searchItemKey = mapToRealKeyName(searchItemKey)

    if (!ceramObject[searchItemKey]) {
      return false
    }

    return ceramObject[searchItemKey].toLowerCase().includes(searchItemValue)
  }

  return true
}
// When clicking sector select items with equivalent  secteur_ID
export function searchCeramByClick(featureLayerCeram, markerClusterGroupCeram, map, layer) {
  map.removeLayer(markerClusterGroupCeram)
  markerClusterGroupCeram.clearLayers()
  let value = layer.feature.properties.secteur_ID
  featureLayerCeram.clearLayers()
  fetch(import.meta.env.VITE_API_URL + 'index.php?CERAM')
    .then((response) => response.json())
    .then((data) => {
      featureLayerCeram.addData(data)
      featureLayerCeram.eachLayer(function (layer) {
        if (layer.feature.properties['secteur_ID'] == value) {
          setCeramLayer(layer)
          markerClusterGroupCeram.addLayer(layer)
        }
      })
    })

  map.addLayer(markerClusterGroupCeram)
}
