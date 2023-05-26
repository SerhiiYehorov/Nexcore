<template>
  <div class="comments">
    <div class="comment__add">
      <input
        required
        v-model="state.newName"
        class="comment__add-input"
        id="add-comment"
        type="text"
        placeholder="input your title"
      />
      <textarea
        required
        v-model="state.newBody"
        class="comment__add-body"
        name="my-comment"
        id="add-comment"
        placeholder="input your comment"
      />
      <button @click="sentNewComment">Add comment</button>
    </div>
    <div
      class="comment__list"
      v-for="comment in state.comments"
      :key="comment.id"
    >
      <div class="comment__item">id: {{ comment.id }}</div>
      <div class="comment__item">Name: {{ comment.name }}</div>
      <div class="comment__item">Body: {{ comment.body }}</div>
      <div class="comment__item">Author: {{ comment.email }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { getComments, sentComment } from "@/backend/dataApi";
import { useUserStore } from "@/store/store";
import { storeToRefs } from "pinia";

import Comment from "@/types/CommentsType";

export default defineComponent({
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const { email } = storeToRefs(userStore);

    const state = reactive<{
      comments: Comment[];
      newName: string;
      newBody: string;
    }>({
      comments: [],
      newName: "",
      newBody: "",
    });

    const getCommentsData = async () => {
      const res = await getComments(props.id);
      state.comments = res.sort((a: Comment, b: Comment) => b.id - a.id);
    };

    const sentNewComment = async () => {
      if (!state.newBody || !state.newName) return;

      const res = await sentComment(state.newName, state.newBody, email.value);
      res.id = state.comments[0].id + 1;
      state.comments.push(res);
      state.newBody = "";
      state.newName = "";
    };

    watch(
      () => props.id,
      (val) => {
        if (!val) return;
        getCommentsData();
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.comments.length,
      (val) => {
        if (!val) return;
        state.comments.sort((a, b) => b.id - a.id);
      },
      {
        immediate: true,
      }
    );

    return {
      state,
      sentNewComment,
      email,
    };
  },
});
</script>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.comment__add {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.comment__add-input,
.comment__add-body {
  width: 80vw;
}

.comment__add-body {
  height: 300px;
}

.comment__list {
  display: flex;
  flex-direction: column;
  width: 80vw;
  border: 2px solid black;
  background-color: antiquewhite;
  text-align: left;
}

.comment__item {
  border-bottom: 2px solid black;
  padding: 10px;
}

.comment__item:last-child {
  border: none;
}
</style>