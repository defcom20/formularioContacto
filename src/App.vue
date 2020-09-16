<template>
  <v-app>
    <v-main>
      <ContactRecord/>
    </v-main>
  </v-app>
</template>

<script>
import ContactRecord from './components/ContactRecord';

export default {
  name: 'App',

  components: {
    ContactRecord,
  },

  data: () => ({
    //
  }),
};
</script>
