var FIREBASE = (function defineFirebase() {
  var config = {
    apiKey: 'AIzaSyD-lIe-bA-RhB_ELHToICYJely5gOnuzyI',
    authDomain: 'davidandjackiewedding-cad98.firebaseapp.com',
    databaseURL: 'https://davidandjackiewedding-cad98.firebaseio.com',
    projectId: 'davidandjackiewedding-cad98',
    storageBucket: 'davidandjackiewedding-cad98.appspot.com',
    messagingSenderId: '427278732005',
  }
  firebase.initializeApp(config)
  return firebase
})()

var GuestService = (function defineGuestService(firebase) {
  function normalizeGuestRecord(guest) {
    return {
      firstName: guest['First Name'],
      lastName: guest['Last Name'],
    }
  }

  function listHouseholds() {
    return firebase
      .database()
      .ref('/')
      .once('value')
      .then(function(snapshot) {
        return Object.keys(snapshot.val()).map(function(name) {
          var firstName = name.split('_')[0]
          var lastName = name.split('_')[1]
          var value = snapshot.val()[name]
          var guests = value.guests.map(normalizeGuestRecord)
          return { lastName, firstName, guests }
        })
      })
  }

  return {
    listHouseholds,
  }
})(FIREBASE)

var RSVPApp = (function defineRSVP(GuestService) {
  Vue.component('rsvp-app', {
    template: `
    <div>
      <search :households="households"></search>
      <ul v-if="false">
        <li
          v-for="household in households"
          is="household"
          :firstName="household.firstName"
          :lastName="household.lastName"
          :guests="household.guests"
        ></li>
      </ul>
    </div>
    `,
    data: function() {
      return {
        households: [],
      }
    },
    mounted: function() {
      var _this = this
      GuestService.listHouseholds().then(function(res) {
        _this.households = res
      })
    },
  })

  Vue.component('household', {
    template: `
      <div>
        <p>{{ firstName }} {{ lastName }}</p>
        <ul>
          <li v-for="guest in guests">
            {{ guest.firstName }}
          </li>
        </ul>
        <hr />
      </div>
    `,
    props: {
      firstName: String,
      lastName: String,
      guests: Array,
    },
  })

  Vue.component('search', {
    template: `
      <div class="form-group">
        <label>Your Last Name</label>
        <input
          type="text"
          placeholder="Start typing here to search..."
          v-model="search"
        />
        <hr />
        <ul>
          <li
            v-for="household in matches"
            is="household"
            :firstName="household.firstName"
            :lastName="household.lastName"
            :guests="household.guests"
          ></li>
        </ul>
      </div>
    `,
    props: {
      households: Array,
    },
    data: function() {
      return {
        search: '',
      }
    },
    computed: {
      matches: function() {
        var search = this.search.trim()
        console.log(search)
        if (!search) return []
        return this.households.filter(function(household) {
          return household.lastName.toLowerCase().indexOf(search) !== -1
        })
      },
    },
  })

  function init() {
    var vm = new Vue({
      el: '#rsvp',
      template: '<rsvp-app />',
    })
    return vm
  }

  return {
    init: init,
  }
})(GuestService)

var SDK = (function() {
  function init() {
    RSVPApp.init()
  }

  return {
    init,
  }
})()

SDK.init()
