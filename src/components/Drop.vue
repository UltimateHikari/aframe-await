<template>
    <div v-bind:class="{ rare:isRare, uncommon:isUncommon }">
    {{this.getAlias()}}
    </div>
</template>

<script lang="ts">

import { Comm } from "@/api.ts"
import { defineComponent } from 'vue'
import { DropData, PlatinumData } from "@/data.ts"

export default defineComponent({
    name: 'Drop',
    props:{
        data: Object as () => DropData,
    },
    data() {
        return {
            isRare: true,
            isUncommon: false,
            plat: {} as PlatinumData,
        }
    },
    created(){
        this.isRare = ((this.data?.rarity ?? " ")  == "Rare");
        this.isUncommon = ((this.data?.rarity ?? " ") == "Uncommon");
        Comm.getPlatinumData(this.data?.item ?? "")
        .then((result) => this.bindPlat(result));
    },
    methods:{
        getAlias(){
            return (this.data?.item
            .replace("Relic", "").replace("adiant", "") ?? " ") + 
            (this.data?.chance + "% " ?? " ");/* +
            (this.plat?.median + "p" ?? " ");*/
        },
        bindPlat(plat: PlatinumData){
            console.log(plat);
            this.plat = plat;
        }
    }
})

</script>

<style>

.uncommon{
    color: green;
    font-weight: bold;
}

.rare{
    color: blue;
    font-weight: bold;
}

</style>