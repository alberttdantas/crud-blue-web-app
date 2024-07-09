<template>
  <div class="card">
    <h2>Detalhes do Contato</h2>
    <form class="p-fluid">
      <div class="p-field">
        <label for="name">Nome:</label>
        <PrimeInputText id="name" v-model="contact.name" disabled />
      </div>
      <div class="p-field">
        <label for="email">Email:</label>
        <PrimeInputText id="email" v-model="contact.email" disabled />
      </div>
      <div class="p-field">
        <label for="phone">Telefone:</label>
        <PrimeInputText id="phone" v-model="contact.phone" disabled />
      </div>
      <div class="p-field">
        <label for="status">Situação:</label>
        <PrimeInputText id="status" :value="contact.active ? 'Ativo' : 'Inativo'" disabled />
      </div>
      <div class="p-field btn-box">
        <PrimeButton label="Inativar Usuário" class="base-button warning-button" @click="inactivateContact" />
        <PrimeButton label="Voltar" class="base-button secondary-button" @click="goBack" />
      </div>
    </form>
    <div :class="{ 'is-visible': errorMessage }" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'ContactDetails',
  components: {},
  data() {
    return {
      contact: {
        id: null,
        name: '',
        email: '',
        phone: '',
        active: true
      },
      errorMessage: ''
    };
  },
  methods: {
    async fetchContactData(id) {
      try {
        const response = await api.getContactById(id);
        this.contact = response.data.data;
      } catch (error) {
        this.errorMessage = 'Erro ao buscar dados do contato.';
      }
    },
    async inactivateContact() {
      try {
        const data = { active: false };
        await api.inactivateContact(this.contact.id, data);
        this.contact.active = false;
        this.goBack();
      } catch (error) {
        this.errorMessage = 'Erro ao inativar contato. Por favor, tente novamente.';
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
  }
}
</script>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>