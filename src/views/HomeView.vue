<template>
  <div class="home-container">
    <h1>Welcome to the User My Secret Recipe</h1>
    
    <!-- Navbar -->
    <nav class="navbar">
      <ul>
        <li><router-link to="/create-user">Create User</router-link></li>
        <li><router-link to="/users">User List</router-link></li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="logout-container">
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Elimina el token del localStorage
      localStorage.removeItem('token');

      // Redirige al Login
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.home-container {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
}

.navbar {
  margin-top: 20px;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 5px;
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.navbar ul li {
  margin-right: 20px;
}

.navbar ul li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar ul li a:hover {
  background-color: #34495e;
}

.logout-container {
  margin-top: 30px;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #4caf50;
}
</style>
