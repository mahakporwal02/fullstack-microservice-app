<template>
  <div class="row">
    <div class="offset-xl-4 offset-lg-3 offset-1 col-xl-4 col-lg-6 col-11">
      <div class="form-box">
        <form @submit.prevent="login">
          <h3 style="font-size:40px">Login</h3>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              v-model="email"
              required
              id="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              required
              v-model="password"
              type="password"
              id="password"
              class="form-control form-control-lg"
            />
          </div>
          <br />
          <button
            :disabled="!isDisabled"
            type="submit"
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
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    isDisabled() {
      return this.email.length && this.password.length;
    },
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
        }).catch((err)=> {
          this.$router.push('/signup')
          this.$vToastify.error(err, "Invalid Credentials"); 
        });
    },
  },

  mounted: function () {
    console.log(this.email);
  },
};
</script>
