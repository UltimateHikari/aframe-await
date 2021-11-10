<template>
    <div class="FissureList">
        <div 
        class="Fissure"
        v-for="fissure in fissures"
        :key="fissure.id"
        >
            <Fissure :data="fissure" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import stat from "@/api.ts"
import Fissure from "./Fissure.vue"

const comm = (endpoint) => axios.create({
   baseURL: stat + "/" + endpoint,
})

export default{
    name: "FissuresList",
    components:{
        Fissure
    },
    data(){
        return {
            fissures:  [],
            invasions: [],
        };
    },
    created() {
        comm("fissures").get()
        .then(result => this.bindFissures(result));
        comm("invasions").get()
        .then(result => this.bindInvasions(result));
    },
    methods:{
        bindFissures(response){
            console.log(response);
            this.fissures = response.data;
        },
        bindInvasions(response){
            console.log(response);
            this.invasions = response.data;
        },
    }
}
</script>