<template>
<q-card flat square style="max-width: 950px; width: 90vw;">
  <q-card-section class="column items-center no-wrap q-py-md q-px-xl">
    <p class="text-subtitle1 text-weight-bolder">Kurz die Cookies, dann gehts weiter</p>
    <p>Auch diese Seite nutzt mehrere Arten von Cookies: Technische und funktionale Cookies benötigen wir zwingend, damit bei Ihrem Besuch unserer Website alles gelingt.
      <br />  <br />
      Darüber hinaus setzen wir Marketing-Cookies, damit wir Sie auf unseren Seiten
      wiedererkennen und den Erfolg unserer Kampagnen messen können.
      Sie können jederzeit – auch später noch – festlegen, welche Cookies Sie zulassen und welche nicht (mehr dazu unter "Cookie-Einstellungen").
      Sind Sie über 16? Dann willigen Sie mit „Annehmen“ in die Nutzung aller Cookies ein – und schon gehts weiter.</p>
  </q-card-section>
  <q-card-section class="row q-py-md q-px-xl q-col-gutter-md">
    <div class="col-12 col-sm-4 row">
      <q-btn
      outline
      color="primary"
      @click=""
      class="col-12 submitBtn--small"
      label="Einstellungen"/>
    </div>
    <div class="col-12 col-sm-8 row">
      <q-btn
      color="accent"
      @click=""
      class="col-12 submitBtn--small"
      label="Alle Akzeptieren"/>
    </div>
  </q-stepper-navigation>
  </q-card-section>
</q-card>
</template>

<script>
export default
{
  data()
  {
    return {}
  },
  computed:
  {},
  methods:
  {},
  components:
  {}
}
</script>

<style lang="scss" >
  .submitBtn--small{
    height: 50px;
    font-size: 90%;
  }
</style>
