<template>
  <v-container class="fill-height" fluit>    
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window :value="1">
              <v-row>
                <v-col class="my-auto" cols="12" md="4">
                  <v-img :src="require('../assets/wave.svg')" class="my-3" contain  height="200" />
                </v-col>
                <v-col cols="12" md="8" class="px-6 py-6">
                  <h1 class="text-center display-1 blue--text text--accent-3">Formulario de Contacto</h1>
                  <h4 class="text-center my-4">Contactanos y te responderemos</h4>

                  <v-alert v-if="submitStatus == 'ok'" dense text type="success">
                    Su datos fueron enviados con <strong>Éxito</strong>.
                  </v-alert>
                  <v-alert v-if="submitStatus == 'Error Grave'" dense outlined type="error"> Ocurrio un problema al guardar los datos</v-alert>

                  <form @submit.prevent="submit">
                    <v-text-field v-model="form.nombre" label="NOMBRE" placeholder="Ingrese su nombre" :counter="80" :error-messages="nombreErrors" @input="$v.form.nombre.$touch()" @blur="$v.form.nombre.$touch()" outlined />

                    <v-text-field v-model="form.dni" required label="DNI" placeholder="Ingrese su dni" :counter="8" :error-messages="dniErrors" @input="$v.form.dni.$touch()" @blur="$v.form.dni.$touch()" outlined />

                    <v-text-field v-model="form.celular" required label="CELULAR" placeholder="Ingrese su celular" :counter="9" :error-messages="celularErrors" @input="$v.form.celular.$touch()" @blur="$v.form.celular.$touch()" outlined />

                    <v-text-field v-model="form.correo" required label="CORREO" placeholder="Ingrese su correo" :error-messages="correoErrors" @input="$v.form.correo.$touch()" @blur="$v.form.correo.$touch()" outlined />

                    <v-btn v-if="submitStatus === null" class="mr-4" @click="submit" color="success">ENVIAR</v-btn>
                    <v-btn v-else class="mr-4"> {{submitStatus}} </v-btn>
                    <v-btn @click="clear">LIMPIAR</v-btn>

                  </form>
                </v-col>
              </v-row>
            </v-window>
          </v-window>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, email, numeric, alpha  } from 'vuelidate/lib/validators'
  //import store from 'vuex'
  export default {
    name: 'ContactRecord',
    mixins: [validationMixin],
    data: () => ({
      step: 1,
      submitStatus: null,
      form: {
        nombre: 'max',
        dni: '46481067',
        celular: '98563254',
        correo: 'max_@gmail.com'
      } 
    }),
    validations: {
      form: { 
        nombre:  { required, maxLength: maxLength(80), alpha },
        dni:     { required, minLength: minLength(8), maxLength: maxLength(8), numeric },
        celular: { required, maxLength: maxLength(9), numeric },
        correo:  { required, email },
      }
    },
    computed: {
      nombreErrors () {
        const errors = []
        if (!this.$v.form.nombre.$dirty) return errors
            !this.$v.form.nombre.maxLength && errors.push('El nombre debe tener como máximo 80 caracteres')
            !this.$v.form.nombre.alpha     && errors.push('Solo acepta letras')
            !this.$v.form.nombre.required  && errors.push('nombre es requerido.')
            return errors
      },
      dniErrors () {
        const errors = []
        if (!this.$v.form.dni.$dirty) return errors
            !this.$v.form.dni.minLength && errors.push('El dni debe tener como minimo 8 caracteres')
            !this.$v.form.dni.maxLength && errors.push('El dni debe tener como máximo 8 caracteres')
            !this.$v.form.dni.numeric && errors.push('Solo acepta numeros')
            !this.$v.form.dni.required  && errors.push('dni es requerido.')
            return errors
      },
      celularErrors () {
        const errors = []
        if (!this.$v.form.celular.$dirty) return errors
            !this.$v.form.celular.maxLength && errors.push('El celular debe tener como máximo 9 caracteres')
            !this.$v.form.celular.numeric && errors.push('Solo acepta numeros')
            !this.$v.form.celular.required && errors.push('celular es requerido.')
            return errors
      },
      correoErrors () {
        const errors = []
        if (!this.$v.form.correo.$dirty) return errors
            !this.$v.form.correo.email && errors.push('Debe ser válida el correo electrónico')
            !this.$v.form.correo.required && errors.push('correo es requerido')
            return errors
      },
    },
    methods: {
      async submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'CARGANDO...'
          this.$store.commit('SET_DATA_FORM', this.form)
          try {
            await this.$store.dispatch('guardarDaraForm')
            .then(function (res) {
              this.submitStatus = 'ok'
              console.log('todo bien', res);
            })
            .catch(error => {
              this.submitStatus = 'Error Grave'
              console.log('grande problema: ', error);
            })
          }catch (error) {
            this.submitStatus = null
            console.log("Error: SignInForm.handleSubmit", error);
          }
        }
        setTimeout(() => { this.submitStatus = null }, 5000)
      },
      clear () {
        this.$v.$reset()
        this.nombre = ''
        this.dni = ''
        this.celular = ''
        this.correo = ''
      },
    },
  }
</script>
