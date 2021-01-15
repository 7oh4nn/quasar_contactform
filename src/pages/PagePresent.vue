<template>

  <q-page class="q-px-md q-py-sm q-py-md-lg bg-voucher">
    <div class="center maxWidth-90-950">
      <div class="text-center relative-position bg-voucherBox q-pa-sm-xl q-pa-md q-mb-md q-mb-lg-md ">
        <q-img src="../assets/bg-voucher-open.png" contain
             width="90%"
             class="q-my-none center" />
        <q-form ref="voucherForm"
                @submit="onSubmit"
                class="row q-col-gutter-y-lg q-col-gutter-x-md q-my-none center">
          <div class="text-left ">
            <p class="text-white text-h4">Jetzt Gutschein einlösen und einen Termin zur Energie-Nutzen-Analyse vereinbaren.</p>
            <a class="text-yellow-10 text-caption" href="https://daszahlt.siccro.com/assets/gutschein-energiecheck.pdf" target="_blank">Gutschein ansehen/drucken</a>
          </div>
          <q-input square borderless filled readonly dark
                   input-style="color: yellow-10"
                   v-model="voucher"
                   label="Ihr persönlicher Gutscheincode"
                   label-color="yellow-10"
                   class="col-12 q-mb-md text-h5">
            <template v-slot:append>
                        <q-icon
                        size="lg"
                        name="card_giftcard"/>
                      </template>
          </q-input>
          <q-input square borderless filled dark
                   type="text"
                   class="col-12 col-sm-6 col-md-4"
                   v-model="firstname"
                   label="Vorname*"
                   label-color="yellow-10"
                   lazy-rules
                   :rules="[val => val !== null && val !== '' || 'Bitte nennen Sie uns ihren Vornamen.']" />
          <q-input square borderless filled dark
                   type="text"
                   class="col-12 col-sm-6 col-md-4"
                   v-model="lastname"
                   label="Nachname*"
                   label-color="yellow-10"
                   lazy-rules
                   :rules="[val => val !== null && val !== '' || 'Bitte nennen Sie uns ihren Nachnamen.']" />
          <q-input square borderless filled dark
                   type="text"
                   class="col-12 col-sm-12 col-md-4"
                   error-color="white"
                   v-model="jsonData.phone"
                   label="Rückrufnummer*"
                   label-color="yellow-10"
                   lazy-rules
                   :rules="[
                       val => val !== null && val !== '' || 'Bitte nennen Sie ihre Telefonnummer.']" />
          <small class="text-grey-6 q-pt-md float-right relative-position q-py-none">* Angaben erforderlich</small>
          <p class="col-12 text-white text-left text-h4">Wann dürfen wir Sie anrufen?</p>
          <!-- <q-field square borderless filled stack-label dark
                           label="Wann haben Sie Zeit für einen Rückruf?"
                           label-color="yellow-10"
                           class="q-pt-none"
                           style="width: 100%;">
                    <template v-slot:control>
                        <q-item style="width: 100%;">
                          <q-item-section avatar>
                            <q-icon name="watch_later" />
                          </q-item-section>
                          <q-item-section>
                            <q-range
                              v-model="jsonData.note"
                              :min="8"
                              :max="21"
                              :step="1"
                              label
                              :left-label-value="jsonData.note.min + ' Uhr'"
                              :right-label-value="jsonData.note.max + ' Uhr'"
                              snap
                              color="yellow-10"
                              class="q-mb-none q-pb-none"
                            />
                            </q-item-section>
                            <q-item-section avatar>
                              <q-icon name="query_builder" />
                            </q-item-section>
                         </q-item>
                        <div class="self-center full-width no-outline text-center" tabindex="0">zwischen {{jsonData.note.min}} Uhr und {{jsonData.note.max}} Uhr</div>
                      </template>
                  </q-field> -->
          <q-select square borderless filled stack-label dark
                    :disable="timeAllday"
                    v-model="timeFrom"
                    :options="timeOptions"
                    prefix="ab"
                    label="Uhrzeit"
                    label-color="yellow-10"
                    popup-content-style="background-color: #6b6b6b; color: white; border-radius: none;"
                    class="col-12 col-sm-6 col-md-4" />
          <q-select square borderless filled stack-label dark
                    :disable="timeAllday"
                    v-model="timeTill"
                    :options="timeOptions"
                    prefix="bis"
                    label="Uhrzeit"
                    label-color="yellow-10"
                    popup-content-style="background-color: #6b6b6b; color: white; border-radius: none;"
                    class="col-12 col-sm-6 col-md-4"
                    style="color: white;" />
          <q-checkbox dark
                      v-model="timeAllday"
                      label="den ganzen Tag"
                      color="yellow-10"
                      class="col-12 col-sm-6 col-md-4"
                      style="color: white !important;" />
          <q-item tag="label" v-ripple:yellow-10
                  style="width: 100%;"
                  class="q-my-lg q-px-none q-py-md">
            <q-item-section avatar>
              <q-toggle v-model="accept" dark
                        checked-icon="check"
                        unchecked-icon="clear"
                        color="yellow-10" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-left text-white q-py-xs">Ich habe die <a href="https://siccro.com/datenschutz/" target="_blank" class="text-white">Datenschutzerklärung</a>              gelesen und stimme zu.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-btn flat
                 type="submit"
                 size="lg"
                 label="Ja, rufen Sie mich bitte zurück!"
                 class="q-my-lg q-py-none"
                 style="width: 100%; background: linear-gradient(60deg, #df6c1a, #df6c1a, #f0a94e, #ff8a00); color: white;">
            <q-inner-loading :showing="visible">
              <q-spinner size="50px" color="yellow-10" />
            </q-inner-loading>
          </q-btn>
        </q-form>
        <div class="text-left text-grey-6 text-caption q-mt-md" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))">
          <div class="q-pa-sm" >
            <p>SICCRO®
              eingetragene Marke der<br />
              SYMAK SWISS AG<br />
              Haltnaustrasse 3<br />
              8597 Münsterlingen/ Landschlacht<br />
              Schweiz<br />
              </p>
          </div>
          <div class="q-pa-sm">
            <p>Weitere Informationen zu unseren Leistungen und Produkten erfahren Sie unter:<br /><br />
              kundenservice@siccro.com<br />
              <a class="text-grey-6" href="https://siccro.com">www.siccro.com</a>
              </p>
          </div>
          <div class="q-pa-sm">
            <p>Zentrale Schweiz<br />
              CH-Tel.: +4144 784 40 00
              <br /><br />
              Kundenservice Österreich<br />
              AT-Tel.: +43 662 27 55 00
              </p>
          </div>
          <div class="q-pa-sm">
            <p>CH-UID: CHE-231.663.692<br />
              AT-UID: ATU69932889</p>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pr-md-xl q-my-md text-right	">
      <svg width="15vh"
           fill="white"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 308.46 138.03"><title>Element 1</title><g id="Ebene_2" data-name="Ebene 2"><g id="Ebene_1-2" data-name="Ebene 1"><path d="M0,2.52H19.86c13.92,0,23.46,8.1,23.46,21s-9.54,21-23.46,21H0ZM19.38,35c7.14,0,11.94-4.26,11.94-11.52S26.52,12,19.38,12h-7.5V35Z"/><path d="M78.9,26.46V44.52H68.28v-4.2c-1.62,3.12-4.86,4.74-9.6,4.74-7.8,0-12.12-4.38-12.12-10,0-6,4.38-9.72,14.46-9.72H67.5c-.18-3.3-2.4-5.16-6.9-5.16A15.15,15.15,0,0,0,51.78,23l-3.84-7.74c3.72-2.46,9.24-3.78,14.34-3.78C72.84,11.46,78.9,16.14,78.9,26.46ZM67.5,34.08V31.26H62.58c-3.66,0-5,1.32-5,3.3s1.56,3.3,4.26,3.3A5.62,5.62,0,0,0,67.5,34.08Z"/><path d="M82.92,41.7l3.42-7.8a22.81,22.81,0,0,0,11.34,3c3.84,0,5.1-.84,5.1-2.22,0-4.38-19.2.6-19.2-12.42,0-6.12,5.64-10.8,15.84-10.8,4.56,0,9.6,1,12.84,2.76L108.84,22a19.06,19.06,0,0,0-9.36-2.4c-3.84,0-5.22,1.08-5.22,2.28,0,4.5,19.14-.36,19.14,12.54,0,6-5.52,10.68-16.08,10.68C91.8,45.06,86.1,43.68,82.92,41.7Z"/><path d="M135.12,2.52H155c13.92,0,23.46,8.1,23.46,21s-9.54,21-23.46,21H135.12ZM154.5,35c7.14,0,11.94-4.26,11.94-11.52S161.64,12,154.5,12H147V35Z"/><path d="M213.72,26.46V44.52H203.1v-4.2c-1.62,3.12-4.86,4.74-9.6,4.74-7.8,0-12.12-4.38-12.12-10,0-6,4.38-9.72,14.46-9.72h6.48c-.18-3.3-2.4-5.16-6.9-5.16A15.15,15.15,0,0,0,186.6,23l-3.84-7.74c3.72-2.46,9.24-3.78,14.34-3.78C207.66,11.46,213.72,16.14,213.72,26.46Zm-11.4,7.62V31.26H197.4c-3.66,0-5,1.32-5,3.3s1.56,3.3,4.26,3.3A5.62,5.62,0,0,0,202.32,34.08Z"/><path d="M218.46,28.2c0-9.78,7.74-16.74,18.66-16.74,7.38,0,13,3.3,15.23,8.94l-8.81,4.5c-1.57-3.06-3.84-4.38-6.49-4.38-4,0-7.07,2.76-7.07,7.68s3.12,7.8,7.07,7.8c2.65,0,4.92-1.32,6.49-4.38l8.81,4.5c-2.22,5.64-7.85,8.94-15.23,8.94C226.2,45.06,218.46,38.1,218.46,28.2Z"/><path d="M290.27,25.92v18.6H278.88V27.78c0-4.68-2.05-6.66-5.34-6.66-3.66,0-6.48,2.28-6.48,7.68V44.52h-11.4V0h11.4V15a14.09,14.09,0,0,1,9.77-3.54C284.46,11.46,290.27,15.84,290.27,25.92Z"/><path d="M294.78,38.28a6.84,6.84,0,0,1,13.68,0,6.84,6.84,0,0,1-13.68,0Z"/><path d="M0,57.89H19.86c13.92,0,23.46,8.1,23.46,21s-9.54,21-23.46,21H0ZM19.38,90.41c7.14,0,11.94-4.26,11.94-11.52s-4.8-11.52-11.94-11.52h-7.5v23Z"/><path d="M78.9,81.83V99.89H68.28v-4.2c-1.62,3.12-4.86,4.74-9.6,4.74-7.8,0-12.12-4.38-12.12-10,0-6,4.38-9.72,14.46-9.72H67.5c-.18-3.3-2.4-5.16-6.9-5.16a15.15,15.15,0,0,0-8.82,2.82l-3.84-7.74c3.72-2.46,9.24-3.78,14.34-3.78C72.84,66.83,78.9,71.51,78.9,81.83ZM67.5,89.45V86.63H62.58c-3.66,0-5,1.32-5,3.3s1.56,3.3,4.26,3.3A5.62,5.62,0,0,0,67.5,89.45Z"/><path d="M82.92,97.07l3.42-7.8a22.81,22.81,0,0,0,11.34,3c3.84,0,5.1-.84,5.1-2.22,0-4.38-19.2.6-19.2-12.42,0-6.12,5.64-10.8,15.84-10.8,4.56,0,9.6,1,12.84,2.76l-3.42,7.74a19.06,19.06,0,0,0-9.36-2.4c-3.84,0-5.22,1.08-5.22,2.28,0,4.5,19.14-.36,19.14,12.54,0,6-5.52,10.68-16.08,10.68C91.8,100.43,86.1,99.05,82.92,97.07Z"/><path d="M164.7,91.37v8.52h-30V93.17l15.06-17.34H135.12V67.37h29V74L149,91.37Z"/><path d="M201.42,81.83V99.89H190.8v-4.2c-1.62,3.12-4.86,4.74-9.6,4.74-7.8,0-12.12-4.38-12.12-10,0-6,4.38-9.72,14.46-9.72H190c-.18-3.3-2.4-5.16-6.9-5.16a15.15,15.15,0,0,0-8.82,2.82l-3.84-7.74c3.72-2.46,9.24-3.78,14.34-3.78C195.36,66.83,201.42,71.51,201.42,81.83ZM190,89.45V86.63H185.1c-3.66,0-5,1.32-5,3.3s1.56,3.3,4.26,3.3A5.62,5.62,0,0,0,190,89.45Z"/><path d="M242.33,81.29v18.6H230.94V83.15c0-4.68-2-6.66-5.34-6.66-3.66,0-6.48,2.28-6.48,7.68V99.89h-11.4V55.37h11.4v15a14.09,14.09,0,0,1,9.78-3.54C236.52,66.83,242.33,71.21,242.33,81.29Z"/><path d="M248.58,55.37H260V99.89h-11.4Z"/><path d="M292.43,98.57a15.32,15.32,0,0,1-7.92,1.86c-8.34,0-13.2-4.08-13.2-12.42V77.09h-4.73V68.57h4.73V60.11h11.4v8.46h7.44v8.52h-7.44v10.8c0,2.4,1.38,3.72,3.42,3.72a6.24,6.24,0,0,0,3.48-1Z"/><path d="M294.77,93.65a6.84,6.84,0,0,1,13.68,0,6.84,6.84,0,0,1-13.68,0Z"/><path d="M1,122.57h4.9c3.85,0,6.45,2.47,6.45,6s-2.6,6-6.45,6H1ZM5.8,133.5c3.2,0,5.26-2,5.26-4.92S9,123.67,5.8,123.67H2.24v9.83Z"/><path d="M21.74,129v5.6H20.57v-1.41a3.39,3.39,0,0,1-3.11,1.5c-2.05,0-3.3-1.07-3.3-2.63,0-1.39.89-2.56,3.49-2.56h2.87V129c0-1.55-.88-2.39-2.56-2.39a4.62,4.62,0,0,0-3,1.06l-.55-.91a5.76,5.76,0,0,1,3.68-1.22C20.42,125.49,21.74,126.66,21.74,129Zm-1.22,2.89v-1.48H17.68c-1.75,0-2.32.69-2.32,1.61s.85,1.71,2.29,1.71A2.9,2.9,0,0,0,20.52,131.89Z"/><path d="M23.81,133.57l.55-1a5.43,5.43,0,0,0,3.21,1c1.72,0,2.43-.58,2.43-1.48,0-2.35-5.87-.49-5.87-4.07,0-1.48,1.27-2.58,3.58-2.58a6.2,6.2,0,0,1,3.2.84l-.54,1a4.61,4.61,0,0,0-2.66-.77c-1.63,0-2.36.63-2.36,1.49,0,2.45,5.87.61,5.87,4.08,0,1.56-1.38,2.58-3.73,2.58A6,6,0,0,1,23.81,133.57Z"/><path d="M46.74,133.5v1.1H38.23v-12h8.26v1.1h-7V128h6.23V129H39.5v4.47Z"/><path d="M57.8,129.36v5.24H56.58v-5.12c0-1.91-1-2.89-2.72-2.89a3,3,0,0,0-3.16,3.27v4.74H49.48v-9h1.17v1.67a3.8,3.8,0,0,1,3.44-1.74C56.29,125.49,57.8,126.76,57.8,129.36Z"/><path d="M69,130.46H61.46A3.35,3.35,0,0,0,65,133.61a3.58,3.58,0,0,0,2.77-1.19l.69.79a4.78,4.78,0,0,1-8.24-3.13,4.36,4.36,0,0,1,4.42-4.59,4.31,4.31,0,0,1,4.39,4.59C69.05,130.18,69,130.32,69,130.46Zm-7.57-.91h6.42a3.22,3.22,0,0,0-6.42,0Z"/><path d="M76.1,125.49v1.19l-.3,0c-1.89,0-3,1.2-3,3.33v4.61H71.54v-9h1.17v1.77A3.41,3.41,0,0,1,76.1,125.49Z"/><path d="M86.58,125.56v7.94c0,3.12-1.53,4.53-4.52,4.53a6.26,6.26,0,0,1-4.21-1.4l.62-.93A5.34,5.34,0,0,0,82,136.94c2.28,0,3.33-1.05,3.33-3.28v-1.15a4.05,4.05,0,0,1-3.52,1.75,4.39,4.39,0,1,1,0-8.77,4.08,4.08,0,0,1,3.57,1.8v-1.73Zm-1.18,4.3A3.43,3.43,0,1,0,82,133.18,3.24,3.24,0,0,0,85.4,129.86Z"/><path d="M89.73,122.7a.89.89,0,0,1,.89-.86.87.87,0,1,1,0,1.74A.88.88,0,0,1,89.73,122.7Zm.28,2.86h1.22v9H90Z"/><path d="M102.51,130.46H94.94a3.35,3.35,0,0,0,3.56,3.15,3.58,3.58,0,0,0,2.77-1.19l.69.79a4.78,4.78,0,0,1-8.24-3.13,4.35,4.35,0,0,1,4.42-4.59,4.31,4.31,0,0,1,4.38,4.59C102.52,130.18,102.51,130.32,102.51,130.46Zm-7.57-.91h6.41a3.21,3.21,0,0,0-6.41,0Z"/><path d="M113.27,121.84V134.6H112.1v-1.79a3.9,3.9,0,0,1-3.49,1.88,4.6,4.6,0,0,1,0-9.2,4,4,0,0,1,3.44,1.79v-5.44Zm-1.2,8.24a3.37,3.37,0,1,0-3.36,3.53A3.31,3.31,0,0,0,112.07,130.08Z"/><path d="M123.5,129v5.6h-1.17v-1.41a3.39,3.39,0,0,1-3.11,1.5c-2,0-3.3-1.07-3.3-2.63,0-1.39.89-2.56,3.49-2.56h2.87V129c0-1.55-.88-2.39-2.56-2.39a4.62,4.62,0,0,0-3,1.06l-.55-.91a5.76,5.76,0,0,1,3.68-1.22C122.18,125.49,123.5,126.66,123.5,129Zm-1.22,2.89v-1.48h-2.84c-1.75,0-2.32.69-2.32,1.61s.84,1.71,2.29,1.71A2.9,2.9,0,0,0,122.28,131.89Z"/><path d="M125.94,130.08a4.45,4.45,0,0,1,4.66-4.59,3.94,3.94,0,0,1,3.54,1.79l-.91.62a3.08,3.08,0,0,0-2.63-1.34,3.53,3.53,0,0,0,0,7.05,3.07,3.07,0,0,0,2.63-1.33l.91.62a4,4,0,0,1-3.54,1.79A4.47,4.47,0,0,1,125.94,130.08Z"/><path d="M144.72,129.36v5.24H143.5v-5.12c0-1.91-1-2.89-2.72-2.89a3,3,0,0,0-3.16,3.27v4.74H136.4V121.84h1.22v5.3a3.81,3.81,0,0,1,3.38-1.65C143.21,125.49,144.72,126.76,144.72,129.36Z"/><path d="M160.8,121.84V134.6h-1.17v-1.79a3.91,3.91,0,0,1-3.49,1.88,4.6,4.6,0,0,1,0-9.2,4,4,0,0,1,3.44,1.79v-5.44Zm-1.21,8.24a3.36,3.36,0,1,0-3.35,3.53A3.3,3.3,0,0,0,159.59,130.08Z"/><path d="M172.08,130.46h-7.57a3.35,3.35,0,0,0,3.56,3.15,3.58,3.58,0,0,0,2.77-1.19l.69.79a4.78,4.78,0,0,1-8.24-3.13,4.35,4.35,0,0,1,4.42-4.59,4.31,4.31,0,0,1,4.38,4.59C172.09,130.18,172.08,130.32,172.08,130.46Zm-7.57-.91h6.41a3.21,3.21,0,0,0-6.41,0Z"/><path d="M179.14,125.49v1.19l-.29,0c-1.89,0-3,1.2-3,3.33v4.61h-1.22v-9h1.17v1.77A3.41,3.41,0,0,1,179.14,125.49Z"/><path d="M194.93,133.5v1.1h-9.87v-.87l8-10.06h-7.86v-1.1h9.54v.87l-8,10.06Z"/><path d="M205.19,125.56v9H204V133a3.59,3.59,0,0,1-3.25,1.74c-2.3,0-3.81-1.29-3.81-3.89v-5.24h1.22v5.12c0,1.93,1,2.91,2.71,2.91,1.9,0,3.08-1.22,3.08-3.29v-4.74Z"/><path d="M212,130.06l-2.14,2v2.58h-1.22V121.84h1.22v8.65l5.4-4.93h1.52l-3.87,3.7,4.23,5.34h-1.5Z"/><path d="M226.93,125.56v9h-1.17V133a3.61,3.61,0,0,1-3.25,1.74c-2.31,0-3.82-1.29-3.82-3.89v-5.24h1.22v5.12c0,1.93,1,2.91,2.72,2.91,1.89,0,3.08-1.22,3.08-3.29v-4.74Z"/><path d="M238.67,129.36v5.24h-1.22v-5.12c0-1.91-1-2.89-2.72-2.89a3,3,0,0,0-3.16,3.27v4.74h-1.22v-9h1.17v1.67a3.8,3.8,0,0,1,3.44-1.74C237.16,125.49,238.67,126.76,238.67,129.36Z"/><path d="M243.38,124.49v1.07h2.79v1h-2.75v8H242.2v-8h-1.62v-1h1.62v-1.12a2.48,2.48,0,0,1,2.73-2.68,2.88,2.88,0,0,1,1.81.57l-.42.91a2,2,0,0,0-1.34-.45C243.93,122.79,243.38,123.37,243.38,124.49Z"/><path d="M252.58,134.05a2.9,2.9,0,0,1-1.91.64,2.4,2.4,0,0,1-2.65-2.63v-5.47h-1.61v-1H248v-2h1.23v2H252v1h-2.75V132a1.44,1.44,0,0,0,1.56,1.65,2,2,0,0,0,1.34-.46Z"/><path d="M254.18,133.74a.91.91,0,0,1,.91-.93.93.93,0,0,1,.93.93.94.94,0,0,1-.93.95A.92.92,0,0,1,254.18,133.74Z"/></g></g></svg>
    </div>
    <q-dialog v-model="thankyouVoucher">
      <q-card style="width: 90vw; max-width: 400px;">
        <q-img contain
               src="../assets/gutschein.png"
               height="30vh" />

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6">
              Vielen Dank für Ihre Anfrage!
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mb-md">
            Unser Team setzt sich in Kürze und innerhalb der angegebenen Uhrzeiten mit Ihnen in Verbindung!
          </div>
          <div class="text-caption text-grey">
            Für weitere Informationen besuchen Sie unsere Website unter: <a href="https://siccro.com" target="_blank">www.siccro.com</a>.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat
                 color="primary"
                 label="Schließen" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="text-center">
      <a class="text-yellow-10 text-caption" href="https://siccro.com/impressum/">Impressum</a><span class="text-white q-mx-sm">|</span><a class="text-yellow-10 text-caption" href="https://siccro.com/datenschutz/">Datenschutz</a>
    </div>
  </q-page>

</template>

<script>

  export default {
    data() {
      return {
        firstname: this.$route.query.firstname,
        lastname: this.$route.query.lastname,
        accept: false,
        timeFrom: '9 Uhr',
        timeTill: '16 Uhr',
        timeAllday: false,
        timeOptions: [
          '8 Uhr',
          '9 Uhr',
          '10 Uhr',
          '11 Uhr',
          '12 Uhr',
          '13 Uhr',
          '14 Uhr',
          '15 Uhr',
          '16 Uhr',
          '17 Uhr',
          '18 Uhr',
          '19 Uhr'
        ],
        jsonData: {
          note: null,
          phone: this.$route.query.phone
        },
        visible: false,
        thankyouVoucher: false
      }
    },
    computed: {
      noteString: {
        get() {
          return (
            'Der Kunde möchte zwischen ' +
            this.timeFrom +
            ' und ' +
            this.timeTill +
            ' angerufen werden.' +
            '\nGutscheincode: ' +
            this.voucher
          )
        }
      },
      noteStringAllday: {
        get() {
          return 'Der Kunde hat den ganzen Tag Zeit: ' + '\nGutscheincode: ' + this.voucher
        }
      },
      voucher: function() {
        return 'Energiedach' + this.lastname + Math.floor(Math.random() * (999 - 100 + 1) + 100)
      },
      sendJson: {
        get() {
          return JSON.stringify(this.jsonData, null, 4)
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.voucherForm.validate().then(valid => {
          if (valid) {
            if (this.accept !== true) {
              this.$q.notify({
                message: 'Bitte akzeptieren Sie die Datenschutzerklärung.',
                color: 'deep-orange-6',
                icon: 'announcement'
              })
            } else {
              const jsonHeader = {
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
              }

              if (this.timeAllday == true) {
                this.jsonData.note = this.noteStringAllday
              } else {
                this.jsonData.note = this.noteString
              }

              const sendJson = JSON.stringify(this.jsonData, null, 4)

              this.visible = true
              this.showSimulatedReturnData = false
              const url = 'https://siccro-expertise.herokuapp.com/api/1.0.0/siccro/contact/note'
              this.$axios
                .post(url, sendJson, jsonHeader)

                .then(response => {
                  console.log(response)
                  console.log(sendJson)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(function() {})

              this.thankyouVoucher = true

              setTimeout(() => {
                this.visible = false
                this.showSimulatedReturnData = true
              }, 2000)
            }
          } else {
            this.$q.notify({
              message: 'Bitte füllen sie die Pflichtfelder aus.',
              color: 'deep-orange-6',
              icon: 'announcement'
            })
          }
        })
      }
    }
  }

</script>

<style lang="scss" >

  .pageBg {
    background-repeat: no-repeat;
    background-image: linear-gradient(33deg, $primary, #3a3a3a);
  }
  .borderRadius {
    border-radius: 9px;
  }

</style>
