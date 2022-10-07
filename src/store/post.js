import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "./api";
import {toast} from "react-toastify";

const slice = createSlice({
    name: 'post',
    initialState: {posts: []},
    reducers: {
        getFromResponse: (state, action) => {
            state.posts = action.payload
        },
        postSaved: (state, action) => {
            state.posts.unshift(action.payload)
            toast.success('Post Saved Successfully !!!')
        },
        postUpdated: (state, action) => {
            state.posts.map(item => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title
                    item.body = action.payload.body
                    toast.success('Post Saved Successfully !!!')
                }
            })
        },
        postDeleted: (state, action) => {}
    }
})

export const getPostsFromBackend = () => apiCall({
    url: '/posts',
    method: 'get',
    onSuccess: slice.actions.getFromResponse.type
})

export const savePost = (data) => apiCall({
    url: '/posts',
    method: 'post',
    data,
    onSuccess: slice.actions.postSaved.type
})

export const editPost = (data) => apiCall({
    url: '/posts/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.postUpdated.type
})

export const deletePost = (data) => apiCall({
    url: '/posts/' + data,
    method: 'delete',
    data,
    onSuccess: slice.actions.postDeleted.type
})

export default slice.reducer