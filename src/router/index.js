import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactForm from '@/components/ContactForm.vue'
import ContactDetails from '../views/ContactDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: ContactForm,
    props: { isCreating: true, isEditing: false }
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: ContactForm,
    props: { isCreating: false, isEditing: true }
  },
  {
    path: '/detalhes/:id',
    name: 'detalhes',
    component: ContactDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
