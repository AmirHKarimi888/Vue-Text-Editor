<script setup lang="ts">
import { ref } from "vue";
import { Doc } from '../types';
import HTTPRequest from "../server";

defineProps<{
    doc: Doc
}>()

const emit = defineEmits(["deleteDoc", "switchToEdit"]);


const docTitleEl = ref<HTMLElement>();
const docTitle = ref();

const updateDocTitle = async (doc: Doc) => {

    docTitle.value = docTitleEl.value?.innerText;

    if(docTitle.value !== "") {
        await HTTPRequest.put(`/docs/${doc?.id}`, {
            ...doc,
            title: docTitle.value
        })
    }
}


</script>

<template>
    <li class="doc">
        <div class="docContent">
            <div id="docsItemEditBtn" @click="emit('switchToEdit')">
                <i class="fa fa-edit"></i>
            </div>
            <div id="docsItemDeleteBtn" @click="emit('deleteDoc')">
                <i class="fa fa-trash"></i>
            </div>
        </div>

        <div class="docFooter">
            <h3 contenteditable ref="docTitleEl" @input="updateDocTitle(doc)">{{ doc?.title }}</h3>
        </div>
    </li>
</template>

<style scoped>

</style>