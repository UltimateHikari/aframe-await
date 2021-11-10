<template>
    <div>
        <b>{{this.data.node}}</b>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import FissureData from "@/data.ts"

export default defineComponent({
  name: 'Fissure',
    props:{
        data: Object as () => FissureData,
    },
})
</script>