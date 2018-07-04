<template>
  <div>
    <section class="section">
      <h2>RSVP</h2>
      <div class="section__content">
      </div>
    </section>
    <ul v-if="debug">
      <li v-for="household in households">
        {{ household.guests[0].householdLeaderLastName }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as guestService from '../../../services/guest-service'

export default {
  components: {
    search: require('./search.vue'),
  },
  data() {
    return {
      debug: true,
      households: [],
    }
  },
  mounted() {
    guestService.listHouseholds().then(res => {
      console.log(res)
      this.households = res
    })
  },
}
</script>
