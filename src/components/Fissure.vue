<template >
    <div>
        <p>{{this.data.node}}</p>
        <p>{{this.data.missionType}}</p>
        <p>{{this.data.eta}}</p>
        <div class="droplist" v-if="drops.length > 0">
            <div v-for="drop in drops" :key="drop.name">
                <Drop :data="drop" />
            </div>
        </div>
        <div class="droplist" v-else>
            No Relic drops here
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { FissureData, DropData } from "@/data.ts"
import { Comm } from "@/api.ts"
import Drop from "./Drop.vue"

export default defineComponent({
    name: 'Fissure',
    components:{
        Drop
    },
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
            this.drops = response.filter(drop => drop.item.includes("Relic"));
        }
    }
})
</script>

<style>
.droplist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
}

.droplist > * {
    flex: 1
}

</style>