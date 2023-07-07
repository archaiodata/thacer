<template>
  <main>
    <section class="p-5 bg-body-secondary">
      <div v-if="loadingStatus === 'loading'" class="text-center">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading data...</span>
        </div>
      </div>
      <div v-else-if="loadingStatus === 'error'">
        <div class="alert alert-danger" role="alert">Erreur de chargement</div>
      </div>
      <div v-else>
        <div class="zotero-entries">
          <h2>Corpus intégrés et bibliographie</h2>
          <p>
            Le programme a pour objectif de référencer les céramiques publiées découvertes sur le
            sol de Thasos. L'intégration des céramique est organisée par corpus qui correspondent
            généralement au catalogue d'une publication.
          </p>
          <p>
            Les exemplaires de chaque corpus peuvent être recherchés en entrant le nom du corpus
            ci-dessous en gras dans la barre de recherche.
          </p>
          <p>
            La bibliographie est maintenue à jour collaborativement sur Zoter par le groupe
            "ThaCER".
            <a href="https://www.zotero.org/groups/5022130/thacer/library"
              >www.zotero.org/groups/5022130/thacer/library</a
            >
          </p>
          <h3>Corpus intégrés :</h3>

          <div v-for="entry in biblioZotero" :key="entry.key">
            <div v-if="entry.data.collections == 'QK8TC6JE'">
              <strong>{{ entry.data.shortTitle }}</strong> {{ entry.data.creators?.[0].firstName }}
              {{ entry.data.creators?.[0].lastName }} <i>{{ entry.data.title }}</i
              >,
              {{ entry.data.date }}
              <p>{{ entry.data.abstractNote }}</p>
            </div>
          </div>

          <h3>En cours d'intégration :</h3>
          <div v-for="entry in biblioZotero" :key="entry.key">
            <div v-if="entry.data.collections == 'JVX4B9VP'">
              <strong>{{ entry.data.shortTitle }}</strong> {{ entry.data.creators?.[0].firstName }}
              {{ entry.data.creators?.[0].lastName }} <i>{{ entry.data.title }}</i
              >,
              {{ entry.data.date }}
              <p>{{ entry.data.abstractNote }}</p>
            </div>
          </div>
          <h3>Bibliographie :</h3>
          <iframe
            src="https://api.zotero.org/groups/5022130/items?format=bib"
            width="100%"
            height="450"
            frameborder="0"
          >
          </iframe>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'TheBiblio',
  components: {},
  data() {
    return {
      loadingStatus: 'loading',
      biblioZotero: null
    }
  },

  mounted() {
    fetch('https://api.zotero.org/groups/5022130/items')
      .then((response) => response.json())
      .then((biblioZotero) => {
        this.biblioZotero = biblioZotero.sort((a, b) => {
          if (a.data.shortTitle < b.data.shortTitle) {
            return -1
          }
        })

        this.loadingStatus = 'loaded'
      })

      .catch((error) => {
        console.error(error)
        this.loadingStatus = 'error'
      })
  }
}
</script>

<style scoped>
.zotero-entries ul {
  list-style-type: none;
}
p,
a {
  padding-left: 32px;
}
h3 {
  margin-top: 1em;
}
</style>
