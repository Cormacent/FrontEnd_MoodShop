<template>
  <div class="edit">
    <section class="main-section">
      <header-item
        class="header"
        :text="'Change Item'"
        :searchicon="false"
        :filterEdit="true"
        v-on:changeShow="changeShow"
      />
      <main class="row">
        <side-nav :roleAdmin="roleAdmin" />
        <div class="content-wrap col">
          <div class="container">
            <section v-if="flagShowTable" class="row">
              <b-button
                variant="success"
                v-b-modal="'modal-add-product'"
                class="m-3"
                ><fa-icon class="icon" :icon="['fas', 'plus-circle']" /> Add New
                Product</b-button
              >
              <b-table
                head-variant="dark"
                striped
                hover
                :items="dataProduct"
                :fields="fieldsProduct"
              >
                <template #cell(actions)="row">
                  <b-button
                    size="sm"
                    @click="setDataProduct(row.item)"
                    class="mr-1"
                  >
                    <fa-icon :icon="['fas', 'edit']" size="lg" />
                  </b-button>
                  <b-button
                    size="sm"
                    class="btn-danger"
                    @click="delProduct(row.item)"
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
            <section v-else class="row">
              <b-button
                variant="success"
                v-b-modal="'modal-add-category'"
                class="m-3"
                ><fa-icon class="icon" :icon="['fas', 'plus-circle']" /> Add
                Category</b-button
              >
              <b-table
                head-variant="dark"
                striped
                hover
                :items="dataCategory"
                :fields="fieldsCategory"
              >
                <template #cell(actions)="row">
                  <b-button
                    size="sm"
                    @click="setDataCategory(row.item)"
                    class="mr-1"
                  >
                    <fa-icon :icon="['fas', 'edit']" size="lg" />
                  </b-button>
                  <b-button
                    size="sm"
                    class="btn-danger"
                    @click="delCategory(row.item)"
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
            <b-modal id="modal-add-product" hide-footer>
              <template #modal-title> Add Item </template>
              <b-form class="m-3">
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formAddProduct.name"
                      placeholder="Product name.."
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
                      v-model="formAddProduct.image"
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
                      v-model="formAddProduct.price"
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
                      v-model="formAddProduct.id_category"
                      :options="listCategory"
                    >
                    </b-form-select> </b-col></b-row
                ><br />
                <b-button
                  class="btn-block"
                  variant="success"
                  @click="addDataProduct()"
                  >Add Product</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button
                  type="reset"
                  class="btn-block"
                  variant="info"
                  @click="resetData()"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-edit-product" class="modal-body" hide-footer>
              <template #modal-title> Change Item </template>
              <b-form class="m-3">
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formEditProduct.name"
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
                      v-model="formEditProduct.image"
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
                      v-model="formEditProduct.price"
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
                      v-model="formEditProduct.id_category"
                      :options="listCategory"
                    >
                    </b-form-select> </b-col></b-row
                ><br />
                <b-button
                  class="btn-block text-white"
                  variant="warning"
                  @click="changeDataProduct()"
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
            <b-modal id="modal-add-category" hide-footer>
              <template #modal-title> Add Item </template>
              <b-form class="m-3">
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formAddCategory.name"
                      placeholder="Category name.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <br />
                <b-button
                  class="btn-block"
                  variant="success"
                  @click="addDataCategory()"
                  >Add Category</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button
                  type="reset"
                  class="btn-block"
                  variant="info"
                  @click="resetData()"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-edit-category" hide-footer>
              <template #modal-title> Change Item </template>
              <b-form class="m-3">
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name-category"
                      v-model="formEditCategory.name"
                      placeholder="Category name.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <br />
                <b-button
                  class="btn-block"
                  variant="success"
                  @click="changeDataCategory()"
                  >Change</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button
                  type="reset"
                  class="btn-block"
                  variant="info"
                  @click="resetData()"
                  >Cancel</b-button
                >
              </b-form>
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
      fieldsProduct: [
        {
          key: "name",
          label: "NAME",
          sortable: true,
        },
        {
          key: "categorys.name",
          label: "CATEGORY",
          sortable: true,
        },
        {
          key: "price",
          label: "PRICE",
          sortable: true,
        },
        { key: "actions", label: "ACTIONS" },
      ],
      fieldsCategory: [
        {
          key: "name",
          label: "NAME",
          sortable: true,
        },
        { key: "actions", label: "ACTIONS" },
      ],
      itemsCategory: [],
      formEditProduct: {
        id: null,
        image: [],
        name: null,
        price: null,
        id_category: null,
      },
      formAddProduct: {
        image: [],
        name: null,
        price: null,
        id_category: null,
      },
      formAddCategory: {
        name: null,
      },
      formEditCategory: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapActions(["getCategory", "getProduct"]),
    addDataProduct() {
      if (
        this.formAddProduct.name &&
        this.formAddProduct.price &&
        this.formAddProduct.id_category &&
        this.formAddProduct.image
      ) {
        if (this.formAddProduct.image.size > 3000000) {
          alert("Too Large, max size allowed is 3 MB!");
          return;
        }
        let formData = new FormData();
        formData.append("image", this.formAddProduct.image);
        formData.append("name", this.formAddProduct.name);
        formData.append("price", this.formAddProduct.price);
        formData.append("id_category", this.formAddProduct.id_category);

        this.$store
          .dispatch("addProduct", formData)
          .then((res) => {
            alert(res.statusText);
            this.getProduct();
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

    addDataCategory() {
      if (this.formAddCategory.name) {
        this.$store
          .dispatch("addCategory", this.formAddCategory)
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

    changeDataProduct() {
      let formData = new FormData();
      if (this.formEditProduct.image.length !== 0) {
        formData.append("image", this.formEditProduct.image);
      }
      if (
        this.formEditProduct.image.size > 3000000 &&
        !this.formEditProduct.image
      ) {
        alert("Too Large, max size allowed is 3 MB!");
        return;
      }
      if (this.formEditProduct.name) {
        formData.append("name", this.formEditProduct.name);
      }
      if (this.formEditProduct.price) {
        formData.append("price", this.formEditProduct.price);
      }
      if (this.formEditProduct.id_category) {
        formData.append("id_category", this.formEditProduct.id_category);
      }
      formData.append("id", this.formEditProduct.id);
      this.$store
        .dispatch("updateProduct", formData)
        .then((res) => {
          alert(res.statusText);
          this.getProduct();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
        });
    },

    changeDataCategory() {
      this.$store
        .dispatch("updateCategory", this.formEditCategory)
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

    delCategory(data) {
      this.$store
        .dispatch("deleteCategory", data.id)
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
    delProduct(data) {
      this.$store
        .dispatch("deleteProduct", data.id)
        .then((res) => {
          alert(res.statusText);
          this.getProduct();
        })
        .catch((e) => {
          console.log(e);
          this.getProduct();
        });
    },
    setDataProduct(item) {
      this.formEditProduct.id = item.id;
      // this.formEditProduct.image = item.image;
      this.formEditProduct.name = item.name;
      this.formEditProduct.price = item.price;
      this.formEditProduct.id_category = item.id_category;
      this.$bvModal.show("modal-edit-product");
    },
    setDataCategory(item) {
      this.formEditCategory = item;
      this.$bvModal.show("modal-edit-category");
    },
    resetData() {
      this.formEditProduct = {
        id: null,
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formAddProduct = {
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formAddCategory = [];
      this.formEditCategory = [];
      this.$bvModal.hide("modal-edit-product");
      this.$bvModal.hide("modal-add-product");
      this.$bvModal.hide("modal-edit-category");
      this.$bvModal.hide("modal-add-category");
    },
    changeShow(value) {
      this.flagShowTable = value;
    },
  },
  computed: {
    ...mapGetters(["dataProduct", "dataCategory", "listCategory"]),
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
    this.getProduct();
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