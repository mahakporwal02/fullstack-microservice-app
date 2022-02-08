<template>
  <div class="password-changer box-shadow">
    
    <label for="new">Email Address</label>
    <input :type="email" required v-model="email" name="email" />
    <label for="new">Password</label>
    <input :type="passwordType" required v-model="password" name="new" />
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
      <li v-bind:class="{ checked: isAtLeast8 }">
        <i v-if="!isAtLeast8">&#10008;</i>
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
    </ul>
    <button
      @click="register"
      v-bind:class="{ disabled: !isValid, btnSubmit: true }"
    >
      Save password
    </button>
    <p class="forgot-password text-right">
      Already registered
      <router-link :to="{ name: 'login' }">sign in?</router-link>
    </p>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'PasswordValidator',
  data() {
    return {
      password: '',
      passwordType: 'password',
      passwordModelold: '',
      passwordTypeold: 'password',
    };
  },
  computed: {
    isInitial() {
      return this.password.length < 3;
    },
    isShort() {
      return this.password.length >= 3 && !this.isAtLeast8;
    },
    isWeak() {
      return this.isAtLeast8 && (!this.isSpecial || !this.isCapital);
    },
    isFair() {
      return this.isAtLeast8 && this.isSpecial && this.isCapital;
    },
    isExcellent() {
      return this.password.length >= 12 && this.isSpecial && this.isCapital;
    },
    isValid() {
      return this.isFair || this.isExcellent;
    },
    isCapital() {
      const regex = /[A-Z]/g;
      return this.password.match(regex);
    },
    isAtLeast8() {
      return this.password.length >= 10;
    },
    isSpecial() {
      const regex = /[^A-Za-z0-9]/g;
      return this.password.match(regex);
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
  methods: {
    showPassword() {
      this.passwordType =
        this.passwordType === 'password' ? 'text' : 'password';
    },
    showPasswordold() {
      this.passwordTypeold =
        this.passwordTypeold === 'password' ? 'text' : 'password';
    },
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
        });
    },
  },
};
</script>
<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.password-changer {
  font-family: 'Open Sans', sans-serif;
  background-color: white;
  border-radius: 5px;
  width: 90%;
  margin: 15px auto;
  padding: 15px;
  text-align: left;
}
.password-changer label,
.password-changer input,
.password-changer button {
  display: block;
}
.password-changer .btnSubmit {
  height: 30px;
  border: none;
  background: deepskyblue;
  color: white;
  font-family: 'Open Sans', sans-serif;
  padding: 5px 30px;
  box-sizing: content-box;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}
.password-changer .disabled {
  opacity: 0.5;
}
.password-changer input {
  border: none;
  width: 100%;
  border-bottom: 2px solid lightgrey;
  margin: 20px auto 8px;
  position: relative;
  padding-bottom: 10px;
  box-sizing: border-box;
  transition: 0.3s;
  font-size: 16px;
}
.password-changer input:focus {
  outline: none;
  border-bottom: 2px solid deepskyblue;
}
.password-changer label {
  margin: 0px;
  font-size: 0.8em;
  font-weight: bold;
}
.password-changer .show-box {
  align-self: flex-end;
  height: 30px;
  opacity: 0.5;
}
.password-changer .show-box button {
  float: right;
  background: none;
  border: none;
  cursor: pointer;
}
.password-changer .show-box button:focus {
  outline: none;
}
.password-changer ul li {
  list-style: none;
}
.password-changer ul li i {
  margin-left: -15px;
  margin-right: 15px;
}
.password-changer ul .checked {
  color: deepskyblue;
}
.password-changer .short {
  color: #ff4136;
}
.password-changer .weak {
  color: orange;
}
.password-changer .fair {
  color: deepskyblue;
}
.password-changer .excellent {
  color: limegreen;
}
.password-changer .rg-bar {
  background-color: lightgray;
  width: 100%;
  margin-top: 10px;
  height: 8px;
  border-radius: 2px;
}
.password-changer .rg-bar .highlight {
  height: 100%;
  transition: 0.5s;
  width: 5%;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: gray;
}
.password-changer .rg-bar .bgShort {
  background-color: #ff4136;
  width: 15%;
}
.password-changer .rg-bar .bgWeak {
  background-color: orange;
  width: 40%;
}
.password-changer .rg-bar .bgFair {
  background-color: deepskyblue;
  width: 60%;
}
.password-changer .rg-bar .bgExcellent {
  background-color: limegreen;
  width: 100%;
}
</style>
