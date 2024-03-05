<template>
    <nav class="w-[100%] h-[63px] bg-white shadow-lg grid grid-cols-2 justify-center items-center text-xl text-stone-700 dark:bg-gray-800 dark:text-white">
        <h1 @click="goToPosts" class="text-center font-bold cursor-pointer">Text Editor</h1>
        <div class="mx-auto flex gap-4">
            <span @click="toggleTheme" class="fa fa-adjust cursor-pointer"></span>
            <span class="fa fa-sign-in cursor-pointer"></span>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { Posts } from '.';
import { useStore } from '../store';

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
</script>