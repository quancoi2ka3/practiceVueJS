<template>
    <div>
        <!-- Hiển thị Header -->
        <Header />

        <div class="post-container">
            <!-- Ô tìm kiếm -->
            <div class="search-bar">
                <input aria-label="searchTerm" v-model="searchTerm" type="text" placeholder="Search posts..." />
            </div>

            <!-- Bảng danh sách bài viết -->
            <table class="post-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in filteredPosts" :key="post.id">
                        <td>{{ post.title }}</td>
                        <td>{{ truncate(post.content, 50) }}</td>
                        <td>{{ formatDate(post.createdAt) }}</td>
                        <td>
                            <button @click="viewPost(post)">View</button>
                            <button @click="editPost(post)">Edit</button>
                            <button @click="deletePost(post)" class="delete-btn">Delete</button>
                        </td>

                    </tr>
                    <tr v-if="filteredPosts.length === 0">
                        <td colspan="4" class="no-data">No posts found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Swal from 'sweetalert2';
export default {
    name: 'Home',
    components: {
        Header,
    },
    data() {
        return {
            posts: [],
            searchTerm: '',
        };
    },
    computed: {
        // Lọc bài viết theo tiêu đề dựa trên searchTerm
        filteredPosts() {
            if (!this.searchTerm.trim()) return this.posts;
            return this.posts.filter(post =>
                post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                if (response.status === 200) {
                    this.posts = response.data;
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        formatDate(dateStr) {
            if (!dateStr) return '';
            return new Date(dateStr).toLocaleString();
        },
        truncate(text, length) {
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        },
        viewPost(post) {
            // Giả sử bạn có route hiển thị chi tiết bài viết, ví dụ: /posts/:id
            this.$router.push(`/posts/${post.id}`);
        },
        editPost(post) {
            // Giả sử bạn có route chỉnh sửa bài viết, ví dụ: /edit-post/:id
            this.$router.push(`/edit-post/${post.id}`);
        },
        async deletePost(post) {
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
                    await axios.delete(`http://localhost:3000/posts/${post.id}`);
                    this.posts = this.posts.filter(p => p.id !== post.id);
                    Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting post:', error);
                    Swal.fire('Error', 'Failed to delete post', 'error');
                }
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>

<style scoped>
.post-container {
    padding: 2rem;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
}

.search-bar {
    margin-bottom: 1rem;
    text-align: right;
}

.search-bar input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 300px;
}

.post-table {
    width: 100%;
    border-collapse: collapse;
}

.post-table th,
.post-table td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: left;
}

.post-table th {
    background-color: #f8f8f8;
}

.no-data {
    text-align: center;
    padding: 1rem;
    font-style: italic;
}

button {
    margin-right: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #2980b9;
}
</style>