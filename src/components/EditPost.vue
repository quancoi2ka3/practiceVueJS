<template>
    <div class="edit-post">
      <h2>Edit Post</h2>
      <form @submit.prevent="updatePost">
        <label>Title</label>
        <input aria-label="title" v-model="post.title" type="text" required />
  
        <label>Content</label>
        <textarea v-model="post.content" rows="6" required></textarea>
  
        <div class="form-actions">
          <button type="button" @click="cancelEdit">Cancel</button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        post: {
          id: '',
          title: '',
          content: '',
        },
      };
    },
    methods: {
      async fetchPost() {
        try {
          const postId = this.$route.params.id;
          const response = await axios.get(`http://localhost:3000/posts/${postId}`);
          if (response.status === 200) {
            this.post = response.data;
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
      async updatePost() {
        try {
          await axios.put(`http://localhost:3000/posts/${this.post.id}`, this.post);
          Swal.fire('Success', 'Post updated successfully', 'success');
          this.$router.push('/');
        } catch (error) {
          console.error('Error updating post:', error);
          Swal.fire('Error', 'Failed to update post', 'error');
        }
      },
      cancelEdit() {
        this.$router.push('/');
      }
    },
    mounted() {
      this.fetchPost();
    }
  };
  </script>
  
  <style scoped>
  .edit-post {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  