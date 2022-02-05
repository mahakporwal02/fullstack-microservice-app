<template>
  <div class="row">
    <div class="offset-xl-4 offset-lg-3 offset-2 col-xl-4 col-lg-6 col-8">
      <div class="form-box">
        <form @submit.prevent="login">
          <h3>Login</h3>
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
            @click="login"
            class="btn btn-dark btn-lg btn-block"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'login',
  data() {
    return {};
  },
  methods: {
    login() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      axios
        .post('http://localhost:3000/users/login', { email, password })
        .then((response) => {
          localStorage.setItem('token', response.data.user_token);
          const path = `/content`;
          if (this.$route.path !== path) {
            this.$router.push(path);
          }
        });
    },
  },
};
</script>
