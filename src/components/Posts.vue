<template>
    <div class="posts-management mx-auto max-sm:w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-lg:w-[50%] my-36">
        <div class="post-naming w-full text-center">
            <input @keyup.enter="addNewPost" type="text" v-model="title" placeholder="Name your new document"
                class="p-2 w-full rounded-lg shadow-lg">
        </div>

        <div class="posts-section mt-14 mx-auto">
            <ul class="posts grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">


                <li class="post p-5 aspect-video rounded-lg grid justify-center items-center">
                    <div class="post-contents grid gap-y-8">
                        <div @click="addNewPost"
                            class="post-edit-btn cursor-pointer rounded-full border border-gray-700 text-gray-700 w-12 h-12 grid justify-center items-center hover:bg-gray-700 hover:text-white duration-300">
                            <i class="fa fa-plus"></i>
                        </div>
                    </div>
                </li>

                <li v-for="post of posts" :key="post?.id" :id="`post${post?.id}`"
                    class="post bg-white p-5 aspect-video rounded-lg shadow-lg grid justify-center items-center">
                    <div class="post-contents grid gap-y-8">

                        <div class="post-title text-xl text-center" :id="`postTitle${post?.id}`" contenteditable="true"
                            @input="editPostTitle(post)">
                            {{ post?.title }}
                        </div>

                        <div class="post-btns grid grid-cols-2 gap-x-2">
                            <div @click="deletePost(post)"
                                class="post-delete-btn cursor-pointer rounded-full border border-red-500 text-red-500 w-12 h-12 grid justify-center items-center hover:bg-red-500 hover:text-white duration-300">
                                <i class="fa fa-trash"></i>
                            </div>

                            <div @click="editPost(post)"
                                class="post-edit-btn cursor-pointer rounded-full border border-green-700 text-green-700 w-12 h-12 grid justify-center items-center hover:bg-green-700 hover:text-white duration-300">
                                <i class="fa fa-edit"></i>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from "../store";
import { Document } from '.';
import type { Post } from '../types';

const titleEl = ref<HTMLElement>();
const title = ref<string | undefined>("");

const posts = ref<Post[]>([]);

const { getStoragePosts } = useStore();

onMounted(() => {
    getStoragePosts();
    posts.value = useStore().storagePosts.sort((a: any, b: any) => +b?.id - +a.id);
})

function updateLocalStorage() {
    posts.value = posts.value.sort((a: any, b: any) => +b?.id - +a.id);
    const data = JSON.stringify(posts.value);
    localStorage.setItem("posts", data);
}

const editPostTitle = (Post: Post) => {
    titleEl.value = document.querySelector(`#postTitle${Post.id}`) as HTMLElement;
    posts.value.filter(post => {
        if (post.id === Post.id) {
            post.title = titleEl.value?.innerHTML;
        }
    })

    updateLocalStorage();
}

const addNewPost = () => {
    let latestPost = posts.value.sort((a: any, b: any) => +b?.id - +a.id)[0];

    let newPost: Post = {
        id: "",
        title: "",
        lines: []
    };

    if (posts.value.length === 0) {
        newPost = {
            id: `1`,
            title: title.value,
            lines: [{
                id: "1",
                text: `This is document "${title.value}"`
            }]
        }

    } else {
        newPost = {
            id: `${+latestPost?.id + 1}`,
            title: title.value,
            lines: [{
                id: "1",
                text: `This is document "${title.value}"`
            }]
        }
    }

    if (title.value !== "") {
        posts.value.push(newPost);
        title.value = "";

        updateLocalStorage();

        setTimeout(() => {
            let postEl = document.querySelector(`#post${+latestPost?.id + 1}`) as HTMLElement;
            if(postEl) postEl.style.animation = "zoomIn 1s ease 0s 1 normal forwards";
        })
    }
}

const deletePost = (Post: Post) => {

    let postEl = document.querySelector(`#post${Post.id}`) as HTMLElement;
    if(postEl) postEl.style.animation = "zoomOut 1s ease 0s 1 normal forwards";

    setTimeout(() => {
        posts.value = posts.value.filter(post => {
            if (post?.id !== Post?.id) {
                return post;
            }
        })

        updateLocalStorage();
    }, 1000)
}

const editPost = (Post: Post) => {
    useStore().displayingView = Document;
    useStore().selectedPost = Post;
    localStorage.setItem("displayingView", "Document");
    localStorage.setItem("selectedPostId", `${Post.id}`);
}


</script>