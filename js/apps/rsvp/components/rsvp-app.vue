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
        <form @submit.prevent="submit">
          <div class="row mb-4">
            <div class="form-group col">
              <label for="exampleInputEmail1">First Name</label>
              <input type="texta" class="form-control" placeholder="Your first name" v-model="firstName" autofocus>
            </div>
            <div class="form-group col">
              <label for="exampleInputEmail1">Last Name</label>
              <input type="text" class="form-control" placeholder="Your last name" v-model="lastName">
            </div>
          </div>
          <div v-if="household">
            <hr />
            <div class="d-flex">
              <h3>Your Household</h3>
              <div class="ml-auto">
                Attending?
              </div>
            </div>
            <ul>
              <li v-for="guest in household.guests" class="mb-2">
                <div class="row">
                  <span class="col-7">{{ guest.firstName }} {{ guest.lastName }}</span>
                  <div class="col d-flex">
                    <button
                      type="button"
                      class="btn btn-block mr-2"
                      :class="{
                        active: guest.rsvpStatus === 'Accepted',
                        'btn-outline-primary': guest.rsvpStatus === 'Accepted',
                        'btn-outline-secondary': guest.rsvpStatus !== 'Accepted'
                      }"
                      @click="updateRSVPStatus(guest, 'Accepted')"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      class="btn btn-block btn-outline-secondary mt-0"
                      :class="{active: guest.rsvpStatus === 'Declined'}"
                      @click="updateRSVPStatus(guest, 'Declined')"
                    >
                      No
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <hr />
          <div class="row">
            <div class="col ml-auto">
              <button type="submit" class="btn btn-block btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import * as guestService from '../../../services/guest-service'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
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
    updateRSVPStatus(guest, status) {
      if (guest.rsvpStatus === status) {
        guest.rsvpStatus = 'No Response'
        return
      }
      guest.rsvpStatus = status
    },
    submit() {
      guestService
        .saveHousehold(this.household.id, this.household)
        .then(() => alert('OK'))
        .catch(err => {
          console.error(err)
          alert('Error')
        })
    },
  },
  computed: {
    household() {
      const firstName = this.firstName.trim().toLowerCase()
      const lastName = this.lastName.trim().toLowerCase()
      if (!firstName || !lastName) {
        return
      }

      const household = this.households.find(hh => {
        return hh.guests.find(guest => {
          return (
            guest.firstName.toLowerCase().includes(firstName) &&
            guest.lastName.toLowerCase().includes(lastName)
          )
        })
      })
      return household
    },
  },
}
</script>
