<template>
  <tr>
    <td>{{ name }}</td>
    <td>
      {{ notes }}
      <button class="btn" v-if="!editing" @click="editNote()">
        {{ notes ? 'Edit' : 'Add' }} Note
      </button>
      <template v-if="editing">
        <input v-model="notes" placeholder="Your note..." autofocus />
        <button class="btn btn-primary" @click="saveNote()">
          Save
        </button>
      </template>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: String,
    rsvpStatus: String,
    notes: {
      type: String,
      default: '',
    },
    guests: Array,
  },
  data() {
    return {
      editing: false,
    }
  },
  computed: {
    name() {
      return this.id.replace('_', ' ')
    },
  },
  methods: {
    editNote() {
      this.editing = true
    },
    saveNote() {
      this.editing = false
    },
  },
}
</script>
