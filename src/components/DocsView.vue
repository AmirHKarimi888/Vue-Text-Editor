<script setup lang="ts">
// import { ref, reactive } from "vue";
import { useStore } from "../store";
import HTTPRequest from "../server";
import type { Doc } from "../types";
import DocsViewDoc from "./DocsViewDoc.vue";

import AreYouSureModal from "./AreYouSureModal.vue";

const addDoc = async () => {

        let lastDoc = useStore().docs
            .sort((a: Doc, b: Doc) => +b?.id - +a?.id)[0]


        if (useStore().docs.length === 0) {

            await HTTPRequest.post("/docs", {
                id: "1",
                title: "Doc 1",
                text: [
                    {
                        id: "1",
                        content: "Hello, Welcome to my editor!",
                        style: []
                    }
                ],
                style: []
            })
                .then(async () => {
                    await HTTPRequest.get("/docs")
                        .then((res) => useStore().docs = res?.data)
                })
                .then(() => {
                    const docEl = document.querySelector(`#doc${+lastDoc?.id + 1}`) as HTMLElement;
                    docEl.classList.add("mutateDoc");

                    setTimeout(() => {
                        docEl.classList.remove("mutateDoc");
                    }, 1005)
                })

        } else {

            await HTTPRequest.post("/docs", {
                id: `${+lastDoc?.id + 1}`,
                title: `Doc ${+lastDoc?.id + 1}`,
                text: [
                    {
                        id: "1",
                        content: "Hello, Welcome to my editor!",
                        style: []
                    }
                ],
                style: []
            })
                .then(async () => {
                    await HTTPRequest.get("/docs")
                        .then((res) => useStore().docs = res?.data)
                })
                .then(() => {
                    const docEl = document.querySelector(`#doc${+lastDoc?.id + 1}`) as HTMLElement;
                    docEl.classList.add("mutateDoc");

                    setTimeout(() => {
                        docEl.classList.remove("mutateDoc");
                    }, 1005)
                })

        }
}


const deleteDoc = async (doc: Doc) => {
    useStore().areYouSureModalInfo = {
        message: `Are you sure to delete "${doc?.title}"?`,
        function: async () => {
            await HTTPRequest.delete(`/docs/${doc?.id}`)
                .then(() => useStore().areYouSureModalActive = false)
                .then(async () => {
                    await HTTPRequest.get("/docs")
                        .then((res) => useStore().docs = res?.data)
                })
        }
    }

    useStore().areYouSureModalActive = true;
}


const switchToEdit = (doc: Doc) => {
    useStore().selectedDoc = doc;
    useStore().editorMode = true;
}
</script>

<template>
    <div class="spinnerContainer" v-if="!useStore().docsLoaded">
        <div class="row col-sm-2 col-xs-4 text-center spinner-loader">

        </div>
    </div>

    <ul class="docs" v-if="useStore().docsLoaded">
        <DocsViewDoc v-for="doc of useStore().docs" :id="`doc${doc?.id}`" :key="doc?.id" :doc="doc"
            @deleteDoc="deleteDoc(doc)" @switchToEdit="switchToEdit(doc)" />
        <li class="docsItemAdd">
            <div id="docsItemAddBtn" @click="addDoc">
                <i class="fa fa-plus"></i>
            </div>
        </li>
    </ul>

    <AreYouSureModal v-if="useStore().areYouSureModalActive" />
</template>

<style scoped></style>