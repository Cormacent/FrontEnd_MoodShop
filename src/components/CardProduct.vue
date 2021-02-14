<template>
  <div class="item text-left">
    <div class="image text-center">
      <img :src="image" :alt="name" />
    </div>
    <div class="content">
      <p class="title">{{ name }}</p>
      <div class="content-1">
        <p class="title text-info">{{ category }}</p>
        <p class="value">{{ price }} K</p>
      </div>
    </div>
    <hr class="divider" />
    <div class="text-right">
      <b-button class="m-2" variant="outline-success"
        >Add to cart <fa-icon :icon="['fas', 'shopping-cart']" size="lg"
      /></b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-product",
  data() {
    return {
      datas: {},
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
  },
};
</script>

<style scoped>
.item {
  margin: 10px;
  transition: 0.5s;
  background-color: white;
  box-shadow: grey;
}
.item:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  /* border-radius: 10px; */
}
.content {
  padding: 10px 10px 10px 10px;
}
.content-1 {
  display: flex;
  justify-content: space-between;
}
.divider {
  margin: 5px 10px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
img:hover {
  transition: 0.5s;
  border-radius: 10px 10px 0px 0px;
}
.image:hover {
  transition: 0.5s;
  border-radius: 10px 10px 0px 0px;
}
.image {
  height: 160px;
}
.item .title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}
.item .value {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

@media screen and (max-width: 360px) {
  .item {
    width: 9rem;
  }
  img {
    margin-top: 4%;
    width: 90%;
  }
}

@media screen and (min-width: 360px) {
  .item {
    width: 10rem;
  }
  img {
    margin-top: 4%;
    width: 90%;
  }
}
@media screen and (min-width: 1200px) {
  .item{
    width: 15rem;
  }
  img {
    margin-top: 4%;
    width: 90%;
  }

  .item {
    margin: 10px;
  }
}
</style>