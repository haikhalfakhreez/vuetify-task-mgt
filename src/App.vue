<template>
  <v-app>
    <site-header />
    <v-main>
      <router-view />
      <site-footer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SiteHeader from "@/components/SiteHeader.vue"
import SiteFooter from "@/components/SiteFooter.vue"
</script>

<style>
body {
  font-size: 14px;
}
</style>
