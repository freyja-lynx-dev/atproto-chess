import { defineStore } from 'pinia'
import { type At } from '@atcute/client/lexicons'

export const usePersistedStore = defineStore('persistedStore', {
  state: () => {
    return {
      token: null as string | null,
      lastUser: null as At.DID | null,
    }
  },
  persist: true,
})
