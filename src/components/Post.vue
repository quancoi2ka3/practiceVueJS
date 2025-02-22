<template>
    <div class="post-container">
      <div class="post-header">
        <h2>Create New Post</h2>
      </div>
  
      <div class="post-form-card">
        <form @submit.prevent="addPost">
          <div class="form-group">
            <label>Title</label>
            <input 
              v-model="postForm.title" 
              type="text" 
              placeholder="Enter post title"
              required
            >
          </div>
  
          <div class="form-group">
            <label>Content</label>
            <textarea 
              v-model="postForm.content" 
              placeholder="Write your post content here..."
              rows="6"
              required
            ></textarea>
          </div>
  
          <div class="form-actions">
            <button type="button" @click="goToList" class="list-btn">
              Go to List
            </button>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'AddPost',
    data() {
      return {
        postForm: {
          title: '',
          content: '',
          userId: '',
          userName: '',
          createdAt: ''
        },
        isSubmitting: false
      }
    },
    created() {
  const userLogin = localStorage.getItem('userLogin');
  if (userLogin) {
    try {
      const parsedUser = JSON.parse(userLogin);
      if (parsedUser.id && parsedUser.name) {
        this.postForm.userId = parsedUser.id;
        this.postForm.userName = parsedUser.name;
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Error parsing userLogin:', error);
      this.redirectToLogin();
    }
  } else {
    this.redirectToLogin();
  }
},
methods: {
  redirectToLogin() {
    Swal.fire({
      icon: 'warning',
      title: 'Not Logged In',
      text: 'Please log in to create a post.'
    }).then(() => {
      this.$router.push('/login');
    });
  }
}
,
    methods: {
      validateForm() {
        // Loại bỏ khoảng trắng thừa
        const title = this.postForm.title.trim();
        const content = this.postForm.content.trim();
  
        if (!title) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Title cannot be empty.'
          });
          return false;
        }
        if (title.length < 5) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Title should be at least 5 characters.'
          });
          return false;
        }
        if (!content) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Content cannot be empty.'
          });
          return false;
        }
        if (content.length < 20) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Content should be at least 20 characters.'
          });
          return false;
        }
        return true;
      },
      async addPost() {
        // Kiểm tra dữ liệu nhập vào trước khi gửi request
        if (!this.validateForm()) return;
        this.isSubmitting = true;
        if (!this.postForm.userName) {
            throw new Error('Missing userName');
        }
        try {
          this.postForm.createdAt = new Date().toISOString();
          const response = await axios.post('http://localhost:3000/posts', this.postForm);
                  
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Post created successfully'
            });
            // Reset form (nếu muốn) và chuyển hướng về danh sách bài viết
            this.postForm.title = '';
            this.postForm.content = '';
            this.goToList();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to create post'
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create post'
          });
        } finally {
          this.isSubmitting = false;
        }
      },
      goToList() {
        this.$router.push({ name: 'Home' });
      }
    }
  }
  </script>
  
  <style scoped>
  .post-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 80px;
  }
  
  .post-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .post-header h2 {
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .post-form-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .submit-btn,
  .list-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .submit-btn {
    background: #3498db;
    color: white;
  }
  
  .list-btn {
    background: #95a5a6;
    color: white;
  }
  
  .submit-btn:hover,
  .list-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .submit-btn:hover {
    background: #2980b9;
  }
  
  .list-btn:hover {
    background: #7f8c8d;
  }
  
  @media (max-width: 768px) {
    .post-container {
      padding: 1rem;
    }
  
    .post-form-card {
      padding: 1.5rem;
    }
  
    .form-actions {
      flex-direction: column-reverse;
    }
  
    .submit-btn,
    .list-btn {
      width: 100%;
    }
  }
  </style>
  