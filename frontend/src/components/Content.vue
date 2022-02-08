<template>
  <div class="vue-tempalte">
    <div class="accordion mt-5 offset-sm-2 col-sm-8" role="tablist">
      <b-card
        no-body
        v-for="content in contents"
        :key="content.title"
        class="mb-2"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            v-b-toggle="content.title.replace(/\s/g, '_')"
            variant="primary"
            >{{ content.title }}</b-button
          >
          <img v-if="content.is_liked"
            src="../assets/like.png"
            width="40px"
            style=" margin-left: 30px"
            class="like"
            @click="likeContent(content.title)"
            alt="like"
          />
          <img v-else
            src="../assets/unlike.png"
            width="40px"
            style=" margin-left: 30px"
            class="like"
            @click="likeContent(content.title)"
            alt="like"
          />
          {{ content.likes }}
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
            <b-card-text>{{ content.date_published }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Content',
  data() {
    return {
      token: localStorage.getItem('token'),
      contents: [],
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
          for(let content of this.contents){
              content.date_published = new Date(content.date_published).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
          }
        });
    },
    likeContent(title) {
      axios
        .put('http://localhost:3000/likes/update', {title}, {
          headers: {
            'x-auth-token': this.token,
          },
        })
        .then((response) => {
          let title = response.data.title;
          for (let book of this.contents){
            if(book.title === title) {
              book.likes= response.data.likes;
              book.is_liked = response.data.is_liked; 
            }
          }
          this.contents.sort((a,b)=>{
            return b.likes - a.likes;
          })
        });
    },
  },
  mounted: function () {
    if(localStorage.getItem('token')){
      this.getContent();
    } else {
      this.$router.push('/login')
    }
  },
};
</script>
