<template>
  <body>
    <FissureList/>
  </body>
</template>

<script>
import FissureList from './components/FissuresList.vue'

export default {
  name: 'App',
  components: {
    FissureList
  }
}
</script>

<style scoped src="@/components/Drop.scss" lang="scss">
.app {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
