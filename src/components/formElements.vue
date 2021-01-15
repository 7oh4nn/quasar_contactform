<template>

  <q-form ref="roofForm"
          @submit="onSubmit"
          id="formCalc"
          class="lightBg q-py-lg q-px-xl">

    <q-badge color="orange" class="text-subtitle2">
      Kostenloser Energiedachrechner
    </q-badge>
    <div style="width: 100%;">
      <q-stepper v-model="step"
                 ref="stepper"
                 animated
                 contracted
                 done-color="accent"
                 active-color="orange"
                 inactive-color="grey-5"
                 transition-next="jump-left"
                 transition-prev="jump-right"
                 flat
                 @finish="onsubmit()">

        <q-step title="Dachdaten und Stadort"
                icon="home"
                done-icon="home"
                active-icon="home"
                :name="1"
                :done="step > 1"
                class="q-mb-lg">
          <step1/>
        </q-step>
        <q-step title="persönliche Angaben"
                icon="account_circle"
                done-icon="account_circle"
                active-icon="account_circle"
                :name="3"
                :done="step > 3"
                class="q-mb-lg">

          <step3/>

          <q-item tag="label" v-ripple:accent
                  style="width: 100%;"
                  class="q-my-lg q-px-none">

            <q-item-section avatar>
              <q-toggle v-model="accept"
                        checked-icon="check"
                        unchecked-icon="clear"
                        color="accent" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ich habe die <a href="https://siccro.com/datenschutz/" target="_blank">Datenschutzerklärung</a> gelesen und stimme
                zu.</q-item-label>
            </q-item-section>
          </q-item>
        </q-step>

        <template v-slot:navigation>
            <q-stepper-navigation
            class="row">

              <q-btn
              v-show="step === 1"
              color="accent"
              @click="showLoading"
              class="col-12 submitBtn"
              label="Dachleistung berechnen!"/>

              <q-btn
              v-show="step === 3"
              v-ripple:accent
              label="Meine Auswertung anfordern!"
              type="submit"
              color="accent"
              class="col-12 glow-accent glow-accent-hover glow-accent-focus submitBtn">
                <q-inner-loading
                :showing="visible">
                  <q-spinner
                  size="50px"
                  color="accent" />
                </q-inner-loading>
              </q-btn>

              <q-btn
              v-show="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              icon="arrow_back"
              class="q-my-lg"/>
            </q-stepper-navigation>

            <div class="col-12">
              <p
              v-show="step === 1"
              class="text-grey-5 text-center q-my-md"
              >Schritt 1/2</p>
              <p
              v-show="step === 3"
              class="text-grey-5 text-center q-my-xs"
              >Schritt 2/2</p>
            </div>
          </template>
      </q-stepper>
    </div>
  </q-form>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { Notify } from 'quasar'
  export default {
    data() {
      return {
        step: 1,
        visible: false,
        showSimulatedReturnData: false
      }
    },
    computed: {
      ...mapGetters({
        location: 'formInputs/getterLocation',
        roofs: 'formInputs/getterRoofs'
      }),
      jsonData: {
        get() {
          return JSON.stringify(this.$store.state.formInputs.jsonData, null, 4)
        }
      },
      accept: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.acceptPrivacyPolicy
        },
        set(value) {
          this.$store.commit('formInputs/mutationAccept')
        }
      }
    },
    methods: {
      showLoading() {
        this.$refs.roofForm.validate()
        .then(valid => {
          if (valid) {
            window.scrollTo(0, 0)

            this.$q.loading.show({
              message: 'Dachfläche wird ausgemessen'
            }),

            this.timer = setTimeout(() => {
              this.$q.loading.show({
                message: 'Standort wird ermittelt'
              })
              this.timer = setTimeout(() => {
                this.$q.loading.show({
                  message: 'Leistung wird berechnet'
                })

                this.timer = setTimeout(() => {
                  this.$q.loading.hide()
                  this.timer = void 0

                  this.$refs.stepper.next()
                }, 1300)
              }, 1300)
            }, 1200)
          }else{
            this.$q.notify({message: 'Bitte füllen sie die Pflichtfelder aus.', color: 'deep-orange-6', icon: 'announcement'})
          }
        })
      },
      beforeDestroy() {
        if (this.timer !== void 0) {
          clearTimeout(this.timer)
          this.$q.loading.hide()
        }
      },
      onSubmit() {
        this.$refs.roofForm.validate()
        .then(valid => {
          if (valid) {
            if (this.$store.state.formInputs.jsonData.userData.acceptPrivacyPolicy !== true) {
              this.$q.notify({message: 'Bitte akzeptieren Sie die Datenschutzerklärung.', color: 'deep-orange-6', icon: 'announcement'})
            } else {

              const jsonHeader = {
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
              }

              const sendJson = this.jsonData

              this.visible = true
              this.showSimulatedReturnData = false

              // My local test (changed port of quasar to 8081)
              // const url = 'http://localhost:8080/api/1.0.0/siccro/roof/peak-energy/de'

              // Siccro dev version, won't write data to erp system. Will send an email though.
              // Probably has a huge delay and request
              // Will likely fail with error 503 because ERP system won't be reached withing 30 seconds after which server says nope
              // Will send an email anyways
              // const url = 'https://siccro-expertise-dev.herokuapp.com/api/1.0.0/siccro/roof/peak-energy/de'

              // Siccro live version, will write data to erp system and send an email.
              const url = 'https://siccro-expertise.herokuapp.com/api/1.0.0/siccro/roof/peak-energy/de'

              // TODO Siccro live version, forwarded through Plesk. Doesn't work as of 7/31.
              // const url = 'https://expertise.siccro.com/api/1.0.0/siccro/roof/peak-energy/de'

              this.$axios
                .post(url, sendJson, jsonHeader)

                .then(response => {
                  console.log(response)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(function() {})

              setTimeout(() => {
                this.visible = false
                this.showSimulatedReturnData = true
                this.$router.push('/danke')
              }, 2000)
            }
          }else{
            this.$q.notify({message: 'Bitte füllen sie die Pflichtfelder aus.', color: 'deep-orange-6', icon: 'announcement'})
          }
        })
      }
    },

    components: {
      step1: require('./formComp/steps/formSimpleStep1.vue').default,
      step3: require('./formComp/steps/formSimpleStep3.vue').default
    }
  }

</script>

<style lang="scss" >

  .q-stepper__header {
    display: none !important;
  }

</style>
