<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <!-- RouterLink : à utiliser pour les liens INTERNES
             va se transformer en <a href="">  -->
        <li><RouterLink to="/">Liste des films</RouterLink></li>
        <li><RouterLink to="/ajoutFilm">Créer Film</RouterLink></li>
        <li><RouterLink to="/participants">Participants</RouterLink></li>
        <li><RouterLink to="/genres">Genres</RouterLink></li>
        <li><RouterLink to="/membres">Membres</RouterLink></li>
        <li><RouterLink to="/login">Login</RouterLink></li>
      </nav>
  </header>

  <!-- RouterView est remplacé par la vue "courante" -->
  <RouterView />
</template>
