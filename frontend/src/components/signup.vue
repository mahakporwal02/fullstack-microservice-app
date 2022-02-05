<template>
  <div class="row">
    <div class="offset-xl-4 offset-lg-3 offset-2 col-xl-4 col-lg-6 col-8">
      <div class="form-box">
        <form @submit.prevent="register">
          <h3>Sign Up</h3>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              id="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              class="form-control form-control-lg"
            />
          </div>
          <br />
          <button
            type="submit"
            @click="register"
            class="btn btn-dark btn-lg btn-block"
          >
            Sign Up
          </button>
          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'login' }">sign in?</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'signup',
  methods: {
    register() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      axios
        .post('http://localhost:3000/users/register', { email, password })
        .then((response) =>
          localStorage.setItem('token', response.data.user_token),
        );
      this.$router.push('/content')
    },
  },
};
</script>
