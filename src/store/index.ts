import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Doc, AreYouSureModalInfo } from "../types";

export const useStore = defineStore("store", () => {

    const editorMode = ref<boolean>(false); 

    const docsLoaded = ref<boolean>(false);

    const areYouSureModalActive = ref<boolean>(false);
    const areYouSureModalInfo = reactive<AreYouSureModalInfo>({
        message: "",
        function: ""
    });

    const docs = reactive<Doc[]>([]);

    const selectedDoc = reactive<Doc>({
        id: "",
        title: "",
        text: [],
        style: []
    });

    return { editorMode, docsLoaded, areYouSureModalActive, areYouSureModalInfo, docs, selectedDoc };
})