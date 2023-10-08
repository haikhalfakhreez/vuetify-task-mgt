<template>
  <v-app-bar class="app-bar" flat height="60">
    <v-container fluid class="d-flex">
      <router-link to="/">
        <v-app-bar-title tag="h1" class="text-body-2 font-weight-bold">
          Task Mgt
        </v-app-bar-title>
      </router-link>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  background-color: #fff;
  border-bottom: 2px solid #000;
}
</style>
