<template>
    <div class="wrapper">
    <h2>Registration</h2>
    <form @submit.prevent="submit" action="#">
      <div class="input-box">
        <input name="name" type="text" v-model="form.name" placeholder="Enter your name" aria-label="name" required>
      </div>
      <div class="input-box"> 
        <input name="email" type="text" v-model="form.email" placeholder="Enter your email" aria-label="email" required>
        <p v-if="errors.emailInvalid" style="color: red;">Invalid email format!</p>
      </div>
      <div class="input-box">
        <input name="pass" type="password" v-model="form.pass" placeholder="Create password" aria-label="pass" required>
      </div>
      <div class="input-box">
        <input name="repass" type="password" v-model="form.rePass" placeholder="Confirm password" aria-label="re-pass" required>
      </div>
      <div class="policy">
        <input name="check" aria-label="check" v-model="form.check" type="checkbox" required>
        <h3>I accept all terms & condition</h3>
      </div>
      <div class="input-box button">
        <button id="submit" name="submit">Register Now</button>
      </div>
      <div class="text">
        <h3>Already have an account? <router-link to="/login">Login now</router-link></h3>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: 'SignUp',
  data() {
    return {
        form: {
            name: '',
            email: '',
            pass: '',
            rePass: '',
        },
        errors: {
            passwordMismatch: false,
            emailInvalid: false
        }
    }
  },
  methods: {
    validateEmail(email) {
        // Regex kiểm tra email hợp lệ
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    },
    async submit(event) {
        if (event) event.preventDefault(); // Chặn hành vi mặc định
        
        // Kiểm tra password và rePass có giống nhau không
        if (this.form.pass !== this.form.rePass) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match!',
            });
            return; // Dừng việc gửi request nếu không trùng khớp
        }
        if (!this.validateEmail(this.form.email)) {
            this.errors.emailInvalid = true;
            return;
        } else {
            this.errors.emailInvalid = false;
        }

        console.log(this.form);
        let userItem = {
            name: this.form.name,
            email: this.form.email,
            pass: this.form.pass,
            rePass: this.form.rePass,
        };

        try {
            let result = await axios.post('http://localhost:3000/users', userItem);
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Register successfully',
                    timer: 2000
                });

                // Reset form sau khi đăng ký thành công
                this.form = {
                    name: '',
                    email: '',
                    pass: '',
                    rePass: '',
                };
                setTimeout(() => {
                    this.$router.push({ name: 'Home' });
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Register failed',
                });
            }
            console.log(result);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong!',
            });
            console.error(error);
        }
    }
  }
}
</script>