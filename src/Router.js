import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import User from "./components/User.vue";
import Post from "./components/Post.vue";
import EditPost from "@/components/EditPost.vue";
import PostDetail from "@/components/PostDetail.vue";
import store from "@/store"; // Import Vuex store

const routes = [
    {
        name: "Home",
        component: Home,
        path: "/",
        meta: { requiresAuth: true },
    },
    {
        name: "SignUp",
        component: SignUp,
        path: "/sign-up",
    },
    {
        name: "Login",
        component: Login,
        path: "/login",
    },
    {
        name: "User",
        component: User,
        path: "/user/:id",
    },
    {
        name: "addPost",
        component: Post,
        path: "/add-post",
    },
    {
        path: "/edit-post/:id",
        name: "EditPost",
        component: EditPost,
        props: true,
    },
    {
        path: "/posts/:id",
        name: "PostDetail",
        component: PostDetail,
        props: true,
    },
];

// ✅ Tạo router trước, rồi mới gọi `beforeEach`
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ✅ Thêm Navigation Guard để kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.isAuth) {
        next("/login"); // Chuyển hướng đến trang Login nếu chưa đăng nhập
    } else {
        next(); // Cho phép truy cập nếu đã đăng nhập
    }
});

export default router;
