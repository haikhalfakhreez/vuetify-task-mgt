import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

import { createVuetify } from "vuetify"
import DateFnsAdapter from "@date-io/date-fns"

const dateFns = new DateFnsAdapter()

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#000",
          secondary: "#5CBBF6",
        },
        variables: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        },
      },
    },
  },
  date: {
    adapter: dateFns,
  },
})
