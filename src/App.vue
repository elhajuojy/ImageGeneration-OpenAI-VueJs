<script setup>
import { initCustomFormatter, ref } from 'vue';


import {useImageStore} from "./stores/ImageStore"
import { onMounted } from 'vue';
const ImageStore  = useImageStore();

// onMounted(() => {
//     ImageStore.getImage("dog")
// });

var prompt = ref();

</script>

<template>
    <div class="container">
        <main>
            <h2 class="container">Image generation</h2>
            <LoadingIndicator v-if="disabled" />
            <div class="img">
                <img :src="ImageStore.data" alt="">
            </div>
        </main>
        <footer>
                <div class="results-input" ref="promptElement">
                    <input
                        type="text"
                        placeholder="Describe your image. Use your phantasie!"
                        v-model="prompt"
                        :disabled="disabled"
                        autofocus
                        @keyup.enter="ImageStore.getImage(prompt)"
                    />
        
                    <button @click="ImageStore.getImage(prompt)">Send</button>
                </div>
        </footer>
    </div>
</template>

<style scoped>

.img{
    width: 800px;
}

.img img{
    width: 100%;
}

footer{
    width: 80%;
    margin: auto;
}
.container{
    background-color:#222 ;
    text-align: center;
}
.message {
    list-style: none;
    padding: 0;
    margin: 0;
    color: rgb(210, 219, 231, 0.8);
}
.message li {
    margin: 0;
    padding: 1rem var(--container-padding-horizontal);
}
.message li:nth-child(even) {
    background: #222;
}

.results-input {
    display: grid;
    grid-direction: column;
    grid-template-columns: 1fr auto;
    gap: 0;
    margin: 1rem var(--container-padding-horizontal);
}

.results-input input,
.results-input button {
    padding: 1em 1.2em;
    border-radius: 0.3em;
    border: 0;
}
.results-input input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.results-input button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

@media (prefers-color-scheme: dark) {
    body {
        background: #111;
        color: rgb(174, 201, 201);
    }
    button,
    input {
        background: #333;
        color: rgb(174, 201, 201);
        border-color: #222;
        outline: #222;
    }
}
</style>
