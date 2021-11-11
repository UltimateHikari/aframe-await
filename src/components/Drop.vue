<template>
    <b>
    {{this.data.item + " " + this.data.rarity}}
    </b>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { DropData } from "@/data.ts"

export default defineComponent({
    name: 'Drop',
    props:{
        data: Object as () => DropData,
    }
})

</script>