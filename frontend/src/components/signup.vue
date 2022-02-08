<template>
  <div class="row">
    <div class="offset-xl-4 offset-lg-3 offset-1 col-xl-4 col-lg-6 col-11">
      <div class="form-box">
        <form @submit.prevent="register">
          <h3 style="font-size: 50px; margin-left: 30px">SignUp</h3>
          <div class="password-changer box-shadow">
            <label for="EMAIL">Email Address</label>
            <input
              type="email"
              required
              id="email"
              v-model="email"
              name="EMAIL"
            />
            <ul class="support-text">
              <li v-bind:class="{ checked: validId }">
                <i v-if="!validId">&#10008;</i>
                <i v-else>&#10004;</i>
                Enter valid Email Id
              </li>
            </ul>
            <label for="new">Password</label>
            <input
              :type="passwordType"
              required
              id="password"
              v-model="password"
              name="new"
            />
            <div class="show-box">
              <button @click="showPassword">Show</button>
            </div>
            <label for="strength"
              >Strength<span v-if="!isInitial">: </span>
              <span
                v-bind:class="{
                  initial: isInitial,
                  short: isShort,
                  weak: isWeak,
                  fair: isFair,
                  excellent: isExcellent,
                }"
                >{{ passwordStregnth }}</span
              >
            </label>
            <div class="rg-bar">
              <div
                v-bind:class="{
                  highlight: true,
                  initial: isInitial,
                  bgShort: isShort,
                  bgWeak: isWeak,
                  bgFair: isFair,
                  bgExcellent: isExcellent,
                }"
              ></div>
            </div>
            <p class="support-text">Your password must:</p>
            <ul class="support-text">
              <li v-bind:class="{ checked: isAtLeast10 }">
                <i v-if="!isAtLeast10">&#10008;</i>
                <i v-else>&#10004;</i>
                Be at least 10 characters long
              </li>
              <li v-bind:class="{ checked: isSpecial }">
                <i v-if="!isSpecial">&#10008;</i>
                <i v-else>&#10004;</i>
                <i class="fas fa-check"></i> Contain a special character
              </li>
              <li v-bind:class="{ checked: isCapital }">
                <i v-if="!isCapital">&#10008;</i>
                <i v-else>&#10004;</i>
                <i class="fas fa-check"></i> Contain a capital letter
              </li>
              <li v-bind:class="{ checked: isLower }">
                <i v-if="!isLower">&#10008;</i>
                <i v-else>&#10004;</i>
                <i class="fas fa-check"></i> Contain a lower case letter
              </li>
              <li v-bind:class="{ checked: isNumeric }">
                <i v-if="!isNumeric">&#10008;</i>
                <i v-else>&#10004;</i>
                <i class="fas fa-check"></i> Contain a number
              </li>
            </ul>
            <button
              v-bind:class="{ disabled: !isValid, btnSubmit: true }"
            >
              Sign Up
            </button>
            <p class="forgot-password text-right">
              Already registered
              <router-link :to="{ name: 'login' }">sign in?</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'signup',
  computed: {
    isInitial() {
      return this.password.length < 3;
    },
    isShort() {
      return this.password.length >= 3 && !this.isAtLeast10;
    },
    isWeak() {
      return this.isAtLeast10 && (!this.isSpecial || !this.isCapital || this.isLower || this.isNumeric);
    },
    isFair() {
      return this.isAtLeast10 && this.isSpecial && this.isCapital && this.isLower && this.isNumeric;
    },
    isExcellent() {
      return this.password.length >= 12 && this.isSpecial && this.isCapital && this.isLower && this.isNumeric;
    },
    isValid() {
      return this.isFair || this.isExcellent;
    },
    isCapital() {
      const regex = /[A-Z]/g;
      return this.password.match(regex);
    },
    isAtLeast10() {
      return this.password.length >= 10;
    },
    isSpecial() {
      const regex = /[^A-Za-z0-9]/g;
      return this.password.match(regex);
    },
    isNumeric() {
      const regex = /[0-9]/g;
      return this.password.match(regex);
    },
    isLower() {
      const regex = /[a-z]/g;
      return this.password.match(regex);
    },
    validId() {
      /* eslint-disable no-useless-escape */
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return this.email.match(regex);
    },
    passwordStregnth() {
      let msg = '';
      msg = this.isShort ? 'Very Weak' : msg;
      msg = this.isWeak ? 'Weak' : msg;
      msg = this.isFair ? 'Fair' : msg;
      msg = this.isExcellent ? 'Strong' : msg;
      return msg;
    },
  },
  data() {
    return {
      email: '',
      password: '',
      passwordType: 'password',
      passwordModelold: '',
      passwordTypeold: 'password',
    };
  },
  methods: {
    register() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      axios
        .post('http://localhost:3000/users/register', { email, password })
        .then((response) => {
          localStorage.setItem('token', response.data.user_token);
          if (this.$route.path !== '/content') {
            this.$router.push('/content');
          }
        }).catch((err)=>{
          this.$vToastify.error(err, "Email Id already exist"); 
        });
    },
    showPassword() {
      this.passwordType =
        this.passwordType === 'password' ? 'text' : 'password';
    },
    showPasswordold() {
      this.passwordTypeold =
        this.passwordTypeold === 'password' ? 'text' : 'password';
    },
  },
};
</script>
