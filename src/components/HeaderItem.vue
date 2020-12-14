<template>
  <header class="shadow-sm">
    <div class="title">
      <h2>{{ text }}</h2>
      <div :class="searchicon ? 'search-bar' : 'hide'">
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
          variant="dark"
          right
          v-model="dropdownValue.dropdownSelected"
          text="Right Align"
        >
          <template #button-content>
            <b-icon icon="filter-right" aria-hidden="true"></b-icon>
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
    </div>
    <div class="cart-mobile">
      <div :class="'{{ searchicon }}' ? 'vl' : 'hide'"></div>
      <fa-icon
        :class="'{{ searchicon }}' ? 'icon' : 'hide'"
        :icon="['fas', 'shopping-cart']"
        size="2x"
      />
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
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
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
            text: "desc - price",
          },
          {
            value: "5",
            text: "desc - price",
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
  },
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
  margin: 5px 20px;
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
</style>