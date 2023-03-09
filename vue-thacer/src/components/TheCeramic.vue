<template>
  <main>
    <TheCeramicText></TheCeramicText>
    <TheCeramicChart></TheCeramicChart>

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
      </div>
    </div>
  </main>
</template>

<script>
import TheCeramicText from '@/components/TheCeramicText.vue'
import TheCeramicChart from '@/components/TheCeramicChart.vue'

export default {
  name: 'TheCeramic',
  components: { TheCeramicText, TheCeramicChart }
}
</script>

<style scoped></style>