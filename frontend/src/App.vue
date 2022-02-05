<template>
  <div class="container-fluid">
    <div class="p-3 row flex-xl-nowrap  cnav">
      <div class="ml-5 col-1 title">ContentApp</div>
      <div  class="offset-lg-9 offset-sm-7 offset-4 col-lg-1 col-sm-2 col-3">
        <button type="button" @click="()=>this.$router.push('/login')" class="btn btn-primary">Login</button>
      </div>
      <div  class="col-lg-1 col-sm-2 col-4">
        <button type="button" @click="()=>this.$router.push('/signup')" class="btn btn-primary">Sign Up</button>
      </div>
      <!-- <div v-else class="offset-lg-10 offset-sm-9 offset-8 col-lg-1 col-sm-2 col-3">
        <button type="button" @click="removeToken" class="btn btn-primary">Logout</button>
      </div> -->
    </div>
    <div class="App row mr-0">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return{
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    removeToken(){
      localStorage.removeItem('token');
      this.$router.push('/login');
      this.$router.go();
    }
  }
};
</script>

<style></style>
