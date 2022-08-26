<script setup>
// imports des dépendances
import { ref, onMounted } from 'vue'

/**
 *  Déclaration du modèle
 *  les variables que l'on initialise avec ref() vont être placées dans notre modèle
 *  => on va pouvoir y accéder dans notre template via {{nom_variable}}
 */
const pseudo = ref("");
const password = ref("")
const messageConfirmation = ref("")


/**
 *  login() : méthode asynchrone qui va créer un genre avec une requête d'API 
 */
async function login() {

  // le corps de notre requête HTTP (format JSON) doit contenir un libelle
  const body = {
    pseudo: pseudo.value,
    password: password.value,
  }
  
  // On envoie une requête POST sur l'url BASE_URL + “login" avec les données définies plus haut
const result = await axios.post("login", body);

// on sauvegarde le token recuperé  dans le localstorage
localStorage.setItem('jwt', result.data);

 // on peut "cleaner" les input et mettre un petit message de confirmation
 pseudo.value = "";
 password.value = ""
messageConfirmation.value="Vous êtes désormais connecté"

}


</script>

<template>
  <main>
    <h1>Login</h1>

 
<p class="confirmation">
  {{messageConfirmation}}
</p> 

    <!-- 
      on garde le <form> parce que syntaxiquement parlant c'est plus correct 
      on pourrait mettre un <div> à la place ca ne changerait rien -->
    <form>
      <section class="form-element">
        <label for="pseudo">pseudo : </label>
        <!-- v-model=pseudo permet d'associer le champ input à la variable "pseudo" de notre modèle (avec une valeur ref())-->
        <input id="pseudo" type="text" v-model="pseudo" />
      </section>

      <section class="form-element">
        <label for="password">password : </label>
        <!-- v-model=password permet d'associer le champ input à la variable "password" de notre modèle (avec une valeur ref())-->
        <input id="password" type="text" v-model="password" />
      </section>
      <!-- 
      pour pas qu'on valide le formulaire, ne pas oublier type="button" 
      @click="login" : va appeler la méthode login() de notre JS
    -->
      <button type="button" @click="login">Validation</button>
    </form>
  </main>
</template>
