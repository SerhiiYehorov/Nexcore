import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ 
        id: 4, 
        name: "",
        email: "",
        username: "",
    }),
    getters: {},
    actions: {},
  })

  