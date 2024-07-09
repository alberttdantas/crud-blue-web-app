<template>
  <div>
    <div class="search-box">
      <label for="search">Procurar:</label>
      <PrimeInputText id="search" v-model="searchQuery" @input="filterContacts" placeholder="Consultar contato" />
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact.id">
          <td>
            <i v-if="contact.active" class="pi pi-check status-icon active"></i>
            <i v-else class="pi pi-times status-icon inactive"></i>
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.email }}</td>
          <td>
            <div class="btn-box">
              <PrimeButton class="base-button warning-button" @click="editContact(contact.id)">Editar</PrimeButton>
              <PrimeButton class="p-button-info" @click="viewDetails(contact.id)">Detalhes</PrimeButton>
              <PrimeButton class="p-button-danger" @click="openDeleteDialog(contact)">Excluir</PrimeButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PrimeDialog v-model:visible="deleteDialogVisible" modal class="confirmation-dialog">
      <h3>Confirmação de Exclusão</h3>
      <div class="dialog-content">
        <p>Deseja excluir o contato:</p>
        <p><strong>{{ contactNameToDelete }}</strong></p>
        <p>Email: <strong>{{ contactEmailToDelete }}</strong></p>
      </div>
      <div class="dialog-footer">
        <PrimeButton label="Sim" class="p-button-danger" @click="confirmDelete" />
        <PrimeButton label="Não" class="p-button-outlined" @click="cancelDelete" />
      </div>
    </PrimeDialog>
  </div>
</template>
<script>
// @ is an alias to /src
import api from '@/services/api';
import PrimeDialog from 'primevue/dialog';
import PrimeButton from 'primevue/button';

export default {
  name: 'HomeView',
  components: {
    PrimeButton,
    PrimeDialog
  },

  data() {
    return {
      searchQuery: '',
      contacts: [],
      filteredContacts: [],
      deleteDialogVisible: false,
      contactToDelete: null,
      contactNameToDelete: '',
      contactEmailToDelete: ''
    };
  },

  created() {
    this.fetchContacts();
  },
  methods: {
    openDeleteDialog(contact) {
      this.contactToDelete = contact.id;
      this.contactNameToDelete = contact.name;
      this.contactEmailToDelete = contact.email;
      this.deleteDialogVisible = true;
    },
    async confirmDelete() {
      if (this.contactToDelete) {
        try {
          await api.deleteContact(this.contactToDelete);
          this.fetchContacts();
          this.deleteDialogVisible = false;
        } catch (error) {
          console.error('Erro ao excluir o contato:', error);
        }
      }
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    filterContacts() {
      if (this.searchQuery) {
        this.filteredContacts = this.contacts.filter(contact => {
          return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        this.filteredContacts = this.contacts;
      }
    },
    async fetchContacts() {
      try {
        const response = await api.getAllContacts();
        this.contacts = response.data.data;
        this.filteredContacts = this.contacts;
      } catch (error) {
        this.errorMessage = 'Não foi possível carregar os contatos.';
      }
    },
    editContact(id) {
      this.$router.push({ name: 'editar', params: { id } });
    },
    viewDetails(id) {
      this.$router.push({ name: 'detalhes', params: { id } });
    },
    deleteContact(contactId) {
      this.contactToDelete = contactId;
      this.deleteDialogVisible = true;
    },
  }
}
</script>

<style>
.status-icon {
  font-size: 1.0rem;
}

.search-box {
  margin-bottom: 0.5rem;
}

.active {
  color: green;
}

.inactive {
  color: red;
}

[v-cloak] {
  display: none;
}

.confirmation-dialog h3 {
  color: #495057;
  text-align: center;
  margin-bottom: 1rem;
}

.dialog-content {
  text-align: center;
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.p-button-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.p-button-outlined {
  border: 1px solid #dee2e6;
  color: #495057;
}
</style>
