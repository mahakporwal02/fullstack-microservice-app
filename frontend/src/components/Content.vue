<template>
  <div class="vue-tempalte">
    <div class="accordion mt-5 offset-sm-2 col-sm-8" role="tablist">
      <b-card no-body v-for="content in contents" :key="content.title" class="mb-2">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="content.title.replace(/\s/g, '_')" variant="primary">{{
            content.title
          }}</b-button>
        </b-card-header>
        <b-collapse
          :id="content.title.replace(/\s/g, '_')"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              {{ content.story }}
            </b-card-text>
            <b-card-text>{{ content.story }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
// import login from './Login.vue'
export default {
  name: 'Content',
  // components: {login},
  data() {
    return {
      token: localStorage.getItem('token'),
      contents: [],
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    };
  },
  methods: {
    getContent() {
      axios
        .get('http://localhost:3001/content/getContent', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'x-auth-token': this.token,
          },
        })
        .then((response) => {
          this.contents = response.data.contents;
        });
    },
  },
  mounted: function () {
    this.getContent();
  },
};
</script>
