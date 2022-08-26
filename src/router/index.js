import { createRouter, createWebHistory } from 'vue-router'


/**
 * Router
 * C'est ici que l'on défini les routes de notre applications
 * Ces routes sont réferencées dans notre template principal App.vue :
 *      <li><RouterLink to="/">Liste des films</RouterLink></li>
 *      <li><RouterLink to="/ajoutFilm">Créer Film</RouterLink></li>
 *      <li><RouterLink to="/participants">Participants</RouterLink></li>
 *      <li><RouterLink to="/genres">Genres</RouterLink></li>
 *      <li><RouterLink to="/membres">Membres</RouterLink></li>
 * 
 * Chaque route va correspondre à un composant VueJs .vue
 * 
 * 
**/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // @ : réference la racine de notre application (pratique pour les liens absolus)
      component: () => import('@/views/AffichageFilm.vue')
    },
    {
      path: '/ajoutFilm',
      component: () => import('@/views/AjoutFilm.vue')
    },
    {
      path: '/participants',
      component: () => import('@/views/Participants.vue')
    },
    {
      path: '/genres',
      component: () => import('@/views/Genres.vue')
    },
    {
      path: '/membres',
      component: () => import('@/views/Membres.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router
