<template>
    <div class="header">
        <div class="header-content">
            <h1 class="logo">Post Management</h1>
            <nav class="nav-menu">
                <ul>
                    <li style="padding: 8px 16px;"><router-link to="/add-post" class="nav-link" active-class="active">Post</router-link></li>
                    <li style="padding: 8px 16px;"><router-link :to="'/user/'+ userID" class="nav-link" active-class="active">User</router-link></li>
                    <li style="padding: 8px 16px;"><router-link @click="Logout" to="/login" class="nav-link" active-class="active">Logout</router-link></li>
                    <li class="user-name" >Welcome : <p style="color: greenyellow;">{{ userName }}</p></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            userName:'',
            userID: ''
        }
    },
    created(){
        let userLogin = localStorage.getItem('userLogin');
        this.userName = JSON.parse(userLogin)['name'];
        this.userID = JSON.parse(userLogin)['id'];
    },
    methods: {
        Logout() {
            localStorage.removeItem('userLogin');
            this.$router.push('/login');
        }
    } 
}
</script>

<style scoped>
.header {
    background: linear-gradient(to right, #2c3e50, #3498db);
    padding: 1.2rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: fixed; /* Fix header at the top */
    top: 0;
    left: 0;
    right: 0;
    width: 100%; /* Full width */
    z-index: 1000; /* Ensure header stays on top */
}

.header-content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
}

.logo {
    font-size: 1.8rem;
    margin: 0;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-menu ul {
    list-style: none;
    display: flex;
    gap: 2.5rem;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}


.nav-link:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.nav-link.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
}
.user-name {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}
.user-name:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}
.user-name.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
}
@media (max-width: 768px) {
    .header-content {
        padding: 0 2rem;
        flex-direction: column;
        gap: 1rem;
    }

    .nav-menu ul {
        gap: 1rem;
    }

    .nav-link {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
    }
    .user-name {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
    }
}
</style>