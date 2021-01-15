<template>

  <div class="row q-col-gutter-x-md">
    <h3 class="q-my-md q-my-lg-lg">
      Wieviel Geld können Sie mit Ihrer Dachfläche verdienen?
    </h3>
    <div class="col-12">
      <h4 class="q-my-sm text-accent">Jetzt rechnen und staunen!</h4>
      <h6 class="q-my-sm q-my-lg-md">Geben Sie bitte ihre Dachdaten an. Für eine genauere Berechnung benötigen wir außerdem Ihren Standort.</h6>
    </div>
    <div v-for="(roof, index) in roofs" name="roofs" :class="[{col12: oneRoof, colMed6: twoRoofs, colMed4: threeRoofs}]">

      <h6 class="q-my-sm">Dachfläche {{index + 1}}</h6>

      <q-select filled square borderless
                v-model="roof.alignment"
                label="Ausrichtung"
                :options="alignmentOptions"
                style="width: 100%;"
                behavior="menu"
                class="q-py-md text-subtitle1"
                :rules="[
                 val => val !== null && val !== '' || 'Bitte geben Sie die Dachausrichtung an']" />

      <q-input filled square borderless
               v-model="roof.area"
               type="number"
               min="1"
               max="9999"
               style="width: 100%;"
               label="Dachfläche"
               placeholder="Dachfläche in"
               suffix="m²"
               class="q-py-md text-subtitle1"
               :rules="[
                val => val !== null && val !== '' || 'Bitte geben Sie einen Wert an']" />

      <q-input filled square borderless
               v-model="roof.pitch"
               type="number"
               min="5"
               max="90"
               style="width: 100%;"
               label="Dachneigung"
               placeholder="Dachflächeneigung in"
               suffix="Grad"
               class="q-py-md q-mb-lg  text-subtitle1"
               lazy-rules
               :rules="[
                val => val !== null && val !== '' || 'Bitte geben Sie einen Wert zwischen 5 und 90 an',
                val => val > 4 && val < 91 || 'Bitte geben Sie eine Zahl zwischen 5 und 90 an']" />
    </div>

    <div class="col-12 q-my-md text-grey-8">Sie haben weitere Dachflächen?</div>
    <div class="col-12 row q-gutter-sm q-mb-lg">

      <q-btn v-show="roofCount>1" flat
             align="left"
             color="grey-5"
             icon="remove_circle_outline"
             label="letzte löschen"
             @click="deleteRoof()"
             class="col-12 col-sm-6 q-mx-none q-pa-sm" />

      <q-btn v-show="roofCount<3" flat
             align="left"
             color="grey-5"
             icon="add_circle_outline"
             label="weitere hinzufügen"
             @click="addRoof()"
             class="col-12 col-sm-6 q-mx-none q-pa-sm" />

    </div>

    <q-select filled square borderless required
              v-model="country"
              ref="country"
              label="Land*"
              :options="countryOptions"
              style="width: 100%;"
              behavior="menu"
              class="q-py-md text-subtitle1" />

    <div class="col-md-6 col-12">


      <q-input filled square borderless required
               v-model="zip"
               ref="zip"
               inputmode="numeric"
               label="PLZ*"
               class="q-py-md text-subtitle1 full-width"
               :rules="[
               val => val !== null && val !== '' || 'Bitte geben Sie Ihren Postleitzahl ein']" />
    </div>

    <div class="col-md-6 col-12">
      <q-input  filled square borderless required
                v-model="city"
                ref="city"
                type="text"
                label="Ort*" class="q-py-md text-subtitle1"
                :rules="[
                val => val !== null && val !== '' || 'Bitte geben Sie Ihren Standort an']" />
      <small class="text-grey-5 float-right">* Angaben erforderlich</small>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        alignmentOptions: ['Nord', 'Nord-Ost', 'Ost', 'Süd-Ost', 'Süd', 'Süd-West', 'West', 'Nord-West'],
        countryOptions: ['Deutschland', 'Schweiz', 'Österreich'],
        tooltip1: false
      }
    },
    computed: {
      roofs: {
        get() {
          return this.$store.state.formInputs.jsonData.roofs
        },
        set(value) {
          this.$store.commit('formInputs/mutationRoofs', value)
        }
      },
      country: {
        get() {
          return this.$store.state.formInputs.jsonData.location.country
        },
        set(value) {
          this.$store.commit('formInputs/mutationCountry', {
            country: value
          })
        }
      },

      city: {
        get() {
          return this.$store.state.formInputs.jsonData.location.city
        },
        set(value) {
          this.$store.commit('formInputs/mutationCity', {
            city: value
          })
        }
      },

      zip: {
        get() {
          return this.$store.state.formInputs.jsonData.location.zip
        },
        set(value) {
          this.$store.commit('formInputs/mutationZip', {
            zip: value
          })
        }
      },

      roofCount: {
        get() {
          return this.$store.state.formInputs.pageEssentials.roofCount
        },
        set(value) {
          this.$store.commit('formInputs/mutationRoofCount', {
            roofCount: value
          })
        }
      },

      oneRoof: {
        get() {
          return this.$store.state.formInputs.pageEssentials.oneRoof
        },
        set(value) {
          this.$store.commit('formInputs/mutationOneRoof', {
            oneRoof: value
          })
        }
      },
      twoRoofs: {
        get() {
          return this.$store.state.formInputs.pageEssentials.twoRoofs
        },
        set(value) {
          this.$store.commit('formInputs/mutationTwoRoofs', {
            twoRoofs: value
          })
        }
      },
      threeRoofs: {
        get() {
          return this.$store.state.formInputs.pageEssentials.threeRoofs
        },
        set(value) {
          this.$store.commit('formInputs/mutationThreeRoofs', {
            threeRoofs: value
          })
        }
      }
    },
    methods: {
      addRoof() {
        this.roofCount += 1

        this.$store.commit('formInputs/mutationAddRoofs', {
          area: null,
          pitch: null,
          alignment: null
        })

        if (this.roofCount === 1) {
          ;(this.oneRoof = true), (this.twoRoofs = false), (this.threeRoofs = false)
        } else if (this.roofCount === 2) {
          ;(this.oneRoof = false), (this.twoRoofs = true), (this.threeRoofs = false)
        } else if (this.roofCount === 3) {
          this.oneRoof = false
          ;(this.twoRoofs = false), (this.threeRoofs = true)
        }
      },
      deleteRoof() {
        this.roofCount -= 1

        this.$store.commit('formInputs/mutationDeleteRoofs')

        if (this.roofCount === 1) {
          ;(this.oneRoof = true),
            (this.twoRoofs = false),
            (this.threeRoofs = false),
            (this.alignment2 = null),
            (this.area2 = null),
            (this.pitch2 = null)
        } else if (this.roofCount === 2) {
          ;(this.oneRoof = false),
            (this.twoRoofs = true),
            (this.threeRoofs = false),
            (this.alignment3 = null),
            (this.area3 = null),
            (this.pitch3 = null)
        } else if (this.roofCount === 3) {
          this.oneRoof = false
          ;(this.twoRoofs = false), (this.threeRoofs = true)
        }
      }
    }
  }

</script>
