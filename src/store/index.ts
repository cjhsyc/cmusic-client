import {defineStore} from "pinia";
import {getAllSinger, getSongList} from '@/api'

export const useSongStore = defineStore('song', {
  state() {
    return {
      songList: [],
      singerList: []
    }
  },
  actions: {
    async reqSongList() {
      const result = await getSongList()
      if (result.code === 200) {
        this.songList = result.data
        return result.type
      } else {
        return Promise.reject(result.message)
      }
    },
    async reqSingerList() {
      const result = await getAllSinger()
      if (result.code === 200) {
          this.singerList = result.data
      }else {
        return Promise.reject(result.message)
      }
    }
  },
  getters: {
    popularSong(): Array<Song> {
      return this.songList.sort().slice(0, 10)
    },
    popularSinger(): Array<Singer>{
      return this.singerList.sort().slice(0, 10)
    }
  }
})