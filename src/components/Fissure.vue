<template>
    <div>
        <b>{{this.data.node}}</b>
        <div>
            CORS f'd me up
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { FissureData, DropData } from "@/data.ts"
import { Comm } from "@/api.ts"

export default defineComponent({
    name: 'Fissure',
    props:{
        data: Object as () => FissureData,
    },
    data(){
        return {
            drops: [] as DropData[]
        }
    },
    created(){
        Comm.getRewards(this.data?.node ?? "")
        .then((result: DropData[]) => this.bindDrops(result));
    },
    methods:{
        bindDrops(response: DropData[]){
            console.log(response);
            this.drops = response;
        }
    }
})
</script>