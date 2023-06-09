<template>
  <div class="home">
    <div class="sorts">
      <button @click="changeFilter('asc')">Sort a-b</button>
      <button @click="changeFilter('desc')">Sort b-a</button>
      <button @click="changeFilter('my')">My posts</button>
      <button @click="changeFilter('asc')">All</button>
    </div>
    <div class="container">
      <div
        class="card"
        v-for="item in paginatedData"
        :key="item.id"
        @click="go(item)"
      >
        <h2>{{ item.title }}</h2>
      </div>
    </div>
    <div class="pagination">
      <v-pagination
        class="page"
        v-model="state.page"
        :pages="pageCount"
        :range-size="1"
        active-color="green"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { getPosts, getUserPosts } from "@/backend/dataApi";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/store";
import { storeToRefs } from "pinia";

import Post from "@/types/PostType";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default defineComponent({
  components: {
    VPagination,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const { id } = storeToRefs(userStore);

    const state = reactive<{
      items: Post[];
      filter: string;
      page: number;
      size: number;
      userItems: Post[];
    }>({
      items: [],
      userItems: [],
      filter: "",
      page: 1,
      size: 20,
    });

    const go = (item: Post) => {
      router.push("post?id=" + item.id + "&userId=" + item.userId);
    };

    const getItems = async () => {
      const res = await getPosts();
      state.items = res;
    };
    const getUserItems = async () => {
      const res = await getUserPosts(id.value);
      state.userItems = res;
    };

    const changeFilter = (val: string = "") => {
      state.filter = val;
    };

    getItems();
    getUserItems();

    const filteredItems = computed(() => {
      state.page = 1;
      if (state.filter === "my") {
        return state.userItems;
      }
      if (state.filter === "asc") {
        return state.items.sort((a, b) => a.id - b.id);
      }

      if (state.filter === "desc") {
        return state.items.sort((a, b) => b.id - a.id);
      }

      return state.items;
    });

    const pageCount = computed(() => {
      let l = filteredItems.value.length;
      let s = state.size;
      if (l <= s) {
        return 1;
      }
      return Math.floor(l / s);
    });

    const paginatedData = computed(() => {
      let start = (state.page - 1) * state.size;
      let end = start + state.size;
      return filteredItems.value.slice(start, end);
    });

    return {
      state,
      changeFilter,
      paginatedData,
      pageCount,
      go,
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
  border-radius: 15px;
  color: black;
  cursor: pointer;
}

.card:hover {
  background-color: black;
  color: green;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page :deep(.Page) {
  border-radius: 10px;
  font-weight: 600;
  font-size: 30px;
  height: 40px;
  width: 40px;
}
.page :deep(.Control) {
  height: 35px;
  width: 35px;
}
</style>