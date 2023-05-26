<template>
  <div class="post">
    <div class="post__edit">
      <div class="post__inputs">
        <div class="post__headers">
          <div>Title: {{ state.post.title }}</div>
          <div>
            Author: {{ state.name }}
            <span v-if="id === state.userId">(Me)</span>
          </div>
        </div>
        <textarea
          class="post__body"
          style="pointer-events: none"
          v-if="!state.isEdit"
          :placeholder="state.post.body"
        />
        <textarea
          v-else
          class="post__body post__body--edit"
          type="text"
          :placeholder="state.newBody"
          v-model="state.newBody"
        />
      </div>
      <div v-if="state.post.userId === id" class="post__buttons">
        <button class="post__button" @click="state.isEdit = !state.isEdit">
          {{ editButton }}
        </button>
        <button
          @click="changePostData"
          class="post__button"
          v-if="state.isEdit"
        >
          Save
        </button>
        <button @click="deletePost" class="post__button">Delete</button>
        <button class="post__button" @click="goBack">Back</button>
      </div>
      <div class="post__inputs" v-else>
        <button class="post__buttons" @click="goBack">Back</button>
      </div>
    </div>
    <Comments :id="state.postId" :user-id="state.userId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/store";
import { storeToRefs } from "pinia";

import {
  getUserInfo,
  getSelectedPost,
  changeSelectedPostBody,
  deleteSelectedPost,
} from "@/backend/dataApi";

import Comments from "../components/Comments.vue";

export default defineComponent({
  components: {
    Comments,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const userStore = useUserStore();
    const { id, name } = storeToRefs(userStore);

    const state = reactive<{
      postId: number;
      name: string;
      userId: number;
      post: any;
      newBody: string;
      isEdit: boolean;
    }>({
      postId: 0,
      name: "",
      userId: 0,
      isEdit: false,
      post: {},
      newBody: "",
    });

    state.postId = Number(route.query.id);
    state.userId = Number(route.query.userId);

    const editButton = computed(() => {
      if (state.isEdit === false) {
        return "Edit";
      }
      return "Close";
    });
    const getPostData = async () => {
      const res = await getSelectedPost(state.postId);
      state.userId = res.userId;
      state.post = res;
      state.newBody = res.body;
    };
    const getUserData = async () => {
      if (state.userId === id.value) {
        state.name = name.value;
        return;
      }
      const res = await getUserInfo(state.userId);
      state.name = res.name;
    };

    const changePostData = async () => {
      const res = await changeSelectedPostBody(state.postId, state.newBody);
      state.post = res;
      state.newBody = res.body;
      state.isEdit = false;
    };

    const deletePost = async () => {
      await deleteSelectedPost(state.postId);
      router.back();
    };

    const goBack = async () => {
      router.back();
    };

    Promise.allSettled([getUserData(), getPostData()]);
    return {
      state,
      changePostData,
      deletePost,
      editButton,
      goBack,
      id,
    };
  },
});
</script>

<style scoped>
.post {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.post__edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.post__inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.post__headers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  width: 80vw;
  justify-content: space-evenly;
}
.post__body {
  width: 80vw;
  height: 300px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  text-align: left;
}

.post__body--edit {
  background-color: #f8f8f8b2;
}

.post__buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.post__button {
  margin: 0 auto;
  width: 60px;
  height: 20px;
  cursor: pointer;
}
.post__button--single {
  text-align: center;
}
</style>
