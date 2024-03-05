<template>
    <div class="document-management mx-auto max-sm:w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-lg:w-[50%]">
        <div class="document-title my-10 text-center font-bold text-stone-700 dark:text-white">Document name: {{
            useStore().selectedPost?.title }}</div>

        <div id="documentText" class="document-text bg-white h-screen overflow-auto p-3 dark:bg-gray-800 dark:text-white" contenteditable="true" v-if="textDisplay">
            <DocumentLine />
        </div>

        <div class="document-btns my-10 flex gap-3">
            <span @click="saveDocument"
                class="bg-green-700 hover:bg-green-600 p-2 cursor-pointer text-white rounded-md shadow-lg">Save</span>
            <span @click="closeDocument" class="bg-red-600 hover:bg-red-500 p-2 cursor-pointer text-white rounded-md shadow-lg">Save &
                Close</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Posts, DocumentLine } from '.';
import { useStore } from '../store';
import type { Line } from '../types';

const textDisplay = ref(true);

onMounted(() => {
    useStore().getStoragePosts();
    useStore().getStorageSelectedPost();
    
})


const saveDocument = () => {
    const documentText = document.querySelector(".document-text") as Element;
    const documentLinesEls = document.querySelectorAll(".document-text div") as any;
    const documentLines: Line[] = [];

    documentLinesEls.forEach((line: any, index: any) => {
        
        documentLines.push({
            id: `${index + 1}`,
            text: line?.innerHTML === "<br>" ? line?.innerHTML : line?.innerText
        })
    })

    useStore().selectedPost = {
            id: useStore().selectedPost?.id as string,
            title: useStore().selectedPost?.title,
            lines: documentLines
        }

        textDisplay.value = false;
        setTimeout(() => textDisplay.value = true)

        
    useStore().storagePosts.filter((post) => {
        if (post.id === useStore().selectedPost?.id) {
            post.lines = useStore().selectedPost?.lines;
        }
    })

    const data = JSON.stringify(useStore().storagePosts);
    localStorage.setItem("posts", data);
    //console.log(useStore().storagePosts);
}

const closeDocument = function () {

    saveDocument();

    useStore().displayingView = Posts;

    useStore().selectedPost = {
        id: "",
        title: "",
        lines: []
    }

    localStorage.setItem("displayingView", "Posts");
    localStorage.setItem("selectedPostId", "");
}

document.addEventListener("keydown", (event: any) => {
  if (event.keyCode == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
    event.preventDefault();
    saveDocument();
  }
}, false)

</script>