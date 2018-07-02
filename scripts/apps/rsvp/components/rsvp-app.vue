<template>
  <div class="container">
    <h1>RSVP</h1>
    <search></search>
    <ul v-if="debug">
      <li v-for="household in households">
        {{ household.lastName }}
      </li>
    </ul>
  </div>
</template>

<script>
  import * as guestService from '../../../services/guest-service'

  export default {
    components: {
      search: require('./search.vue')
    },
    data() {
      return {
        debug: true,
        households: [],
      }
    },
    mounted() {
      guestService.listHouseholds().then((res) => {
        this.households = res
      })
    },
  }
</script>
