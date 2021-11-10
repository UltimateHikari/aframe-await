<template>
    <div class="FissureList">
    </div>
</template>

<script>
import axios from "axios";
import stat from "@/api.js"

const comm = (endpoint) => axios.create({
   baseURL: stat + "/" + endpoint,
})

export default{
    name: "FissuresList",
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