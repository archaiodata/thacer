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
      <div v-else-if="loadingStatus === 'not_found'">
        <div class="alert alert-warning" role="alert">Cet élément n'a pas été trouvé</div>
      </div>
      <div v-else>
        <div class="zotero-entries">
          <h2>Sources</h2>
          <p>
            Les céramiques répertoriées dans ThaCER sont celles publiées par les principaux
            collaborateurs du projet. A cet ensemble s'ajoutent de façon systématique l'intégralité
            du catalogue des publications suivantes. La mise à jour de ces références est liée à
            l'évolution de la collection Zotero "ThaCER".
          </p>
          <a href="https://www.zotero.org/groups/5022130/thacer/library"
            >https://www.zotero.org/groups/5022130/thacer/library</a
          >
          <h3>Publications intégrées :</h3>
          <ul>
            <li v-for="entry in biblioViewed" :key="entry.key">
              <p>
                {{ entry.data.creators?.[0].firstName }} {{ entry.data.creators?.[0].lastName }}
                <i>{{ entry.data.title }}</i
                >,
                {{ entry.data.date }}
              </p>
            </li>
          </ul>
          <h3>Publications en cours d'intégration :</h3>
          <ul>
            <li v-for="entry in biblioToView" :key="entry.key">
              <p>
                {{ entry.data.creators?.[0].firstName }} {{ entry.data.creators?.[0].lastName }}
                <i>{{ entry.data.title }}</i
                >,
                {{ entry.data.date }}
              </p>
            </li>
          </ul>
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
      biblioViewed: null,
      biblioToView: null
    }
  },

  mounted() {
    fetch('https://api.zotero.org/groups/5022130/collections/QK8TC6JE/items')
      .then((response) => response.json())
      .then((biblioViewed) => {
        this.biblioViewed = biblioViewed.sort((a, b) => {
          if (a.data.creators?.[0].lastName < b.data.creators?.[0].lastName) {
            return -1
          }
        })

        this.loadingStatus = 'loaded'
        console.log(biblioViewed)
      })

      .catch((error) => {
        console.error(error)
        this.loadingStatus = 'error'
      })

    fetch('https://api.zotero.org/groups/5022130/collections/JVX4B9VP/items')
      .then((response) => response.json())
      .then((biblioToView) => {
        this.biblioToView = biblioToView.sort((a, b) => {
          if (a.data.creators?.[0].lastName < b.data.creators?.[0].lastName) {
            return -1
          }
        })

        this.loadingStatus = 'loaded'
        console.log(biblioToView)
      })

      .catch((error) => {
        console.error(error)
        this.loadingStatus = 'error'
      })
  },
  methods: {}
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
