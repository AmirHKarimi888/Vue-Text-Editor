<template>
    <nav class="w-[100%] h-[63px] bg-white shadow-lg grid grid-cols-2 justify-center items-center text-xl text-stone-700 dark:bg-gray-800 dark:text-white">
        <h1 @click="goToPosts" class="text-center font-bold cursor-pointer">Text Editor</h1>
        <div class="mx-auto flex gap-4">
            <span @click="toggleTheme" class="w-10 rounded-full cursor-pointer grid justify-center items-center duration-200"><i class="fa fa-adjust"></i></span>
            <span v-if="!useUsersStore().loggedInUser" @click="goToSignUp" class="fa fa-sign-in cursor-pointer"></span>
            <span v-else @click="toggleProfile" class="w-10 cursor-pointer"><img class="rounded-full" :src="useUsersStore().loggedInUser?.avatar" alt="avatar"></span>
        </div>
    </nav>
    <Profile />
</template>

<script setup lang="ts">
import { Posts, Profile, SignUp } from '.';
import { useStore, useUsersStore } from '../store';

const { toggleTheme } = useStore();

function goToPosts() {
    useStore().selectedPost = {
        id: "",
        title: "",
        lines: []
    };

    useStore().displayingView = Posts;

    localStorage.setItem("displayingView", "Posts");
    localStorage.setItem("selectedPostId", "");
}

const toggleProfile = () => {
    const profileContainerEl = document.querySelector(".profile-container");
    const profileEl = document.querySelector(".profile") as HTMLElement;

    if(profileEl.style.animation.includes("zoomIn")) {
        profileEl.style.animation = "zoomOut 1s ease 0s 1 normal forwards";
        setTimeout(() => profileContainerEl?.classList.toggle("hidden"), 1000)
    } else {
        profileEl.style.animation = "zoomIn 1s ease 0s 1 normal forwards";
        setTimeout(() => profileContainerEl?.classList.toggle("hidden"));
    }
}

const goToSignUp = () => {
    useStore().displayingView = SignUp;
    localStorage.setItem("displayingView", "SignUp");
}
</script>