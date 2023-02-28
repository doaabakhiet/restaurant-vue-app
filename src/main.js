import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faTrash,faPenToSquare,faBars,faUser,faArrowRightFromBracket,faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook ,faTwitter,faInstagram,faYoutube} from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faTrash,faPenToSquare,faBars,faUser,faArrowRightFromBracket,faPlus,faFacebook ,faTwitter,faInstagram,faYoutube)

import './assets/app.scss'

createApp(App).use(store).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
// createApp(App).use(store).use(router).mount("#app");
