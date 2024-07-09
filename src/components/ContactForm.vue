<template>
  <div class="card">
    <h2>{{ isCreating ? 'Cadastrar Novo Contato' : 'Editar Contato' }}</h2>
    <form class="p-fluid" @submit.prevent="handleSubmit">
      <div class="input_box">
        <label for="name">Nome:</label>
        <PrimeInputText v-model="contact.name" id="name" type="text" placeholder="Insira o nome" required />
      </div>
      <div class="input_box">
        <label for="email">Email:</label>
        <PrimeInputText v-model="contact.email" id="email" type="email" placeholder="Insira o email" required />
      </div>
      <div class="input_box">
        <label for="phone">Telefone:</label>
        <PrimeInputText v-mask="'(##) #####-####'" v-model="contact.phone" id="phone" type="tel"
          placeholder="Insira o telefone" required />
      </div>
      <div class="btn-box">
        <PrimeButton type="submit" class="base-button action-button">{{ isCreating ? 'Cadastrar' : 'Salvar Alterações'
          }}</PrimeButton>
        <PrimeButton class="base-button secondary-button" @click="goBack" type="button">Voltar</PrimeButton>
      </div>
    </form>
    <div :class="{ 'is-visible': errorMessage }" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import api from '@/services/api';
import { mask } from 'vue-the-mask';

export default {
  name: 'ContactForm',
  directives: {
    mask
  },
  props: {
    formTitle: String,
    btnAction: String,
    contactData: Object,
    isEditing: {
      type: Boolean,
      default: false
    },
    isCreating: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contact: {
        id: null,
        name: '',
        email: '',
        phone: '',
        active: true,
      },
      errorMessage: ''
    };
  },
  computed: {
    isFormValid() {
      return this.contact.name && this.contact.email && this.contact.phone;
    }
  },
  methods: {
    async fetchContactData(id) {
      try {
        const response = await api.getAllContacts();
        const contact = response.data.data.find(c => c.id === parseInt(id));
        if (contact) {
          this.contact = { ...contact };
        } else {
          this.errorMessage = 'Contato não encontrado para o id: ' + id;
        }
      } catch (error) {
        this.errorMessage = 'Erro ao buscar dados do contato.';
      }
    },
    async createContact() {
      try {
        await api.createContact(this.contact);
        this.goBack();
      } catch (error) {
        this.errorMessage = 'Erro ao criar contato. Por favor, tente novamente.';
      }
    },
    async updateContact() {
      try {
        await api.updateContact(this.contact.id, this.contact);
        this.goBack();
      } catch (error) {
        this.errorMessage = 'Erro ao atualizar contato. Por favor, tente novamente.';
      }
    },
    handleSubmit() {
      if (this.isEditing) {
        this.updateContact();
      } else {
        this.createContact();
      }
    },
    goBack() {
      this.$router.push('/');
    },
    showError(message) {
      this.errorMessage = message;
    },
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchContactData(id);
    }
  },
}
</script>

<style scoped>
.input_box input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.input_box label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
