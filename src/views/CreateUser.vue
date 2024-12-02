<template>
  <div>
    <h2>Create User</h2>
    <form @submit.prevent="createUser">
      <div>
        <label for="names">Names</label>
        <input v-model="user.names" type="text" id="names" placeholder="Enter name" required />
        <span v-if="errors.names">{{ errors.names }}</span>
      </div>
      
      <div>
        <label for="lastname">Lastname</label>
        <input v-model="user.lastname" type="text" id="lastname" placeholder="Enter lastname" required />
        <span v-if="errors.lastname">{{ errors.lastname }}</span>
      </div>

      <div>
        <label for="email">Email</label>
        <input v-model="user.email" type="email" id="email" placeholder="Enter email" required />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div>
        <label for="password">Password</label>
        <input v-model="user.password" type="password" id="password" placeholder="Enter password" required />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>

      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        names: '',
        lastname: '',
        email: '',
        password: '',
        rol: 'client', 
        createdBy: 1,  
      },
      errors: {},
    };
  },
  methods: {
    async createUser() {
      this.errors = {}; 
     
      if (!this.validateForm()) return;

      try {
        const response = await axios.post('http://localhost:5079/api/user/create', this.user);
        alert(response.data.message); 
      } catch (error) {
        if (error.response && error.response.data.errors) {
        
          this.errors = error.response.data.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {});
        } else if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    },
    
    validateForm() {
      let isValid = true;
      

      if (!this.user.names.match(/^[a-zA-Z\s]+$/)) {
        this.errors.names = 'Names cannot contain numbers or special characters.';
        isValid = false;
      }
      

      if (!this.user.lastname.match(/^[a-zA-Z\s]+$/)) {
        this.errors.lastname = 'Lastname cannot contain numbers or special characters.';
        isValid = false;
      }
      

      if (!this.user.email) {
        this.errors.email = 'Email is required.';
        isValid = false;
      }
      

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordPattern.test(this.user.password)) {
        this.errors.password = 'Password must contain at least one uppercase letter and one number.';
        isValid = false;
      }


      return isValid;
    },
  },
};
</script>
