<template>
  <div class="item text-left">
    <div class="image text-center">
      <img :src="image" :alt="name" />
    </div>
    <hr class="divider" />
    <div class="content">
      <p class="title">{{ name }}</p>
      <p class="value">{{ price }} K</p>
      <p class="title text-info">{{ category }}</p>
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
}
.item:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 10px;
}
.content {
  padding: 0 10px 10px 10px;
}
.divider {
  margin: 0px;
}
img {
  width: 250px;
  max-width: 100%;
  max-height: 100%;
}
img:hover {
  transition: 0.5s;
  border-radius: 10px 10px 0px 0px;
}
.image {
  width: 250px;
  height: 200px;
}
.image:hover {
  transition: 0.5s;
  border-radius: 10px 10px 0px 0px;
}
.item .title {
  font-size: 1rem;
  margin: 0;
}

.item .value {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

@media screen and (max-width: 360px) {
  img {
    width: 150px;
  }
  .image {
    width: 150px;
    height: 100px;
  }
  .item {
    margin: 5px;
  }
}

@media screen and (min-width: 360px) {
  img {
    width: 160px;
  }
  .image {
    width: 160px;
    height: 120px;
  }
  .item {
    margin: 5px;
  }
}
@media screen and (min-width: 1200px) {
  img {
    width: 250px;
  }
  .image {
    width: 250px;
    height: 200px;
  }
  .item {
    margin: 10px;
  }
}
</style>