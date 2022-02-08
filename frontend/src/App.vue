<template>
  <div class="container-fluid">
    <div class="p-3 row flex-xl-nowrap cnav">
      <div class="ml-5 col-1 title">Books</div>
      <div
        v-if="!this.token"
        class="offset-lg-9 offset-sm-7 offset-3 col-lg-1 col-sm-2 col-3"
      >
        <button
          type="button"
          @click="
            () => {
              if (this.$route.path != '/login') {
                this.$router.push('/login');
              }
            }
          "
          class="btn btn-primary"
        >
          Login
        </button>
      </div>
      <div v-if="!this.token" class="col-lg-1 col-sm-2 col-4">
        <button
          type="button"
          @click="
            () => {
              if (this.$route.path != '/signup') {
                this.$router.push('/signup');
              }
            }
          "
          class="btn btn-primary"
        >
          Sign Up
        </button>
      </div>
      <div
        v-if="this.token"
        class="offset-lg-9 offset-sm-7 offset-2 col-lg-1 col-sm-2 col-4"
      >
        <input
          id="fileUpload"
          type="file"
          @change="fileUpload($event)"
          hidden
        />

        <button class="btn btn-primary" @click="chooseFiles()">Upload</button>
      </div>
      <div v-if="this.token" class="col-lg-1 col-sm-2 col-4">
        <button type="button" @click="removeToken" class="btn btn-primary">
          Logout
        </button>
      </div>
    </div>
    <div class="App row mr-0">
      <router-view :key="count" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  components: {},
  data() {
    return {
      token: localStorage.getItem('token'),
      file: '',
      count: 0,
    };
  },
  methods: {
    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
      if (this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      axios
        .post('/single-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function () {
          this.$router.push('/content');
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.submitFile();
    },
    chooseFiles() {
      document.getElementById('fileUpload').click();
    },
    fileUpload(event) {
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      axios
        .post('http://localhost:3001/content/ingest', formData, {
          headers: {
            'x-auth-token': this.token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.count++;
          document.getElementById('fileUpload').value = null;
        });
    },
  },
  watch: {
    '$route': function () {
      this.token = localStorage.getItem('token');
    },
  },
};
</script>

<style></style>
