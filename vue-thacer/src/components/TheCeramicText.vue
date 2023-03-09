<template>
  <section class="jumbotron py-2 m-0 text-left">
    <!-- 	formulaire alimenté par js -->
  </section>
</template>

<script>
export default {
  name: 'TheCeramicText',
  mounted() {
    // lecture du fichier ceram et selection de l'exemplaire
    // let requestURL = 'API/geojson/ceram.geojson';
    let requestURL = import.meta.env.VITE_API_URL + '/geojson/ceram.geojson'
    let request = new XMLHttpRequest()
    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()

    request.onload = function () {
      const ceram = request.response
      showCeram(ceram)
    }

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const ID = urlParams.get('ID')
    const ANA = urlParams.get('ANA')
    const section = document.querySelector('section')

    function showCeram(jsonObj) {
      const features = jsonObj['features']

      for (let i = 0; i < features.length; i++) {
        if (features[i].properties.ID == ID) {
          const myArticle = document.createElement('div')
          myArticle.setAttribute('class', 'container')
          // const myH1 = document.createElement('h1');
          // myH1.setAttribute('class', 'text-uppercase');
          const myH2 = document.createElement('h2')
          const myPara1 = document.createElement('p')
          myPara1.setAttribute('class', 'lead text-muted')
          const myPara2 = document.createElement('p')
          const myPara3 = document.createElement('p')
          const myPara4 = document.createElement('p')

          const myList = document.createElement('ul')

          myH2.textContent = features[i].properties.Identification

          //Para 1 = inventaires
          if (features[i].properties.Pi !== null) {
            myPara1.textContent = features[i].properties.Pi + 'Π'
          }
          if (features[i].properties.Inv_Fouille !== null) {
            myPara1.textContent = myPara1.textContent + ' ' + features[i].properties.Inv_Fouille
          }
          if (features[i].properties.Num_Analyse !== null) {
            myPara1.textContent =
              myPara1.textContent + ' - échantillon : ' + features[i].properties.Num_Analyse
          }
          //Para 2 = famille, catégorie, type
          if (features[i].properties.Famille !== null) {
            myPara2.textContent = 'Famille : ' + features[i].properties.Famille
          }
          if (features[i].properties.Catégorie !== null) {
            myPara2.textContent =
              myPara2.textContent + ' Catégorie : ' + features[i].properties.Catégorie
          }
          if (features[i].properties.Type !== null) {
            myPara2.textContent = myPara2.textContent + ' type : ' + features[i].properties.Type
          }
          //Para 3 = description
          myPara3.textContent = 'Description : ' + features[i].properties.Description

          //Para 4 = biblio
          if (features[i].properties.Biblio !== null) {
            myPara4.textContent =
              myPara4.textContent + ' Publication : ' + features[i].properties.Biblio
          }
          //Archimage
          if (features[i].properties.Archimage !== null) {
            ArchimageImg.src =
              'https://archimage.efa.gr/action.php?kroute=image_preview_public&id=' +
              features[i].properties.Archimage +
              '&type=2&ext=.jpg'
          }
          if (features[i].properties.Archimage !== null) {
            var src =
              'https://archimage.efa.gr/?kroute=fiche_publique&id=' +
              features[i].properties.Archimage
            var a = $('<a>').attr('href', src).attr('target', '_blank')

            $('#ArchimageImg').wrap(a)
          }

          if (features[i].properties.Pi !== null) {
            ArchimageTxt.textContent = 'Π' + features[i].properties.Pi
          }
          myArticle.appendChild(myH2)
          myArticle.appendChild(myPara1)
          myArticle.appendChild(myPara2)
          myArticle.appendChild(myPara3)
          myArticle.appendChild(myPara4)
          myArticle.appendChild(myList)
          section.appendChild(myArticle)
        }
      }
    }
  }
}
</script>

<style scoped></style>