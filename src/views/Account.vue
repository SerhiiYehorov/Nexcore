<template>
  <div class="account">
    <h1>My profile</h1>
    <div class="profile">
      <div class="profile__data">
        <p>Name:</p>
        <p>{{ name }}</p>
      </div>
      <div class="profile__data">
        <p>User:</p>
        <p>{{ username }}</p>
      </div>
      <div class="profile__data">
        <p>email:</p>
        <p>{{ email }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getUserInfo } from "@/backend/dataApi";
import { useUserStore } from "@/store/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { id, name, email, username } = storeToRefs(userStore);

    const getUserData = async () => {
      const res = await getUserInfo(id.value);

      name.value = res.name;
      email.value = res.email;
      username.value = res.username;
    };

    getUserData();

    return {
      id,
      name,
      email,
      username,
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