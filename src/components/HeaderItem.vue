<template>
  <header class="shadow-sm">
    <div class="title">
      <b-button v-b-toggle:navbar-collapse variant="white" class="ml-2">
        <b-icon
          variant="dark"
          icon="list"
          aria-hidden="true"
          scale="2x"
        ></b-icon>
      </b-button>
      <h2>{{ text }}</h2>
    </div>
    <div class="wrap-function">
      <div :class="searchicon ? 'display' : 'hide'">
        <b-form-input
          id="searchInput"
          type="search"
          v-model="inputValue"
          v-on:keyup="onSearch"
          placeholder="Search here.."
        >
        </b-form-input>

        <!-- DROPDOWN SORT -->
        <b-dropdown
          class="dropDownSort"
          variant="link"
          right
          v-model="dropdownValue.dropdownSelected"
          text="Right Align"
          no-caret
          text-decoration-none
        >
          <template #button-content>
            <b-icon
              variant="dark"
              icon="filter-right"
              aria-hidden="true"
            ></b-icon>
          </template>
          <b-dropdown-item
            v-for="option in dropdownValue.options"
            :key="option.value"
            :value="option.value"
            @click="dropDownSort(option.value)"
          >
            {{ option.text }}
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- DROPDOWN PRODUCT OR CATEGORY -->
      <b-dropdown
        :class="filterEdit ? 'display mr-3' : 'hide'"
        aria-hidden="true"
        variant="link"
        right
        no-caret
        text-decoration-none
        v-model="dropdownValue.dropdownSelected"
        text="Right Align"
      >
        <template #button-content>
          <b-icon
            icon="filter-right"
            variant="dark"
            aria-hidden="true"
          ></b-icon>
        </template>
        <b-dropdown-item
          v-for="option in ddChangeValue.options"
          :key="option.value"
          :value="option.value"
          @click="dropdownChange(option.value)"
        >
          {{ option.text }}
        </b-dropdown-item>
      </b-dropdown>

      <div :class="searchicon ? 'display cart-mobile' : 'hide'">
        <div class="vl"></div>
        <b-button v-b-toggle:cart-collapse variant="white">
          <fa-icon :icon="['fas', 'shopping-cart']" size="lg" />
        </b-button>
      </div>

      <!-- LOGOUT -->
      <b-dropdown
        class="drop-down-logout"
        variant="link"
        right
        text="Right Align"
        no-caret
        text-decoration-none
      >
        <template #button-content>
          <b-icon
            variant="dark"
            icon="three-dots-vertical"
            font-scale="1"
          ></b-icon>
        </template>
        <b-dropdown-item v-on:click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "header-item",
  props: {
    searchicon: {
      type: Boolean,
      required: true,
    },
    filterEdit: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
      ddChangeValue: {
        options: [
          {
            value: true,
            text: "Product",
          },
          {
            value: false,
            text: "Category",
          },
        ],
      },
      dropdownValue: {
        dropdownSelected: "1",
        options: [
          {
            value: "name",
            text: "name",
          },
          {
            value: "id_category",
            text: "category",
          },
          {
            value: "price",
            text: "price",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["sortProduct", "searchProduct"]),
    onSearch() {
      this.searchProduct(this.inputValue);
    },
    dropDownSort(order) {
      this.sortProduct({ sort: "DESC", order });
    },
    dropdownChange(data) {
      if (data != null) {
        this.$emit("changeShow", data);
      }
    },
    logout() {
      // const check = 
      this.$store.dispatch("delToken");
      // if (check) {
      //   this.$router.push({ name: "Login" });
      // }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  position: sticky;
  background: white;
  justify-content: space-between;
  top: 0;
  height: 54px;
}
h2 {
  margin: auto;
}
.hide {
  display: none;
}

.vl {
  border-left: 2px solid black;
  height: auto;
  margin: 0;
}

.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  font-size: 1rem;
}
.wrap-function {
  display: flex;
}
.display {
  margin: 10px 0;
  display: flex;
}

.drop-down-logout {
  margin: 0;
}
@media screen and (max-width: 360px) {
  h2 {
    font-size: 1em;
    display: none;
  }
  .title {
    width: auto;
  }
}
@media screen and (min-width: 361px) {
  h2 {
    font-size: 1em;
    display: none;
  }
  .title {
    width: auto;
  }
}
@media screen and (min-width: 1200px) {
  .cart-mobile {
    display: none;
  }
  h2 {
    font-size: 2em;
    display: block;
  }
  .title {
    width: 100%;
  }
}
</style>