<template>
  <!--  TODO ? <meta name="description"-->
  <!--  content="THASIAN, THASOS, GREEK, POTTERY, ANTIQUITY, ARCHAIC, CLASSICAL, HELLENISTIC, ROMAN">-->

  <!--  TODO ? <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>-->
  <!--  chart js?-->

  <main role="main">
    <TheCeramicText></TheCeramicText>

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
import TheCeramicText from '@/components/TheCeramicText.vue'

export default {
  name: 'TheCeramic',
  components: { TheCeramicText }
}
</script>

<style scoped></style>