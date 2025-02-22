import { createStore } from "vuex";


const store = createStore({
	state() {
		return {
			isAuth: false,
			user: {},
			posts: [],
		};
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setAuth(state, payload) {
			state.isAuth = payload;
		},
		setPosts(state, payload) {
			state.posts = payload;
		},
	},
    actions: {
        async fetchPosts(context) {
            try {
                const response = await fetch('http://localhost:3000/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const responseData = await response.json();
                context.commit('setPosts', responseData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        async fetchUser(context) {
            try {
                const response = await fetch('http://localhost:3000/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                const responseData = await response.json();
                context.commit('setUser', responseData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
    },
    actions: {
        async loginUser(context, payload) {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                const userData = await response.json();
                context.commit('setUser', userData);
                context.commit('setAuth', true);
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
        async signUpUser(context, payload) {
            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                const userData = await response.json();
                context.commit('setUser', userData);
                context.commit('setAuth', true);
            } catch (error) {
                console.error('Error signing up:', error);
            }
        },
    },
    actions: {
        async addPost(context, payload) {
            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error('Failed to add post');
                }
                const newPost = await response.json();
                context.commit('setPosts', [...context.state.posts, newPost]);
            } catch (error) {
                console.error('Error adding post:', error);
            }
        },
    
        async editPost(context, payload) {
            try {
                const response = await fetch(`http://localhost:3000/posts/${payload.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error('Failed to edit post');
                }
                const updatedPost = await response.json();
                const updatedPosts = context.state.posts.map(post =>
                    post.id === updatedPost.id ? updatedPost : post
                );
                context.commit('setPosts', updatedPosts);
            } catch (error) {
                console.error('Error editing post:', error);
            }
        },
    
        async deletePost(context, postId) {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete post');
                }
                const updatedPosts = context.state.posts.filter(post => post.id !== postId);
                context.commit('setPosts', updatedPosts);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuth;
        },
        getUser(state) {
            return state.user;
        },
        getPosts(state) {
            return state.posts;
        },
    }
});

export default store;
