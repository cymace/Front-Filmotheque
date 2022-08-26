import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// en ajoutant axios à l'objet "window", on le rend disponible dans tous nos composants
window.axios = axios.create({ baseURL: 'http://localhost:8080/api/' });

/*
* On ajoute un interceptor avant nos requêtes
* Il va chercher le Json Web Token qu'on a stocké dans le localstorage après Login
* ET va rajouter une entête Authorization : Bearer <<valeur_token>> à chaque requête HTTP
* => cela va nous permettre de s'authentifier pour l'API sur les requêtes POST notamment
*/
window.axios.interceptors.request.use(
    request => {
        const jwt = localStorage.getItem("jwt");
        console.log("jwt", jwt);
        if (jwt != null) {
            request.headers['Authorization'] = `Bearer ${jwt}`
        }
        return request;
    }
);

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
