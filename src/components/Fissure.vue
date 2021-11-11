<template >
    <div class="card">
        <div class="face face1">
            <div class="content">
                <h4 class="blue">Tier: {{this.data.tier}}</h4>
                <h4 class="blue">Type: {{this.data.missionType}}</h4>
                <p class="blue">Time remains <br>(since request): {{this.data.eta}}</p>
                <div class="droplist" v-if="drops.length > 0">
                    <div v-for="drop in drops" :key="drop.name">
                        <Drop :data="drop" />
                    </div>
                </div>
                <div class="droplist" v-else>
                    <p class="blue"> No Relic drops here </p>
                </div>
            </div>
        </div>
        <div class="face face2">
            <h4>{{this.data.node}}</h4>
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

<style scoped src="./Drop.scss" lang="scss">
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