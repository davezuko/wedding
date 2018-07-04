<template>
  <div class="form-group">
    <label>Your Last Name</label>
    <input
      type="text"
      placeholder="Start typing here to search..."
      v-model="search"
    />
    <hr />
  </div>
</template>

<script>
  export default {
    props: {
      households: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    data: function() {
      return {
        search: '',
      }
    },
    computed: {
      matches: function() {
        var search = this.search.trim().toLowerCase()

        if (!search) return []
        return this.households.filter(function(household) {
          return household.lastName.toLowerCase().indexOf(search) !== -1
        })
      },
    }
  }
</script>
