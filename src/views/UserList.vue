<template>
  <div>
    <h2>User List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <div v-if="editingUserId !== user.id">
              {{ user.names }} {{ user.lastname }}
            </div>
            <div v-else>
              <input type="text" v-model="editingUser.names" placeholder="Name" />
              <input type="text" v-model="editingUser.lastname" placeholder="Lastname" />
            </div>
          </td>

          <td>
            <div v-if="editingUserId !== user.id">
              {{ user.email }}
            </div>
            <div v-else>
              <input type="email" v-model="editingUser.email" placeholder="Email" />
            </div>
          </td>

          <td>
            <div v-if="editingUserId !== user.id">
              {{ user.rol }}
            </div>
            <div v-else>
              <span>{{ user.rol }}</span> <!-- Role is displayed but not editable -->
            </div>
          </td>

          <td>
            <button v-if="editingUserId !== user.id" @click="editUser(user)">
              Edit
            </button>
            <button v-if="editingUserId === user.id" @click="saveUser(user.id)">
              Save
            </button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: [], // Lista de usuarios
      editingUserId: null, // ID del usuario que está siendo editado
      editingUser: {
        id: null,
        names: '',
        lastname: '',
        email: '',
        rol: '' // Aquí puedes agregar el rol si es necesario
      }
    };
  },
  methods: {
    // Cargar los usuarios al montar el componente
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5079/api/user');
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // Iniciar la edición de un usuario
    editUser(user) {
      this.editingUserId = user.id;
      this.editingUser = { ...user }; // Copiar los datos del usuario a 'editingUser'
    },

    // Guardar los cambios del usuario
    async saveUser(userId) {
      try {
        const response = await axios.put(`http://localhost:5079/api/user/${userId}`, this.editingUser);
        this.users = this.users.map(user => (user.id === userId ? response.data : user)); // Actualizar la lista de usuarios
        this.editingUserId = null;
      } catch (error) {
        console.error("Error saving user:", error);
      }
    },

    // Eliminar un usuario
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:5079/api/user/${userId}`);
        this.users = this.users.filter(user => user.id !== userId); // Eliminar usuario de la lista
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  },
  mounted() {
    this.fetchUsers(); // Cargar los usuarios cuando se monte el componente
  }
};
</script>
