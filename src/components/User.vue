<template>
    <div class="user-container">
      <div class="user-header">
        <h2>User Profile</h2>
      </div>
  
      <div class="user-profile-card" v-if="user">
        <div class="user-avatar">
          <img :src="user.avatar || 'default-avatar.png'" :alt="user.name">
        </div>
        <div class="user-info">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label>Name</label>
              <input aria-label="name" v-model="userForm.name" type="text" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input aria-label="email" v-model="userForm.email" type="email" required>
            </div>
            <div class="form-group">
              <label>Password</label>
              <!-- Sử dụng type="password" để bảo mật thông tin -->
              <input aria-label="pass" v-model="userForm.pass" type="tel" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="save-btn">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'UserComponent',
    data() {
      return {
        user: null,
        userForm: {
          id: null,
          name: '',
          email: '',
          pass: '',
          phone: '',
          avatar: ''
        },
        msgError: ''
      }
    },
    created() {
      // Lấy userID từ route params (nếu cần)
      const userID = this.$route.params.id;
      // Lấy dữ liệu user từ localStorage
      const userLogin = localStorage.getItem('userLogin');
      if (userLogin) {
        this.user = JSON.parse(userLogin);
        this.userForm = { ...this.user };
      }
    },
    methods: {
      // Hàm kiểm tra định dạng email
      validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
      },
      async updateUser() {
        // Validation: Kiểm tra các trường bắt buộc không được rỗng
        if (!this.userForm.name || !this.userForm.email || !this.userForm.pass) {
          this.msgError = 'Please fill in all required fields.';
          return;
        }
        // Validation: Kiểm tra định dạng email
        if (!this.validateEmail(this.userForm.email)) {
          this.msgError = 'Invalid email format.';
          return;
        }
        // Nếu có message lỗi hiển thị, reset nó
        this.msgError = '';
  
        try {
          // Giả sử bạn cập nhật user trên server qua PUT request (JSON Server cần id của user)
          const response = await axios.put(`http://localhost:3000/users/${this.userForm.id}`, this.userForm);
          if (response.status === 200) {
            // Cập nhật lại localStorage và state nếu thành công
            localStorage.setItem('userLogin', JSON.stringify(response.data));
            this.user = { ...response.data };
  
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User updated successfully!',
            });
            setTimeout(() => {
                    this.$router.push({ name: 'Home' });
                }, 2000);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update user!',
            });
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the user.',
          });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .user-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 80px;
  }
  
  .user-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .user-header h2 {
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .user-profile-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-avatar {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .user-avatar img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
  
  .form-group input {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .form-group input:focus {
    border-color: #3498db;
    outline: none;
  }
  
  .form-actions {
    text-align: center;
    margin-top: 2rem;
  }
  
  .save-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .save-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .user-container {
      padding: 1rem;
    }
  
    .user-profile-card {
      padding: 1.5rem;
    }
  }
  </style>
  