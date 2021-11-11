<template>
    <div class="container">
        <div 
        v-for="fissure in fissures"
        :key="fissure.id"
        >
            <Fissure :data="fissure" />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Comm } from "@/api.ts"
import { FissureData, InvasionData } from "@/data.ts"
import Fissure from "./Fissure.vue"

export default defineComponent({
    name: "FissuresList",
    components:{
        Fissure
    },
    data(){
        return {
            fissures:  [] as FissureData[],
            invasions: [] as InvasionData[],
        };
    },
    created() {
        Comm.getFissures()
        .then((result) => this.bindFissures(result));
        Comm.getInvasions()
        .then((result) => this.bindInvasions(result));
    },
    methods:{
        bindFissures(response: FissureData[]){
            console.log(response);
            this.fissures = response.sort((a: FissureData, b: FissureData) => a.tierNum - b.tierNum);
        },
        bindInvasions(response: InvasionData[]){
            console.log(response);
            this.invasions = response;
        },
    }
})
</script>

<style scoped src="./Drop.scss" lang="scss">
.fissurelist{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
    grid-gap: 10px
}
</style>