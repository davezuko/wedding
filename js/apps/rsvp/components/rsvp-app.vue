<template>
  <div class="rsvp">
    <section class="section my-card">
      <h2 class="section__header">Wedding RSVP</h2>
      <div class="section__content">
        <div class="rsvp-header text-center">
          <h3>Great Oaks Country Club</h3>
          <p>
            777 Great Oaks Blvd<br />
            Rochester Hills, MI 48307<br />
            Saturday, September 22, 2018
          </p>
          <hr />
        </div>
        <form>
          <div class="row mb-4">
            <div class="form-group col">
              <label for="exampleInputEmail1">First Name</label>
              <input type="texta" class="form-control" placeholder="Your first name" autofocus>
            </div>
            <div class="form-group col">
              <label for="exampleInputEmail1">Last Name</label>
              <input type="text" class="form-control" placeholder="Your last name">
            </div>
          </div>
          <h3>Will you be attending?</h3>
          <div class="row mt-3">
            <div class="col">
              <button type="button" class="col btn btn-block btn-primary" @click="changeAttendingStatus(true)">Yes</button>
            </div>
            <div class="col">
              <button type="button" class="col btn btn-block btn-outline-secondary mt-0" @click="changeAttendingStatus(false)">No</button>
            </div>
          </div>
          <div v-show="attending" class="mt-5">
            <hr />
          </div>
        </form>
      </div>
    </section>
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
      attending: null,
      households: [],
    }
  },
  mounted() {
    guestService.listHouseholds().then(res => {
      this.households = res
    })
  },
  methods: {
    changeAttendingStatus(status) {
      this.attending = status
    },
  },
}
</script>
