<template>
    <div class="document-management mx-auto max-sm:w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-lg:w-[50%]">
        <div class="document-title my-10 text-center font-bold text-stone-700">Document name: {{
            useStore().selectedPost?.title }}</div>

        <div class="document-text bg-white h-screen overflow-auto p-3" contenteditable="true">
            <div class="document-line" v-for="line of useStore().selectedPost?.lines" :key="line?.id"
                :id="`documentLine${line?.id}`">
                {{ line?.text !== "<br>" ? line?.text : null }}
                <br v-if="line?.text === '<br>'">
            </div>
        </div>

        <div class="document-btns my-10 flex gap-3">
            <span @click="saveDocument"
                class="bg-green-700 hover:bg-green-600 p-2 cursor-pointer text-white rounded-md">Save</span>
            <span @click="closeDocument" class="bg-red-600 hover:bg-red-500 p-2 cursor-pointer text-white rounded-md">Save &
                Close</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Posts } from '.';
import { useStore } from '../store';
import { Line } from '../types';


onMounted(() => {
    useStore().getStoragePosts();
    useStore().getStorageSelectedPost();
    
})


const saveDocument = () => {
    const documentText = document.querySelector(".document-text") as Element;
    const documentLinesEls = document.querySelectorAll(".document-text div");
    const documentLines: Line[] = [];

    documentLinesEls.forEach((line: Element, index) => {
        
        documentLines.push({
            id: `${index + 1}`,
            text: line.innerHTML.replace("<!--v-if-->", "")
        })
    })

    useStore().selectedPost = {
            id: useStore().selectedPost?.id as string,
            title: useStore().selectedPost?.title,
            lines: documentLines
        }

    documentText.innerHTML = "";

    documentText.insertAdjacentHTML("afterbegin", /*html*/`
      ${useStore().selectedPost?.lines?.map((line: Line) => {
        return (
            `<div class="document-line" id="documentLine${line?.id}">
                ${
                    line?.text === "<br>" ? 
                    "<br>" :
                    line?.text
                }
            </div>`
        )
    })
            .join("")
        }
    `)

    useStore().storagePosts.filter((post) => {
        if (post.id === useStore().selectedPost?.id) {
            post.lines = useStore().selectedPost?.lines;
        }
    })

    const data = JSON.stringify(useStore().storagePosts);
    localStorage.setItem("posts", data);
    console.log(useStore().storagePosts);
}

const closeDocument = function () {
    useStore().displayingView = Posts;

    useStore().selectedPost = {
        id: "",
        title: "",
        lines: []
    }

    localStorage.setItem("displayingView", "Posts");
    localStorage.setItem("selectedPostId", "");
}
</script>