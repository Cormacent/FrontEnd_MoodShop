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
              <b-button variant="success" @click="openAddProduct" class="m-3"
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
                    @click="openEditProduct(row.item)"
                    class="mr-1"
                  >
                    <fa-icon :icon="['fas', 'edit']" size="lg" />
                  </b-button>
                  <b-button
                    size="sm"
                    class="btn-danger"
                    @click="openDeleteProduct(row.item)"
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
              <b-button variant="success" @click="openAddCategory" class="m-3"
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
                    @click="openDelCategory(row.item)"
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
              <b-form
                class="m-3"
                @submit.prevent="addDataProduct"
                @reset="resetData"
              >
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formProduct.name"
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
                      v-model="formProduct.image"
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
                      v-model="formProduct.price"
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
                      v-model="formProduct.id_category"
                      :options="listCategory"
                    >
                    </b-form-select> </b-col></b-row
                ><br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Add Product</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button type="reset" class="btn-block" variant="info"
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
                    <b-form-input id="input-name" v-model="formProduct.name">
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <b-row>
                  <b-col sm="3">
                    <label class="mr-sm-4" for="input-image">Image : </label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-file
                      v-model="formProduct.image"
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
                      v-model="formProduct.price"
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
                      v-model="formProduct.id_category"
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
              <b-form
                class="m-3"
                @submit.prevent="addDataCategory"
                @reset="resetData"
              >
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name"
                      v-model="formCategory.name"
                      placeholder="Category name.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Add Category</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button type="reset" class="btn-block" variant="info"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-edit-category" hide-footer>
              <template #modal-title> Change Item </template>
              <b-form
                class="m-3"
                @submit.prevent="changeDataCategory"
                @reset="resetData"
              >
                <b-row>
                  <b-col sm="3">
                    <label for="input-name">Name :</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      id="input-name-category"
                      v-model="formCategory.name"
                      placeholder="Category name.."
                    >
                    </b-form-input>
                  </b-col> </b-row
                ><br />
                <br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Change</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button type="reset" class="btn-block" variant="info"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <b-modal id="modal-delete-category" hide-footer>
              <template #modal-title> Delete Item </template>
              <div class="d-block text-center">
                <h5>
                  Are you sure want to delete this data?
                  <span class="text-info">{{ this.formCategory.name }}</span>
                </h5>
              </div>
              <br /><br />
              <b-button
                class="btn-block"
                variant="danger"
                @click="delCategory()"
                >Yeah</b-button
              >
              <p class="text-center m-0"><b>OR</b></p>
              <b-button
                type="reset"
                class="btn-block"
                variant="info"
                @click="$bvModal.hide('modal-delete-category')"
                >Nope</b-button
              >
            </b-modal>
            <b-modal id="modal-delete-product" hide-footer>
              <template #modal-title> Delete Item </template>
              <div class="d-block text-center">
                <h5>
                  Are you sure want to delete this data?
                  <span class="text-info">{{ this.formProduct.name }}</span>
                </h5>
              </div>
              <br /><br />
              <b-button class="btn-block" variant="danger" @click="delProduct()"
                >Yeah</b-button
              >
              <p class="text-center m-0"><b>OR</b></p>
              <b-button
                type="reset"
                class="btn-block"
                variant="info"
                @click="$bvModal.hide('modal-delete-product')"
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
      formProduct: {
        id: null,
        image: [],
        name: null,
        price: null,
        id_category: null,
      },
      formCategory: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapActions(["getCategory", "getProduct"]),
    addDataProduct() {
      if (
        this.formProduct.name &&
        this.formProduct.price &&
        this.formProduct.id_category &&
        this.formProduct.image
      ) {
        if (this.formProduct.image.size > 3000000) {
          alert("Too Large, max size allowed is 3 MB!");
          return;
        }
        let formData = new FormData();
        formData.append("image", this.formProduct.image);
        formData.append("name", this.formProduct.name);
        formData.append("price", this.formProduct.price);
        formData.append("id_category", this.formProduct.id_category);

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

    openAddProduct() {
      this.resetData();
      this.$bvModal.show("modal-add-product");
    },

    openEditProduct(item) {
      this.formProduct.id = item.id;
      // this.formProduct.image = item.image;
      this.formProduct.name = item.name;
      this.formProduct.price = item.price;
      this.formProduct.id_category = item.id_category;
      this.$bvModal.show("modal-edit-product");
    },
    openDeleteProduct(item) {
      this.formProduct.id = item.id;
      this.formProduct.name = item.name;
      this.$bvModal.show("modal-delete-product");
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

    changeDataProduct() {
      let formData = new FormData();
      if (this.formProduct.image.length !== 0) {
        formData.append("image", this.formProduct.image);
      }
      if (this.formProduct.image.size > 3000000 && !this.formProduct.image) {
        alert("Too Large, max size allowed is 3 MB!");
        return;
      }
      if (this.formProduct.name) {
        formData.append("name", this.formProduct.name);
      }
      if (this.formProduct.price) {
        formData.append("price", this.formProduct.price);
      }
      if (this.formProduct.id_category) {
        formData.append("id_category", this.formProduct.id_category);
      }
      formData.append("id", this.formProduct.id);
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
        .dispatch("updateCategory", this.formCategory)
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
    delProduct() {
      this.$store
        .dispatch("deleteProduct", this.formProduct.id)
        .then((res) => {
          alert(res.statusText);
          this.getProduct();
          this.resetData();
        })
        .catch((e) => {
          console.log(e);
          this.resetData();
          this.getProduct();
        });
    },

    setDataCategory(item) {
      this.formCategory = item;
      this.$bvModal.show("modal-edit-category");
    },
    resetData() {
      this.formProduct = {
        id: null,
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formProduct = {
        image: [],
        name: null,
        price: null,
        id_category: null,
      };
      this.formCategory = {
        id: null,
        name: null,
      };
      this.$bvModal.hide("modal-edit-product");
      this.$bvModal.hide("modal-add-product");
      this.$bvModal.hide("modal-edit-category");
      this.$bvModal.hide("modal-add-category");
      this.$bvModal.hide("modal-delete-category");
      this.$bvModal.hide("modal-delete-product");
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