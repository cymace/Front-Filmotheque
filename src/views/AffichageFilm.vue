<script setup>
// imports des dépendances
import { ref, onMounted } from 'vue'

/**
 *  Déclaration du modèle
 *  les variables que l'on initialise avec ref() vont être placées dans notre modèle
 *  => on va pouvoir y accéder dans notre template via {{nom_variable}}
 */ 
const listeFilm = ref([]) // on initialise la liste de films à afficher avec []

/**
 * onMounted() : est appelé automatiquement au chargement de la page.
 * C'est là qu'on va chercher les genres avec une requête d'API etqu'on met à jour notre modèle 
 */
onMounted(() => {
  // on délègue le traitement dans un autre méthode qui va être appelée également après l'ajout du genre
  loadFilms();
})



/**
 *  loadFilms() : méthode asynchrone qui va chercher les films avec une requête d'API etqu'on met à jour notre modèle 
 */
async function loadFilms(){
  // 1 - requête d'API avec axios pour recupérer les genres 
  // (le prefixe "http://localhost:8080/api/") a déjà été défini dans main.js
  const result = await axios.get("films");

  // 2- Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeFilm.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
}
</script>

<template>
  <main>
    <h1>Affichage des films</h1>

	
	<table class="table">
		<thead>
			<tr>
				<th>Titre</th>
				<th>Date de sortie</th>
				<th>Genre</th>
				<th>Duree</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="film in listeFilm">
				<td>{{film.titre}}</td>
				<td>{{film.dateSortie}}</td>
				<td>{{film.genre.libelle}}</td>
				<td>{{film.duree}}</td>
				<td><a href="#">détail</a></td>
			</tr>
		</tbody>
	</table>
  </main>
</template>
