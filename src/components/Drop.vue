<template>
    <div v-bind:class="{ rare:isRare, uncommon:isUncommon }">
    {{this.getAlias()}}
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { DropData } from "@/data.ts"

export default defineComponent({
    name: 'Drop',
    props:{
        data: Object as () => DropData,
    },
    data() {
        return {
            isRare: true,
            isUncommon: false,
        }
    },
    created(){
        this.isRare = ((this.data?.rarity ?? " ")  == "Rare");
        this.isUncommon = ((this.data?.rarity ?? " ") == "Uncommon");
    },
    methods:{
        getAlias(){
            return (this.data?.item
            .replace("Relic", "").replace("adiant", "") ?? " ") + 
            (this.data?.chance + "%" ?? " ");
        },
    }
})

</script>

<style>

.uncommon{
    color: green;
}

.rare{
    color: blue;
}

</style>