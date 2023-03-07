export function setupSearchCeramByText(markersCeram, map, ceram) {
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

export function searchCeramByClick(ceram, markersCeram, map, layer) {
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
