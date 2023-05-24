<template>
  <div class="home">
    <div class="sorts">
      <button @click="changeFilter('asc')">Sort a-b</button>
      <button @click="changeFilter('desc')">Sort b-a</button>
      <button @click="changeFilter('my')">My posts</button>
      <button @click="changeFilter()">All</button>
    </div>
    <div class="container">
      <div class="card" v-for="item in filteredItems" :key="item.id">
        <h2>{{ item.title }}</h2>
      </div>
    </div>

    <Post />
  </div>
</template>

<script lang="ts">
import Post from "@/components/Post.vue"; // @ is an alias to /src
import { defineComponent, reactive, computed } from "vue";
import { getPosts } from "@/backend/dataApi";
import PostType from "@/types/PostType";

export default defineComponent({
  components: {
    Post,
  },
  setup() {
    const state = reactive<{
      items: PostType[];
      filteredItems: PostType[];
      filter: string;
    }>({
      items: [],
      filter: "",
      filteredItems: [],
    });

    const getItems = async () => {
      const res = await getPosts();
      state.items = res;
    };

    const changeFilter = (val: string = "") => {
      state.filter = val;
    };

    getItems();

    const filteredItems = computed(() => {
      if (state.filter === "my") {
        return state.items.filter((item) => item.userId === 4);
      }
      if (state.filter === "asc") {
        return state.items.sort((a, b) => a.id - b.id);
      }

      if (state.filter === "desc") {
        return state.items.sort((a, b) => b.id - a.id);
      }

      return state.items;
    });

    return {
      state,
      filteredItems,
      changeFilter,
    };
  },
});
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sorts {
  margin: 0 auto;
  max-width: 300px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
button {
  cursor: pointer;
  width: 120px;
  padding: 10px;

  background-color: green;
  color: black;
  font-weight: 600;
  border-radius: 15px;
  border: 0 transparent;
}

button:hover {
  background-color: black;
  color: green;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.card {
  width: 50vw;
  padding: 20px;
  background-color: green;
  color: black;
  cursor: pointer;
}

.card:hover {
  background-color: black;
  color: green;
}
</style>