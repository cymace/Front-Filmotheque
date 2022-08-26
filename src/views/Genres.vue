<script setup>
// imports des dépendances
import { ref, onMounted } from 'vue'

/**
 *  Déclaration du modèle
 *  les variables que l'on initialise avec ref() vont être placées dans notre modèle
 *  => on va pouvoir y accéder dans notre template via {{nom_variable}}
 */ 
const libelle = ref(""); // on initialise le libelle de notre <input> à ""
const listeGenre = ref([]) // on initialise la liste de genre à afficher avec []

/**
 * onMounted() : est appelé automatiquement au chargement de la page.
 * C'est là qu'on va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
onMounted(() => {
  // on délègue le traitement dans un autre méthode qui va être appelée également après l'ajout du genre
  loadGenres();
})

/**
 *  addGenre() : méthode asynchrone qui va créer un genre avec une requête d'API 
 */
async function addGenre(){

  // le corps de notre requête HTTP (format JSON) doit contenir un libelle
  //  qui a pour valeur la valeur (.value) de notre variable de modèle : libelle
  const body = {
    libelle: libelle.value
  }
  // On envoie une requête POST sur l'url BASE_URL + "genres" avec les données définies plus haut
  await axios.post("genres", body);

  // ensuite, on recharge la liste des genres 
  loadGenres();
  libelle.value = ""; // on clean l'input
}

/**
 *  loadGenres() : méthode asynchrone qui va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
async function loadGenres(){
  // 1 - requête d'API avec axios pour recupérer les genres 
  // (le prefixe "http://localhost:8080/api/") a déjà été défini dans main.js
  const result = await axios.get("genres");

  // 2- Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeGenre.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
}
</script>

<template>
  <main>
    <h1>Gestion des genres</h1>

    <!-- 
      on garde le <form> parce que syntaxiquement parlant c'est plus correct 
      on pourrait mettre un <div> à la place ca ne changerait rien -->	
	<form>
		<section class="form-element">
		<label for="libelle">Libelle : </label>
			<!-- v-model=libelle permet d'associer le champ input à la variable "libelle" de notre modèle (avec une valeur ref())-->
			<input id="libelle" type="text" v-model="libelle"/>
		</section>
    <!-- 
      pour pas qu'on valide le formulaire, ne pas oublier type="button" 
      @click="addGenre" : va appeler la méthode addGenre() de notre JS
    -->
		<button type="button" @click="addGenre" >Validation</button>
	</form>
	
	<h2>Liste des genres</h2>
	
  <!-- pour faire une boucle en VueJs : on utilise v-for : https://vuejs.org/guide/essentials/list.html -->
	<ul>
    <!-- syntaxe Vuejs équivalente à : th:each ="genre : ${listeGenre} en thymeleaf" -->
		<li v-for="genre in listeGenre">
        id: {{genre.id}}, libelle : {{genre.libelle}}
		</li>
	</ul>
  </main>
</template>
