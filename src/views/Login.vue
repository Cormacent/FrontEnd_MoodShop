<template>
  <div class="login">
    <section class="wrapper">
      <article class="image-login">
        <img src="../assets/icon/login.jpg" class="icon-cartempty" alt="" />
      </article>
      <article class="login-form bg-dark">
        <div class="login-view" v-if="loginView === true">
          <h3 class="text-white mb-5">SIGN IN</h3>
          <b-form class="m-3" @submit.prevent="submitLogin">
            <b-row>
              <b-col sm="2">
                <fa-icon
                  class="text-white"
                  :icon="['fas', 'envelope']"
                  size="2x"
                />
              </b-col>
              <b-col sm="10">
                <b-form-input
                  placeholder="example@gmail.com"
                  type="email"
                  autofocus
                  v-model="formLogin.email"
                  required
                >
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="2">
                <fa-icon class="text-white" :icon="['fas', 'lock']" size="2x" />
              </b-col>
              <b-col sm="10">
                <b-form-input
                  placeholder="This is a secret"
                  v-model="formLogin.password"
                  type="password"
                  required
                  :state="validateLogin"
                >
                </b-form-input>
                <b-form-invalid-feedback :state="validateLogin">
                  Password must be at least 6 characters long!
                </b-form-invalid-feedback>
              </b-col> </b-row
            ><br />
            <!-- <div class="form-group text-right">
              <a href="#" class="forget" value="Login">Forgot Password?</a>
            </div> -->
            <br />
            <b-button variant="info" type="submit" block>Sign In</b-button>
          </b-form>
          <p class="text-white">
            don't have account?
            <span
              class="text-primary"
              style="cursor: pointer"
              v-on:click="changeView"
            >
              Sign up here..</span
            >
          </p>
        </div>

        <!-- REGISTER VIEW -->
        <div class="register-view" v-else>
          <h3 class="text-white mb-5">SIGN UP</h3>
          <b-form class="m-3" @submit.prevent="submitRegister">
            <b-row>
              <b-col sm="2">
                <fa-icon
                  class="text-white"
                  :icon="['fas', 'envelope']"
                  size="2x"
                />
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-name-register"
                  placeholder="example@gmail.com"
                  autofocus
                  required
                  v-model="formRegister.email"
                  v-on:keyup.enter="submitRegister"
                  type="email"
                >
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="2">
                <fa-icon class="text-white" :icon="['fas', 'user']" size="2x" />
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-name-register"
                  placeholder="example"
                  v-model="formRegister.name"
                  v-on:keyup.enter="submitRegister"
                  required
                >
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="2">
                <fa-icon class="text-white" :icon="['fas', 'lock']" size="2x" />
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-password-register"
                  type="password"
                  placeholder="This is a secret"
                  v-model="formRegister.password"
                  v-on:keyup.enter="submitRegister"
                  required
                  :state="validateRegis"
                >
                </b-form-input>
                <b-form-invalid-feedback :state="validateRegis">
                  Password must be at least 6 characters long!
                </b-form-invalid-feedback>
              </b-col> </b-row
            ><br />
            <div class="form-group text-right"></div>
            <br />
            <b-button variant="info" type="submit" block>Sign Up</b-button>
          </b-form>
          <p class="text-white">
            already have account?
            <span
              class="text-primary"
              style="cursor: pointer"
              v-on:click="changeView"
            >
              Sign in here..</span
            >
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginView: true,
      formLogin: {
        email: null,
        password: null,
      },
      formRegister: {
        email: null,
        name: null,
        password: null,
      },
    };
  },
  methods: {
    changeView() {
      if (this.loginView === true) {
        this.loginView = false;
      } else {
        this.loginView = true;
      }
    },

    submitLogin() {
      if (!this.formLogin.email || !this.formLogin.password) {
        alert("Please enter your email and password !");
      } else {
        if (!this.validateLogin) {
          this.resetInput();
          return alert("Password must be at least 6 characters long!");
        }
        this.$store
          .dispatch("getToken", this.formLogin)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      }
    },
    submitRegister() {
      if (
        this.formRegister.email == null ||
        this.formRegister.password == null ||
        this.formRegister.name == null
      ) {
        alert("Please enter your email and password !");
      } else {
        if (!this.validateRegis) {
          this.resetInput();
          return alert("Password must be at least 6 characters long!");
        }
        this.$store
          .dispatch("createAccount", this.formRegister)
          .then(() => {
            alert(
              "success create account, please log in using the account you created earlier"
            );
            this.loginView = true;
            this.resetInput;
          })
          .catch((err) => {
            this.resetInput;
            alert(err);
          });
      }
    },
    resetInput() {
      this.formRegister.email == null;
      this.formRegister.password == null;
      this.formRegister.name == null;
      this.formRegister.email == null;
      this.formRegister.password == null;
    },
  },
  computed: {
    validateLogin() {
      if (this.formLogin.password) {
        return this.formLogin.password.length >= 6;
      } else {
        return false;
      }
    },
    validateRegis() {
      if (this.formRegister.password) {
        return this.formRegister.password.length > 6;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background: rgba(190, 195, 202, 0.3);
}
.wrapper {
  background-color: white;
  width: 60%;
  height: 70%;
  overflow: auto;
  display: flex;
  justify-content: space-evenly;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.image-login {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.login-form {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
}
img {
  width: 100%;
}
@media screen and (max-width: 360px) {
  .image-login {
    display: none;
  }
  .login-form {
    width: 100%;
  }
  .wrapper {
    width: 80%;
    height: 80%;
  }
}
@media screen and (min-width: 361px) {
  .image-login {
    display: none;
  }
  .login-form {
    width: 100%;
  }
  .wrapper {
    width: 80%;
    height: 80%;
  }
}
@media screen and (min-width: 1200px) {
  .image-login {
    display: flex;
  }
  .login-form {
    width: 50%;
  }
  .wrapper {
    width: 60%;
    height: 70%;
  }
}
</style>