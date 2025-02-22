<template>
    <div class="wrapper">
    <h2>Login</h2>
    <form @submit.prevent="Login" action="#">
      <div class="input-box"> 
        <input name="email" type="text" v-model="form.email"  placeholder="Enter your email" aria-label="email" required>
        
      </div>
      <div class="input-box">
        <input name="pass" type="password" v-model="form.password" placeholder="Create password" aria-label="pass" required>
      </div>
      <p style="color: red;">{{msgError}}</p>
      <div class="input-box button">
        <button id="submit" name="submit">Login Now</button>
      </div>
      <div class="text">
        <h3>Don't have an account? <router-link to="/sign-up">Register Now</router-link></h3>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      msgError: '',
    };
  },
  methods: {
    ...mapMutations(['setAuth', 'setUser']), // Thêm mapMutations từ Vuex

    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    },

    async Login(event) {
      if (event) event.preventDefault();

      if (!this.form.email || !this.form.password) {
        this.msgError = 'Please enter email and password!';
        return;
      }

      if (!this.validateEmail(this.form.email)) {
        this.msgError = 'Invalid email format!';
        return;
      }

      try {
        let result = await axios.get(`http://localhost:3000/users?email=${this.form.email}`);

        if (result.status === 200 && result.data.length > 0) {
          let user = result.data[0];

          if (user.pass === this.form.password) {
            // ✅ Lưu thông tin user vào Vuex & localStorage
            this.setUser(user);
            this.setAuth(true);
            localStorage.setItem('userLogin', JSON.stringify(user));

            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Login successfully',
              timer: 2000
            });

            // ✅ Chuyển hướng về Home
            this.$router.push('/');
          } else {
            this.msgError = 'Invalid email or password!';
          }
        } else {
          this.msgError = 'Invalid email or password!';
        }
      } catch (error) {
        console.error('Error:', error);
        this.msgError = 'Something went wrong!';
      }
    }
  }
}
</script>
