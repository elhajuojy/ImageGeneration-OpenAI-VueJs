import { defineStore } from "pinia";
import { Configuration, OpenAIApi } from "openai";

export const useImageStore=  defineStore('ImageStore',{
    state: () => ({
        Image:null,
        name:"Mehdi",
        data:null
    }),
    actions:{
        async getImage(value){
            console.log(value)
            const configuration = new Configuration({
                apiKey: "",
              });              
              const openai = new OpenAIApi(configuration);
              this.image = await openai.createImage({
                  prompt: value,
                  n: 1,
                  size: "512x512",
              });
              this.data = this.image.data.data[0].url;
              console.log(this.data.data.data[0].url)
        }
    },
    getters:{
        favs(){
            return this.tasks.filter(t=>t.isFav)
        }
    }
})