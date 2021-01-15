<template>

  <div class="row q-col-gutter-x-md">
    <h3 class="q-my-md q-my-lg-lg">
      Dachleistung erfolgreich berechnet!
    </h3>
    <div class="col-12">
      <h4 class="q-my-sm text-accent">Sichern Sie sich jetzt Ihr Ergebnis.</h4>
      <h6 class="q-my-md">
        Das Ergebnis der Analyse zum Potential ihrer Dachfläche schicken wir Ihnen per E-Mail zu, geben Sie dafür bitte Ihre Kontaktinformationen an.</h6>
    </div>
    <div class="col-12">
      <q-radio name="salutation"
               v-model="salutation"
               val="Herr"
               :value="salutation.val"
               label="Herr"
               color="accent" />

      <q-radio name="salutation"
               v-model="salutation"
               val="Frau"
               :value="salutation.val"
               label="Frau"
               color="accent" />
    </div>
    <div class="col-md-6 col-12">
      <q-input filled
               v-model="firstname"
               type="text"
               square
               borderless
               label="Vorname*"
               class="q-py-md text-subtitle1 full-width"
               :rules="[
            val => val !== null && val !== '' || 'Bitte geben Sie Ihren Vornamen ein',
          ]" />
    </div>

    <div class="col-md-6 col-12">
      <q-input filled
               v-model="lastname"
               type="text"
               square
               borderless
               label="Nachname*"
               class="q-py-md text-subtitle1 col-md-6"
               :rules="[
            val => val !== null && val !== '' || 'Bitte geben Sie Ihren Nachnamen ein',
          ]" />
    </div>

    <div class="col-12 col-md-6">
      <q-input filled
               v-model="email"
               type="email"
               square
               borderless
               style="width: 100%;"
               label="E-Mail*"
               class="q-py-md text-subtitle1 col-12"
               lazy-rules
               :rules="[
                val => val !== null && val !== '' || 'Bitte geben Sie Ihre E-Mail-Adresse ein',
                val => val.includes ('@') && val.includes ('.') || 'Bitte geben Sie eine gültige E-Mail-Adresse ein (beispiel@email.xy)']" />
    </div>

    <div class="col-12 col-md-6">
      <q-input filled
               v-model="tel"
               type="tel"
               square
               borderless
               style="width: 100%;"
               label="Telefon*"
               class="q-py-md text-subtitle1 col-12"
               :rules="[
            val => val !== null && val !== '' || 'Bitte geben Sie Ihre Telefonnummer ein'
          ]" />
      <small class="text-grey-5 float-right">* Angaben erforderlich</small>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        tooltip: false
      }
    },
    computed: {
      salutation: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.salutation
        },
        set(val) {
          this.$store.commit('formInputs/mutationSalutation', {
            salutation: val
          })
        }
      },
      firstname: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.firstname
        },
        set(value) {
          this.$store.commit('formInputs/mutationFirstname', {
            firstname: value
          })
        }
      },
      lastname: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.lastname
        },
        set(value) {
          this.$store.commit('formInputs/mutationLastname', {
            lastname: value
          })
        }
      },
      email: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.email
        },
        set(value) {
          this.$store.commit('formInputs/mutationEmail', {
            email: value
          })
        }
      },
      tel: {
        get() {
          return this.$store.state.formInputs.jsonData.userData.tel
        },
        set(value) {
          this.$store.commit('formInputs/mutationTel', {
            tel: value
          })
        }
      }
    }
  }

</script>

<style lang="scss">

</style>
