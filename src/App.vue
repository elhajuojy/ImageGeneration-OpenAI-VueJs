<script setup>
import { initCustomFormatter, ref } from 'vue';


import {useImageStore} from "./stores/ImageStore"
import { onMounted } from 'vue';
const ImageStore  = useImageStore();
const disabled =ref(false);
const state = ref("Generate An Image 🪷")


async function search(){
    disabled.value = true;
    ImageStore.data = null;
    state.value = "Loading ..."
    try{
        await ImageStore.getImage(prompt.value); 
        disabled.value = false;
    }
    catch(err){
        console.log(err);
    }
}

var prompt = ref();

</script>

<template>
    <div class="container">
        <main>
            <h1 class="container">Image generation</h1>
            <LoadingIndicator v-if="disabled" />
                <div class="imgs-container" v-if="ImageStore.data">
                    <img v-for="img in ImageStore.data " :src="img.url" alt="">
                </div>
                <div class="div-loading" v-else>
                    <p>{{state}}</p>
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
                        @keyup.enter="search()"
                    />
                    <button @click="search()">Send</button>
                </div>
        </footer>
    </div>
</template>

<style scoped>
h1{
    font-size: 3rem;
}
.imgs-container,.div-loading{
    width: 100%;
    overflow-x: hidden;
    display:  grid;
    justify-content: space-around;
    justify-items: center;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap: 20px;
    height: 80vh;
}
.div-loading{
    display: grid;
    align-items: center;
}
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
