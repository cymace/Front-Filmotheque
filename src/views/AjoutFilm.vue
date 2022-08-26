<script setup>
// imports des dépendances
import { ref, onMounted } from 'vue'

/**
 *  Déclaration du modèle
 *  les variables que l'on initialise avec ref() vont être placées dans notre modèle
 *  => on va pouvoir y accéder dans notre template via {{nom_variable}}
 * 
 * Il va falloir qu'on déclare toutes les variables qu'on utilise avec v-model dans le template
 */
const titre = ref("")
const dateSortie = ref()
const duree = ref()
const synopsis = ref("")
const genre = ref()
const realisateur = ref()
const acteurs = ref()

// il va falloir aussi qu'on déclare les listes dont on se sert dans nos <select>
const listeGenres = ref([])
const listeParticipants = ref([])



/**
 * onMounted() : est appelé automatiquement au chargement de la page.
 * C'est là qu'on va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
onMounted(() => {
  // Au chargement de la page, on recupère la liste des genres/participants pour remplir le modèle
  loadGenres();
  loadParticipants();
})

/**
 *  addGenre() : méthode asynchrone qui va créer un film avec une requête d'API 
 */
async function addFilm() {

  // le corps de notre requête HTTP (format JSON) doit contenir un libelle
  //  qui a pour valeur la valeur (.value) de notre variable de modèle : libelle
  const body = {
    titre: titre.value,
    dateSortie: dateSortie.value,
    duree: duree.value,
    synopsis: synopsis.value,
    genre: genre.value,
    realisateur: realisateur.value,
    acteurs: acteurs.value
  }

  // On envoie une requête POST sur l'url BASE_URL + "genres" avec les données définies plus haut
  await axios.post("films", body);

  // ensuite, on redirige sur l'écran qui liste les films
  this.$router.push("/")
}

/**
 *  loadGenres() : méthode asynchrone qui va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
async function loadGenres() {
  // 1 - requête d'API avec axios pour recupérer les genres 
  // (le prefixe "http://localhost:8080/api/") a déjà été défini dans main.js
  const result = await axios.get("genres");

  // 2- Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeGenres.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
}

/**
 *  loadParticipants() : méthode asynchrone qui va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
async function loadParticipants() {
  // 1 - requête d'API avec axios pour recupérer les participants 
  // (le prefixe "http://localhost:8080/api/") a déjà été défini dans main.js
  const result = await axios.get("participants");

  // 2- Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeParticipants.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
}
</script>

<template>
  <main>
    <h1>Ajout d'un film</h1>

    <!-- 
      on garde le <form> parce que syntaxiquement parlant c'est plus correct 
      on pourrait mettre un <div> à la place ca ne changerait rien -->
    <form>
      <section class="form-element">
        <label for="titre">titre : </label>
        <!-- v-model=titre permet d'associer le champ input à la variable "titre" de notre modèle (avec une valeur ref())-->
        <input id="titre" type="text" v-model="titre" />
      </section>

      <section class="form-element">
        <label for="dateSortie">Date de sortie : </label>
        <input type="date" id="dateSortie" v-model="dateSortie" />
      </section>

      <section class="form-element">
        <label for="duree">Duree : </label>
        <input id="duree" type="number" v-model="duree" />
      </section>

      <section class="form-element">
        <label for="synopsis">Synopsis : </label>
        <textarea id="synopsis" v-model="synopsis" cols="30" rows="10"></textarea>
      </section>

      <!--  Genre -->
      <section class="form-element">
        <label for="genre">Genre : </label>
        <select id="genre" v-model="genre">

          <!-- je génère ma liste des genres à partir de mon modèle -->
          <!-- on utilise :value="genre" à la place de th:value="${genre.id}" -->
          <option v-for="genre in listeGenres" :value="genre">{{ genre.libelle }}</option>
        </select>
      </section>

      <!--  Realisateur -->
      <section class="form-element">
        <label for="realisateur">Realisateur : </label>
        <select id="realisateur" v-model="realisateur">

          <!-- je génère ma liste des realisateurs à partir de mon modèle -->
          <!-- on ne peut pas mettre un v-for ET un v-if dans la même balise => faut passer par un composant wrapper (template) -->
          <template v-for="participant in listeParticipants">
            <!-- je mets un v-if pour n'afficher que les realisateurs -->
            <option v-if="participant.realisateur" :value="participant">
              {{ participant.prenom }} {{ participant.nom }}
            </option>
          </template>
        </select>
      </section>

      <!--  Liste des acteurs -->
      <section class="form-element">
        <label for="realisateur">Acteurs : </label>
        <select id="realisateur" v-model="acteurs" multiple>
          <!-- je génère ma liste des realisateurs à partir de mon modèle -->
          <!-- on ne peut pas mettre un v-for ET un v-if dans la même balise => faut passer par un composant wrapper (template) -->
          <template v-for="participant in listeParticipants">
            <!-- je mets un v-if pour n'afficher que les realisateurs -->
            <option v-if="participant.acteur" :value="participant">
              {{ participant.prenom }} {{ participant.nom }}
            </option>
          </template>

        </select>
      </section>
      <!-- 
      pour pas qu'on valide le formulaire, ne pas oublier type="button" 
      @click="addFilm" : va appeler la méthode addFilm() de notre JS
    -->
      <button type="button" @click="addFilm">Validation</button>
    </form>
  </main>
</template>

