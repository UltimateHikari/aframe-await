<template>
  <body>
    <Header/>
    <FissureList/>
  </body>
</template>

<script>
import FissureList from './components/FissuresList.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    FissureList,
    Header
  }
}
</script>

<style scoped src="@/components/Drop.scss" lang="scss">

</style>
