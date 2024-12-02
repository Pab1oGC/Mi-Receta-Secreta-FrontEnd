<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="credentials.email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="credentials.password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <li><router-link to="/create-user">Create User</router-link></li>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5079/api/auth/login', {
          email: this.credentials.email,
          password: this.credentials.password,
        });

        // Guarda el token en el localStorage
        localStorage.setItem('token', response.data.token);

        // Redirige al Home después del login exitoso
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        alert('Invalid email or password.');
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input {
  margin-bottom: 10px;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>