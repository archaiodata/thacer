import { isObject, notifyProgrammaticError } from '@/assets/js/utils.js'
import { setCeramLayer } from '@/assets/js/thacer-map-create-layer'
import { mapToRealKeyName } from '@/assets/js/key-mapping'

export function setupSearchCeramByText(markerClusterGroupCeram, map) {
  const filterInput = document.getElementById('filter-input')
  filterInput.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) {
      return
    }
    if (!e.target.value) {
      // Clear filter on submitting an empty field
      document.getElementById('nonloc').innerHTML = []
      markerClusterGroupCeram.clearLayers()
      return
    }

    const inputSearchString = e.target.value.trim().toLowerCase()
    // Try sector-name search first; if handled, do not run the generic text search
    handleSectorNameSearch(inputSearchString, markerClusterGroupCeram, map).then((handled) => {
      if (handled) return
      performCeramTextSearch(inputSearchString, markerClusterGroupCeram, map)
    })
  })

  // Sector-specific search box
  const sectorInput = document.getElementById('filter-sector')
  if (sectorInput) {
    sectorInput.addEventListener('keyup', (e) => {
      if (e.keyCode !== 13) return
      const q = e.target.value ? e.target.value.trim().toLowerCase() : ''
      if (!q) {
        // clear results
        document.getElementById('nonloc').innerHTML = []
        markerClusterGroupCeram.clearLayers()
        return
      }
      // Directly handle sector search (no fallback)
      handleSectorNameSearch(q, markerClusterGroupCeram, map)
    })
  }
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
      ?.toString()
      .includes(searchItemValue)

    const isValueContainedInForme = ceramObject['Forme']?.toLowerCase().includes(searchItemValue)

    const isValueEqualsPi = ceramObject['Pi']?.toString().includes(searchItemValue)

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

    return ceramObject[searchItemKey].toString().toLowerCase().includes(searchItemValue)
  }

  return true
}

// When clicking sector select items with equivalent  secteur_ID
export function searchCeramByClick(featureLayerCeram, markerClusterGroupCeram, map, layer) {
  map.removeLayer(markerClusterGroupCeram)
  markerClusterGroupCeram.clearLayers()
  let value = layer.feature.properties.secteur_ID
  featureLayerCeram.clearLayers()

  // Récupérer les données depuis le sessionStorage
  const data = JSON.parse(sessionStorage.getItem('ceramData'))

  // Filtrer les données pour inclure uniquement celles correspondant à secteur_ID === value
  const filteredData = {
    ...data,
    features: data.features.filter((feature) => feature.properties['secteur_ID'] === value)
  }

  // Ajouter les données filtrées à la couche Leaflet
  featureLayerCeram.addData(filteredData)

  // Appliquer les configurations supplémentaires sur les couches
  featureLayerCeram.eachLayer(function (layer) {
    setCeramLayer(layer)
    markerClusterGroupCeram.addLayer(layer)
  })

  // Appliquer le design personnalisé aux marqueurs
  designMarkersCeram(markerClusterGroupCeram)

  map.addLayer(markerClusterGroupCeram)
}

export function designMarkersCeram(layer) {
  layer.eachLayer(function (marker) {
    let identifier
    const feature = marker.feature

    if (feature.properties.ID) {
      identifier = feature.properties.ID
    }

    marker.setIcon(
      L.divIcon({
        html: identifier,
        className: 'ceram-marker',
        iconSize: 'auto'
      })
    )
  })
}

// ---- Helpers for sector-name search and original text search ----
// Perform the original ceram text search (extracted for reuse)
function performCeramTextSearch(inputSearchString, markerClusterGroupCeram, map) {
  // Récupérer les données depuis le cache
  const cachedData = JSON.parse(sessionStorage.getItem('ceramData'))

  // Traiter les objets non localisés
  document.getElementById('nonloc').innerHTML = []
  document.getElementById('loading-unlocalised').classList.remove('d-none')

  Object.keys(cachedData.features).forEach((k) => {
    let obj = cachedData.features[k]

    // Ajouter les objets céramiques seulement s'ils ne sont pas localisés et passent le filtre
    if (
      obj.geometry.coordinates[0] === 0 &&
      doesCeramObjectPassesInputSearchString(obj.properties, inputSearchString)
    ) {
      let label = obj.properties.Pi ? 'Π' + obj.properties.Pi : obj.properties.ID

      document.getElementById('nonloc').innerHTML +=
        '<a class="unlocalised-tag px-1 m-0 border border-white" href="#/ceram?ID=' +
        obj.properties.ID +
        '">' +
        label +
        '</a>'
    }
  })

  document.getElementById('loading-unlocalised').classList.add('d-none')

  // Traiter les objets localisés
  markerClusterGroupCeram.clearLayers()
  document.getElementById('loading-localised').classList.remove('d-none')

  const geojsonLayer = L.geoJSON(cachedData, {
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
  designMarkersCeram(markerClusterGroupCeram)
}

// Load secteurs geojson once (cached in module variable)
let _sectorsCache = null
// Layer used to highlight matched sectors (so we can remove it between searches)
let _sectorHighlightLayer = null
async function loadSectors() {
  if (_sectorsCache) return _sectorsCache
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + 'geojson/secteurs.geojson')
    if (!res.ok) return null
    const data = await res.json()
    _sectorsCache = data
    return data
  } catch (e) {
    console.error('Failed to load secteurs.geojson', e)
    return null
  }
}

// If input matches sector titles, show ceram entries in those sectors.
// Returns true if handled (i.e. sector-match found and displayed), false otherwise.
async function handleSectorNameSearch(inputSearchString, markerClusterGroupCeram, map) {
  if (!inputSearchString || inputSearchString.length < 2) return false
  const sectors = await loadSectors()
  if (!sectors || !sectors.features) return false

  const q = inputSearchString.toLowerCase()
  const matched = sectors.features.filter((f) => (f.properties?.Titre || '').toLowerCase().includes(q))
  if (!matched || matched.length === 0) return false

  // get secteur_ID values
  const ids = matched.map((m) => m.properties?.secteur_ID).filter((v) => v !== undefined)
  if (ids.length === 0) return false

  // Now filter ceramData by secteur_ID in ids
  const data = JSON.parse(sessionStorage.getItem('ceramData'))
  if (!data) return false

  const filteredData = {
    ...data,
    features: data.features.filter((feature) => ids.includes(feature.properties['secteur_ID']))
  }

  // Show non-localised matching entries
  document.getElementById('nonloc').innerHTML = []
  document.getElementById('loading-unlocalised').classList.remove('d-none')
  filteredData.features.forEach((f) => {
    if (f.geometry && f.geometry.coordinates && f.geometry.coordinates[0] === 0) {
      const label = f.properties.Pi ? 'Π' + f.properties.Pi : f.properties.ID
      document.getElementById('nonloc').innerHTML +=
        '<a class="unlocalised-tag px-1 m-0 border border-white" href="#/ceram?ID=' + f.properties.ID + '">' +
        label +
        '</a>'
    }
  })
  document.getElementById('loading-unlocalised').classList.add('d-none')

  // Show localized ones
  const featureLayer = L.geoJSON(filteredData, {
    onEachFeature: (feature, layer) => {
      setCeramLayer(layer)
    }
  })

  markerClusterGroupCeram.clearLayers()
  markerClusterGroupCeram.addLayer(featureLayer)
  map.addLayer(markerClusterGroupCeram)
  designMarkersCeram(markerClusterGroupCeram)

  // Highlight matched sectors on the map and open their popup(s).
  // Remove previous highlight layer if present.
  if (_sectorHighlightLayer) {
    try {
      map.removeLayer(_sectorHighlightLayer)
    } catch (e) {
      /* ignore */
    }
    _sectorHighlightLayer = null
  }

  try {
    _sectorHighlightLayer = L.geoJSON(matched, {
      style: options => ({ color: '#ff7800', weight: 2, fillOpacity: 0.05 }),
      onEachFeature: function (feature, layer) {
        const title = feature.properties?.Titre || 'Secteur'
        const sid = feature.properties?.Référenc || ''
        const ref = feature.properties?.Référenc || ''
        const popupHtml = `<strong>${title}</strong>${sid ? '<br/>' + ref : ''}`
        layer.bindPopup(popupHtml)
      }
    })
    _sectorHighlightLayer.addTo(map)
    // open popups for all added sector layers
    _sectorHighlightLayer.eachLayer(function (lyr) {
      try {
        lyr.openPopup()
      } catch (e) {
        /* ignore */
      }
    })
    // Fit map to the bounds of matched sectors (with padding).
    try {
      const bounds = _sectorHighlightLayer.getBounds()
      if (bounds && bounds.isValid && bounds.isValid()) {
        // limit max zoom when fitting to small areas
        const currentMaxZoom = map.getMaxZoom ? map.getMaxZoom() : 20
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: Math.min(18, currentMaxZoom) })
      }
    } catch (e) {
      console.debug('Could not fit bounds to matched sectors', e)
    }
  } catch (e) {
    console.debug('Failed to render sector highlight', e)
  }

  return true
}
