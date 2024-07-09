import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

//PrimeVue CSS imports
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema padrão
import 'primevue/resources/primevue.min.css'; // CSS principal
import 'primeicons/primeicons.css'; // Ícones
import Dialog from 'primevue/dialog';


const app = createApp(App);

// Uso do PrimeVue
app.use(PrimeVue);

// Registro global de componentes do PrimeVue
app.component('PrimeButton', Button);
app.component('PrimeCard', Card);
app.component('PrimeInputText', InputText);
app.component('PrimeDialog', Dialog);

// Uso do router
app.use(router);

app.mount('#app');
