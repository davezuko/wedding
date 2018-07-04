<template>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-8">
        <h1 class="display-2">Admin Panel</h1>
      </div>
      <div class="col">
        <input
          class="form-control form-control-lg"
          placeholder="Search..."
          autofocus
          v-model="search"
        />
      </div>
    </div>
    <hr />
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Household</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr is="household" v-for="household in households" v-bind="household"></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as guestService from '../../../services/guest-service'
import household from './household.vue'

export default {
  components: {
    household,
  },
  data() {
    return {
      loading: true,
      households: [],
      search: '',
    }
  },
  computed: {
    visibleHouseholds() {
      const search = this.search.trim().toLowerCase()
      return this.households.filter(hh => {
        const {householdLeaderLastName} = hh.guests[0]
        return householdLeaderLastName.toLowerCase().indexOf(search) !== -1
      })
    },
  },
  mounted() {
    guestService.subscribeToHouseholds(res => {
      this.households = res
    })
  },
}
</script>
