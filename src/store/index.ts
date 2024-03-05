import { defineStore } from "pinia";
import { shallowRef, ref } from "vue";

import { Posts, Document } from "../components";
import type { Post } from "../types";

export const useStore = defineStore("store", () => {

    const displayingView = shallowRef(Posts);

    let storageView: string | null = "";

    if("displayingView" in localStorage) {
        null;
    } else {
        localStorage.setItem("displayingView", "Posts");
        localStorage.setItem("selectedPostId", "");
    }

    storageView = localStorage.getItem("displayingView");

    switch(storageView) {
        case "Posts":
            displayingView.value = Posts;
            break;
        
        case "Document":
            displayingView.value = Document;
            break;

        default:
            displayingView.value = Posts;
    }

    //const resPosts = ref<Post[]>([]);
    const storagePosts = ref<Post[]>([]);

    const selectedPost = ref<Post>();

    const getStoragePosts = () => {
        
        if("posts" in localStorage) {
            const data = localStorage.getItem("posts") as string;
            storagePosts.value = JSON.parse(data);

        } else {

            localStorage.setItem("posts", '[]');
            const data = localStorage.getItem("posts") as string;
            storagePosts.value = JSON.parse(data);
        }
    }

    const getStorageSelectedPost = () => {
        let storageSelectedPostId = localStorage.getItem("selectedPostId");

        selectedPost.value = storagePosts.value.find(post => {
            if(`${+post.id}` === storageSelectedPostId) {
                return post;
            }
        })
    }

    return { displayingView, storagePosts, selectedPost, getStoragePosts, getStorageSelectedPost };
})