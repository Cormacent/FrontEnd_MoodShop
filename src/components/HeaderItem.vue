<template>
  <header class="shadow-sm">
    <div class="title">
      <b-button v-b-toggle:navbar-collapse variant="white" class="ml-1">
        <fa-icon :icon="['fas', 'bars']" size="2x" />
      </b-button>
      <h2>{{ text }}</h2>

      <b-collapse
        id="search-collapse"
        :class="searchicon ? 'search-bar' : 'hide'"
      >
        <b-form-input
          id="searchInput"
          type="search"
          v-model="inputValue"
          v-on:keyup="emitToParent"
          class="mr-3"
          placeholder="Search product here.."
        >
        </b-form-input>
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
      </b-collapse>
      <b-button
        v-b-toggle:search-collapse
        variant="white"
        :class="searchicon ? 'search-icon' : 'hide'"
      >
        <fa-icon :icon="['fas', 'search']" size="2x" />
      </b-button>
      <b-dropdown
        :class="filterEdit ? 'search-bar' : 'hide'"
        variant="dark"
        right
        v-model="dropdownValue.dropdownSelected"
        text="Right Align"
      >
        <template #button-content>
          <b-icon icon="filter-right" aria-hidden="true"></b-icon>
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
            font-scale="2"
          ></b-icon>
        </template>
        <b-dropdown-item v-on:click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="cart-mobile">
      <div class="vl"></div>
      <b-button v-b-toggle:cart-collapse variant="white">
        <fa-icon :icon="['fas', 'shopping-cart']" size="2x" />
      </b-button>
    </div>
  </header>
</template>

<script>
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
            value: "1",
            text: "asc - name",
          },
          {
            value: "2",
            text: "asc - category",
          },
          {
            value: "3",
            text: "asc - price",
          },
          {
            value: "4",
            text: "desc - name",
          },
          {
            value: "5",
            text: "desc - category",
          },
          {
            value: "6",
            text: "desc - price",
          },
        ],
      },
    };
  },
  methods: {
    emitToParent() {
      this.$emit("searchToHome", this.inputValue);
    },
    changeItem() {
      console.log("masuk");
    },
    dropDownSort(data) {
      if (data != null) {
        this.$emit("sortToHome", data);
      }
    },
    dropdownChange(data) {
      if (data != null) {
        this.$emit("changeShow", data);
      }
    },
    logout() {
      const check = this.$store.dispatch("delToken");
      if (check) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  computed:{
    cekToken(){
      return true
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  position: sticky;
  background: white;
  top: 0;
  height: 54px;
}
h2 {
  margin: auto;
}

.icon {
  margin: 10px 20px;
}
.hide {
  display: none;
}
.cart-mobile {
  display: none;
}

.vl {
  border-left: 2px solid black;
  height: auto;
  margin: 10px 5px;
}

.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  font-size: 1rem;
}
.search-bar {
  margin: 10px 20px;
  display: flex;
}
.search-icon {
  display: block;
}
.drop-down-logout {
  margin: 0;
}
@media screen and (max-width: 360px) {
  .cart-mobile {
    display: flex;
  }
  h2 {
    font-size: 1em;
    display: none;
  }
  .dropDownSort {
    display: none;
  }
}
@media screen and (min-width: 361px) {
  .cart-mobile {
    display: flex;
  }
  h2 {
    font-size: 1em;
    display: none;
  }
  .dropDownSort {
    display: none;
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
  .dropDownSort {
    display: block;
  }
}
</style>