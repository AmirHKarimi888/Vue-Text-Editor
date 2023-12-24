<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "../store";
import HTTPRequest from "../server";

const editorContentEl = ref<HTMLElement>();


const editDoc = async () => {

    useStore().selectedDoc.text = [];
    editorContentEl.value?.querySelectorAll("li").forEach(el => {
        useStore().selectedDoc.text = [
            ...useStore().selectedDoc.text,
            {
                id: `${useStore().selectedDoc.text.length + 1}`,
                content: el.innerText,
                style: []
            }
        ]
    })

    let unemptyLineFound = useStore().selectedDoc.text
        .find(line => line.content !== "");

    if (unemptyLineFound) {
        await HTTPRequest.put(`/docs/${useStore().selectedDoc.id}`, {
            ...useStore().selectedDoc
        })
            .then(async () => {
                await HTTPRequest.get("/docs")
                    .then(res => useStore().docs = res?.data)
            })
            .then(() => {
                useStore().editorMode = false;
            })
            .then(() => {
                useStore().editorMode = true;
            })
    }
}
</script>

<template>
    <div>
        <div id="editorContent" :style="useStore().selectedDoc.style">
            <ul contenteditable ref="editorContentEl">
                <li v-for="line of useStore().selectedDoc.text" :key="line.id" :id="`line${line.id}`" :style="line.style">
                    <p v-if="line.content !== '\n'">{{ line.content }}</p>
                    <p v-if="line.content === '\n'"><br></p>
                </li>
            </ul>
        </div>
        <button @click="editDoc">save</button>
    </div>
</template>

<style lang="scss" scoped></style>