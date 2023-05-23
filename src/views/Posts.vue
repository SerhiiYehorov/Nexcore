<template>
  <div class="home">
    <Post />
  </div>
</template>

<script lang="ts">
import Post from '@/components/Post.vue'; // @ is an alias to /src
import { defineComponent} from 'vue'

export default defineComponent({
    components: {
      Post,
    },
    
})


</script>
