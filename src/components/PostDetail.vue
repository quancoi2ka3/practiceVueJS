<template>
    <div class="post-detail">
      <h2>{{ post.title }}</h2>
      <p class="content">{{ post.content }}</p>
      <p class="author">By: {{ post.userName }}</p>
      <p class="created-at">Created At: {{ formatDate(post.createdAt) }}</p>
  
      <button @click="goBack">Back to List</button>
      <button @click="editPost">Edit</button>
      <button @click="deletePost" class="delete-btn">Delete</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        post: {},
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
      formatDate(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleString();
      },
      goBack() {
        this.$router.push('/');
      },
      editPost() {
        this.$router.push(`/edit-post/${this.post.id}`);
      },
      async deletePost() {
        const confirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });
  
        if (confirm.isConfirmed) {
          try {
            await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
            this.goBack();
          } catch (error) {
            console.error('Error deleting post:', error);
            Swal.fire('Error', 'Failed to delete post', 'error');
          }
        }
      }
    },
    mounted() {
      this.fetchPost();
    }
  };
  </script>
  
  <style scoped>
  .post-detail {
    max-width: 700px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 15px;
    border: none;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .delete-btn {
    background-color: red;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  