<template>
  <div class="login">
    <section class="wrapper">
      <article class="image-login">
        <img src="../assets/icon/login.jpg" class="icon-cartempty" alt="" />
      </article>
      <article class="login-form bg-dark">
        <div class="login-view" v-if="loginView === true">
          <h3 class="text-white mb-5">SIGN IN</h3>
          <b-form class="m-3">
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
                  autofocus
                  v-model="formLogin.email"
                  v-on:keyup.enter="submitLogin"
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
                  v-on:keyup.enter="submitLogin"
                  required
                >
                </b-form-input>
              </b-col> </b-row
            ><br />
            <div class="form-group text-right">
              <a href="#" class="forget" value="Login">Forgot Password?</a>
            </div>
            <br />
            <b-button variant="info" v-on:click="submitLogin" block
              >Sign In</b-button
            >
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
        <div class="register-view" v-else>
          <h3 class="text-white mb-5">SIGN UP</h3>
          <b-form class="m-3">
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
                  id="input-name-category"
                  placeholder="example@gmail.com"
                  autofocus
                  v-model="formRegister.email"
                  v-on:keyup.enter="submitRegister"
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
                  id="input-name-category"
                  placeholder="example"
                  v-model="formRegister.name"
                  v-on:keyup.enter="submitRegister"
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
                  id="input-name-category"
                  type="password"
                  placeholder="This is a secret"
                  v-model="formRegister.password"
                  v-on:keyup.enter="submitRegister"
                >
                </b-form-input>
              </b-col> </b-row
            ><br />
            <div class="form-group text-right"></div>
            <br />
            <b-button variant="info" v-on:click="submitRegister" block
              >Sign Up</b-button
            >
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
        email: "",
        name: "",
        password: "",
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
      if (this.formLogin.email == null || this.formLogin.password == null) {
        alert("Please enter your email and password !");
      } else {
        this.$store
          .dispatch("getToken", this.formLogin)
          .then((res) => {
            alert(res.role);
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
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
        this.$store
          .dispatch("createAccount", this.formRegister)
          .then((res) => {
            alert(
              "success create account, please log in using the account you created earlier"
            );
            console.log(res);
            this.loginView = true;
            this.resetInput;
          })
          .catch((err) => {
            this.resetInput;
            console.log(err);
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
  height: 60vh;
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
</style>