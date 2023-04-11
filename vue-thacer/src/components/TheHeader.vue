<template>
  <header>
    <div id="navbarHeader" class="collapse bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">Céramique à Thasos: manuel, analyses et tessonnier en ligne</h4>
            <p class="text-secondary">
              Ce projet englobe l’étude transversale et la valorisation du corpus des céramiques à
              Thasos. Il a trois objectifs :<br />
              1 la publication d’un manuel de référence à destination des chercheurs et
              étudiants.<br />
              2 la création d’un tessonnier de référence au musée de Thasos.<br />
              3 la publication d'une version en ligne du tessonnier.
            </p>
            <a href="/biblio" class="text-white">Sources bibliographiques</a>
          </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <p class="text-secondary">Une remarque? une question? Contactez nous</p>
            <h4 class="text-white">Contacts</h4>
            <p class="text-secondary">Une remarque? une question? Contactez nous</p>
            <p class="text-secondary">
              Jean-Sébastien Gros - Jacky Kozlowski - Martin Perron (Parks Canada / Maison de
              l'Orient et de la Méditerranée)
            </p>
            <ul class="list-unstyled">
              <li>
                <a href="mailto:thacer@archaiodata.com" class="text-white"
                  >ThaCER@archaiodata.com</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="navbar navbar-dark bg-dark shadow-sm my-0">
      <div class="container-fluid">
        <router-link to="/" href="#" class="navbar-brand d-flex align-items-center py-0">
          <img src="@/assets/images/ThaCER.svg" class="img-fluid" alt="Responsive image" />
          <strong>THACER</strong>
        </router-link>

        <!-- Bootstrap toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <!-- Bootstrap's "i" icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-info"
            viewBox="0 0 16 16"
          >
            <path
              d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
.navbar img {
  height: 30px;
  margin-right: 20px;
}

.navbar strong {
  letter-spacing: 1.25em;
  font-size: 1.5em;
  line-height: 1px;
}
</style>
