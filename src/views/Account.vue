<template>
  <div class="account">
    <h1>My profile</h1>
    <div class="profile">
      <div class="profile__data">
        <p>Name:</p>
        <p>{{ state.name }}</p>
      </div>
      <div class="profile__data">
        <p>User:</p>
        <p>{{ state.username }}</p>
      </div>
      <div class="profile__data">
        <p>email:</p>
        <p>{{ state.email }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { getUserInfo } from "@/backend/dataApi";

export default defineComponent({
  setup() {
    const state = reactive<{
      id: number;
      name: string;
      username: string;
      email: string;
    }>({
      id: 4,
      name: "",
      username: "",
      email: "",
    });

    const getUserData = async () => {
      const res = await getUserInfo(state.id);
      state.name = res.name;
      state.username = res.username;
      state.email = res.email;
    };

    getUserData();

    return {
      state,
    };
  },
});
</script>

<style scoped>
.account {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  margin: 0 auto;
  border: 2px solid black;
  border-radius: 10px;
  max-width: 300px;
  background-color: gray;
  color: #fff;
}

.profile {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.profile__data {
  display: flex;
  gap: 10px;
}

p:nth-child(2n) {
  font-weight: 600;
}
</style>