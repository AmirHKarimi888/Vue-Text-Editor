<script setup lang="ts">
import { onMounted } from "vue";
import DocsView from './components/DocsView.vue';
import EditorView from './components/EditorView.vue';
import HTTPRequest from "./server/index";
import { useStore } from "./store";


onMounted(async () => {

  await HTTPRequest
  .get("/docs")
  .then((res: any) => useStore().docs = res.data)
  .then(() => useStore().docsLoaded = true)
})
</script>

<template>
  <header>

  </header>

  <main>
    <EditorView v-if="useStore().editorMode" />
    <DocsView v-else />
  </main>

  <footer>

  </footer>
</template>

<style scoped>

</style>
