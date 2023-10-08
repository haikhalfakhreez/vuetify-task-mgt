<template>
  <v-footer class="text-caption d-flex justify-center flex-0-1 bg-black">
    <v-row no-gutters align="center">
      <v-col cols="auto">
        <div>
          <span>Built with 💙 by</span>
          <a
            href="https://www.haikhalfakhreez.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="mx-1 name"
            >ekaliacid</a
          >
          - {{ new Date().getFullYear() }}
        </div>
      </v-col>

      <v-spacer />

      <v-col cols="auto">
        <v-btn
          icon="mdi-github"
          variant="plain"
          height="30"
          width="30"
          href="https://github.com/haikhalfakhreez/vuetify-task-mgt"
          target="_blank"
        />
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.name {
  font-weight: 600;
}

.name:hover {
  text-decoration: underline;
}
</style>
