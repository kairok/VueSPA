<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>
             </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field prepend-icon="person"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                  ></v-text-field>
                  <v-text-field id="password"
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                type="password"
                                :counter="6"
                                v-model="password"
                                 :rules="passwordRules"
                  ></v-text-field>
                  <v-text-field id="confirmpassword"
                                prepend-icon="lock"
                                name="confirm-password"
                                label="Confirm Password"
                                type="password"
                                :counter="6"
                                v-model="confirmpassword"
                                 :rules="confirmpasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="onSubmit"
                  :loading = "loading"
                  :disabled="!valid || loading"
                >Create Account</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
   export default {
    data() {
      return {
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
        password: '',
        passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
        confirmpassword:'',
        confirmpasswordRules: [
        v => !!v || 'Password is required',
        v => v == this.password || 'Password should match'
      ],
         valid: false
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
        }
    },
     methods: {
      onSubmit() {
        //Login
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('registerUser', user)
            .then(() => {
                this.$router.push('/')
              }
            )
            .catch(err => console.log(err))

          console.log(user)
        }
      }
     }

  }
</script>

<style scoped>

</style>

