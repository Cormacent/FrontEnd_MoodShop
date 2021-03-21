<template>
  <div class="edit">
    <section class="main-section">
      <header-item
        class="header"
        :text="'Users'"
        :searchicon="false"
        :filterEdit="false"
        v-on:changeShow="changeShow"
      />
      <main class="row">
        <side-nav :roleAdmin="roleAdmin" />
        <div class="content-wrap col">
          <div class="container">
            <section class="row">
              <b-button variant="success" @click="openAddUser" class="m-3"
                ><fa-icon class="icon" :icon="['fas', 'plus-circle']" /> Add Users</b-button
              >
              <b-table
                head-variant="dark"
                striped
                hover
                :items="dataUser"
                :fields="fieldsUser"
              >
                <template #cell(actions)="row">
                  <b-button
                    size="sm"
                    @click="openEditUser(row.item)"
                    class="mr-1"
                  >
                    <fa-icon :icon="['fas', 'edit']" size="lg" />
                  </b-button>
                  <b-button
                    size="sm"
                    class="btn-danger"
                    @click="openDeleteUser(row.item)"
                  >
                    <fa-icon
                      :icon="['fas', 'trash']"
                      size="lg"
                      class="text-white"
                    />
                  </b-button>
                </template>
              </b-table>
            </section>

            <!-- MODAL POPUP -->
            <b-modal id="modal-add-user" hide-footer>
              <template #modal-title> Add Item </template>
              <b-form
                class="m-3"
                @submit.prevent="addDataUser"
                @reset="resetData"
              >
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formUser.name"
                      placeholder="User name.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-image">Image : </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-file
                      v-model="formUser.image"
                      placeholder="Choose a image or drop it here..."
                      drop-placeholder="Drop image here..."
                      accept="image/*"
                    ></b-form-file>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-price">Prices : </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      type="number"
                      id="input-price"
                      v-model="formUser.price"
                      placeholder="Prices.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-category">category</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-select
                      id="input-category"
                      v-model="formUser.id_category"
                      :options="listCategory"
                    >
                    </b-form-select> </b-col></b-row
                ><br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Add User</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button type="reset" class="btn-block" variant="info"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-edit-user" class="modal-body" hide-footer>
              <template #modal-title> Change Item </template>
              <b-form class="m-3">
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="input-name" v-model="formUser.name">
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-image">Image : </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-file
                      v-model="formUser.image"
                      placeholder="Choose a image or drop it here..."
                      drop-placeholder="Drop image here..."
                      accept="image/*"
                    ></b-form-file>
                  </b-col>
                </b-row>
                <br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-price">Prices : </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-price"
                      type="number"
                      v-model="formUser.price"
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-category">category</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-select
                      id="input-category"
                      v-model="formUser.id_category"
                      :options="listCategory"
                    >
                    </b-form-select> </b-col></b-row
                ><br />
                <b-button
                  class="btn-block text-white"
                  variant="warning"
                  @click="changeDataUser()"
                  >Change</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button
                  type="reset"
                  class="btn-block"
                  variant="danger"
                  @click="resetData()"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-delete-user" hide-footer>
              <template #modal-title> Delete Item </template>
              <div class="d-block text-center">
                <h5>
                  Are you sure want to delete this data?
                  <span class="text-info">{{ this.formUser.name }}</span>
                </h5>
              </div>
              <br /><br />
              <b-button class="btn-block" variant="danger" @click="delUser()"
                >Yeah</b-button
              >
              <p class="text-center m-0"><b>OR</b></p>
              <b-button
                type="reset"
                class="btn-block"
                variant="info"
                @click="$bvModal.hide('modal-delete-user')"
                >Nope</b-button
              >
            </b-modal>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import HeaderItem from "../components/HeaderItem.vue";
import SideNav from "../components/SideNav.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { SideNav, HeaderItem },
  data() {
    return {
      roleAdmin: false,
      flagEdit: true,
      flagShowTable: true,
      fieldsUser: [
        {
          key: "name",
          label: "NAME",
          sortable: true,
        },
        {
          key: "categorys.name",
          label: "ROLE",
          sortable: true,
        },
        {
          key: "price",
          label: "EMAIL",
          sortable: true,
        },
        {
          key: "price",
          label: "CREATE AT",
          sortable: true,
        },
        {
          key: "price",
          label: "UPDATE AT",
          sortable: true,
        },
        { key: "actions", label: "ACTIONS" },
      ],
      formUser: {
        id: null,
        name: null,
        price: null,
        id_category: null,
      },
    };
  },
  methods: {
    ...mapActions(["getCategory", "getUser"]),
    addDataUser() {
      if (
        this.formUser.name &&
        this.formUser.price &&
        this.formUser.id_category &&
        this.formUser.image
      ) {
        if (this.formUser.image.size > 3000000) {
          alert("Too Large, max size allowed is 3 MB!");
          return;
        }
        let formData = new FormData();
        formData.append("image", this.formUser.image);
        formData.append("name", this.formUser.name);
        formData.append("price", this.formUser.price);
        formData.append("id_category", this.formUser.id_category);

        this.$store
          .dispatch("addUser", formData)
          .then((res) => {
            alert(res.statusText);
            this.getUser();
            this.resetData();
          })
          .catch((e) => {
            console.log(e);
            this.resetData();
          });
      } else {
        alert("Please fill out the entire form, and fill it out correctly");
      }
    },

    openAddUser() {
      this.resetData();
      this.$bvModal.show("modal-add-user");
    },

    openEditUser(item) {
      this.formUser.id = item.id;
      // this.formUser.image = item.image;
      this.formUser.name = item.name;
      this.formUser.price = item.price;
      this.formUser.id_category = item.id_category;
      this.$bvModal.show("modal-edit-user");
    },
    openDeleteUser(item) {
      this.formUser.id = item.id;
      this.formUser.name = item.name;
      this.$bvModal.show("modal-delete-user");
    },

    openAddCategory() {
      this.formCategory = {
        id: null,
        name: null,
      };
      this.$bvModal.show("modal-add-category");
    },

    addDataCategory() {
      if (this.formCategory.name) {
        delete this.formCategory.id;
        this.$store
          .dispatch("addCategory", this.formCategory)
          .then((res) => {
            alert(res.statusText);
            this.getCategory();
            this.resetData();
          })
          .catch((e) => {
            console.log(e);
            this.resetData();
          });
      } else {
        alert("Please fill out the entire form, and fill it out correctly");
      }
    },
    openDelCategory(data) {
      this.formCategory = data;
      this.$bvModal.show("modal-delete-category");
    },

    changeDataUser() {
      let formData = new FormData();
      if (this.formUser.image.length !== 0) {
        formData.append("image", this.formUser.image);
      }
      if (this.formUser.image.size > 3000000 && !this.formUser.image) {
        alert("Too Large, max size allowed is 3 MB!");
        return;
      }
      if (this.formUser.name) {
        formData.append("name", this.formUser.name);
      }
      if (this.formUser.price) {
        formData.append("price", this.formUser.price);
      }
      if (this.formUser.id_category) {
        formData.append("id_category", this.formUser.id_category);
      }
      formData.append("id", this.formUser.id);
      this.$store
        .dispatch("updateUser", formData)
        .then((res) => {
          alert(res.statusText);
          this.getUser();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
        });
    },

    changeDataCategory() {
      this.$store
        .dispatch("updateCategory", this.id)
        .then((res) => {
          alert(res.statusText);
          this.getCategory();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
        });
    },

    delCategory() {
      this.$store
        .dispatch("deleteCategory", this.formCategory.id)
        .then((res) => {
          alert(res.data.result);
          this.getCategory();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
        });
    },
    delUser() {
      this.$store
        .dispatch("deleteUser", this.formUser.id)
        .then((res) => {
          alert(res.statusText);
          this.getUser();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
          this.getUser();
        });
    },

    setDataCategory(item) {
      this.formCategory = item;
      this.$bvModal.show("modal-edit-category");
    },
    resetData() {
      this.formUser = {
        id: null,
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formUser = {
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formCategory = {
        id: null,
        name: null,
      };
      this.$bvModal.hide("modal-edit-user");
      this.$bvModal.hide("modal-add-user");
      this.$bvModal.hide("modal-edit-category");
      this.$bvModal.hide("modal-add-category");
      this.$bvModal.hide("modal-delete-category");
      this.$bvModal.hide("modal-delete-user");
    },
    changeShow(value) {
      this.flagShowTable = value;
    },
  },
  computed: {
    ...mapGetters(["dataUser", "dataCategory", "listCategory"]),
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
  mounted() {
    if (this.$store.getters.dataToken.role === "admin") {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
    this.getUser();
    this.getCategory();
  },
};
</script>
  
<style scoped>
.edit {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: block;
}

.content-wrap {
  height: 94vh;
  overflow: auto;
}

.header {
  z-index: 1;
}

main {
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 360px) {
  .edit {
    height: 100vh;
    display: block;
    /* grid-template-columns: auto; */
  }
}
@media screen and (min-width: 361px) {
  .edit {
    height: 100vh;
    display: block;
    /* grid-template-columns: auto; */
  }
}
@media screen and (min-width: 1200px) {
  .edit {
    display: block;

    margin: 0;
    padding: 0;
  }
}
</style>