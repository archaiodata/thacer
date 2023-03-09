<template>
  <div>The Ceramic</div>
  {{ this.$route.query }}

  <!--  <meta name="description"-->
  content="THASIAN, THASOS, GREEK, POTTERY, ANTIQUITY, ARCHAIC, CLASSICAL, HELLENISTIC, ROMAN">
  <!--  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>-->
  chart js?

  <main role="main">
    <section class="jumbotron py-2 m-0 text-left">
      <!-- 	formulaire alimenté par js -->
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <!-- Affichage des photo normales -->
          <!--          <?php-->
          $INV = $_GET['INV']; $dir = 'API/IMAGES/PHOTO/*' . $INV . '[Π_
          -.]*{jpg,jpeg,JPG,gif,png}'; $files = glob($dir, GLOB_BRACE); foreach ($files as $image) {
          $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $image); echo '
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src=" . $image . " alt="..." class="img-thumbnail" />
              <div class="card-body">
                <p class="card-text">' . $INV . '</p>
              </div>
            </div>
          </div>
          '; } if (count($files) == 0) echo "
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <p class="card-text">
                  il n'y a pas de photographie disponible pour cet exemplaire.
                </p>
              </div>
            </div>
          </div>
          "; ?>
        </div>
        <div class="row">
          <!-- Affichage des photo macro -->
          <!--        <?php-->
          $ANA = $_GET['ANA']; $dir = 'API/IMAGES/THA_MACRO_PHOTO/*' . $ANA .
          '*.{jpg,jpeg,JPG,gif,png}'; $files = glob($dir, GLOB_BRACE); foreach ($files as $image) {
          $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $image); echo '
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src=" . $image . " alt="..." class="img-thumbnail" />
              <div class="card-body">
                <p class="card-text">Echantillon : ' . $ANA . '</p>
              </div>
            </div>
          </div>
          '; } if ($ANA == 'null') { echo "
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <p class="card-text">il n'y a pas de macrophoto pour cet exemplaire.</p>
              </div>
            </div>
          </div>
          "; } ?>
        </div>
        <div class="row">
          <!-- Affichage des images de profils -->
          <!--      <?php-->
          $INV = $_GET['INV']; $dir = 'API/IMAGES/Profils/*' . $INV . '[Π_
          -.]*{jpg,jpeg,JPG,gif,png}'; $files = glob($dir, GLOB_BRACE); foreach ($files as $image) {
          $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $image); echo '
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src=" . $image . " alt="..." class="img-thumbnail" />
              <div class="card-body">
                <p class="card-text">' . $INV . '</p>
              </div>
            </div>
          </div>
          '; } if (count($files) == 0) echo "
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <p class="card-text">il n'y a pas de profil disponible pour cet exemplaire.</p>
              </div>
            </div>
          </div>
          "; ?>
        </div>
        <div class="row">
          <!-- Affichage des photo Archimage -->
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img
                id="ArchimageImg"
                src="https://www.efa.gr/images/logo/01archimage.jpg"
                alt="..."
                class="img-thumbnail"
              />
              <div class="card-body">
                <p id="ArchimageTxt" class="card-text">
                  il n'y a pas de photographie Archimage disponible pour cet exemplaire.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Affichage du graphique -->
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        <div class="row">
          <!-- Affichage selecteurs x y -->
          <div class="table-responsive">
            <table class="table table-striped" id="SearchTable">
              <tbody>
                <tr id="tr0" class="condline">
                  <td class="">Thasos analyses XRF</td>
                  <td class="">X :</td>
                  <td class="" id="td_selx">
                    <select
                      onchange="addData(sely.options[sely.selectedIndex].value, this.options[this.selectedIndex].value)"
                      class="form-control"
                      name="selx"
                      id="selx"
                    >
                      <option value="Na2O">Na2O (%)</option>
                      <option value="MgO">MgO (%)</option>
                      <option value="Al2O3">Al2O3 (%)</option>
                      <option value="SiO2">SiO2 (%)</option>
                      <option value="P">P (PPM)</option>
                      <option value="K2O">K2O (%)</option>
                      <option value="CaO">CaO (%)</option>
                      <option value="TiO2">TiO2 (%)</option>
                      <option value="V">V (PPM)</option>
                      <option value="Cr" selected="selected">Cr (PPM)</option>
                      <option value="Mn">Mn (PPM)</option>
                      <option value="Fe2O3">Fe2O3 (%)</option>
                      <option value="Co">Co (PPM)</option>
                      <option value="Ni">Ni (PPM)</option>
                      <option value="Cu">Cu (PPM)</option>
                      <option value="Zn">Zn (PPM)</option>
                      <option value="Rb">Rb (PPM)</option>
                      <option value="Sr">Sr (PPM)</option>
                      <option value="Y">Y (PPM)</option>
                      <option value="Zr">Zr (PPM)</option>
                      <option value="Ba">Ba (PPM)</option>
                      <option value="La">La (PPM)</option>
                      <option value="Ce">Ce (PPM)</option>
                      <option value="Nd">Nd (PPM)</option>
                      <option value="Pb">Pb (PPM)</option>
                      <option value="Th">Th (PPM)</option>
                    </select>
                  </td>
                  <td class="">Y :</td>
                  <td class="condcellval" id="td_sely">
                    <select
                      onchange="addData(this.options[this.selectedIndex].value, selx.options[selx.selectedIndex].value)"
                      class="form-control"
                      name="sely"
                      id="sely"
                    >
                      <option value="Na2O">Na2O (%)</option>
                      <option value="MgO">MgO (%)</option>
                      <option value="Al2O3">Al2O3 (%)</option>
                      <option value="SiO2">SiO2 (%)</option>
                      <option value="P">P (PPM)</option>
                      <option value="K2O">K2O (%)</option>
                      <option value="CaO">CaO (%)</option>
                      <option value="TiO2">TiO2 (%)</option>
                      <option value="V">V (PPM)</option>
                      <option value="Cr">Cr (PPM)</option>
                      <option value="Mn">Mn (PPM)</option>
                      <option value="Fe2O3">Fe2O3 (%)</option>
                      <option value="Co">Co (PPM)</option>
                      <option value="Ni" selected="selected">Ni (PPM)</option>
                      <option value="Cu">Cu (PPM)</option>
                      <option value="Zn">Zn (PPM)</option>
                      <option value="Rb">Rb (PPM)</option>
                      <option value="Sr">Sr (PPM)</option>
                      <option value="Y">Y (PPM)</option>
                      <option value="Zr">Zr (PPM)</option>
                      <option value="Ba">Ba (PPM)</option>
                      <option value="La">La (PPM)</option>
                      <option value="Ce">Ce (PPM)</option>
                      <option value="Nd">Nd (PPM)</option>
                      <option value="Pb">Pb (PPM)</option>
                      <option value="Th">Th (PPM)</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'TheCeramic',
  mounted() {
    console.log(this.$route)
    console.log(this.$route.query)

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