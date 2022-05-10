/// <reference types="vite/client" />

declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'axios' {
  import * as axios from "axios";

  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

interface Song {
  id: string
  title: string
  pic: string
  style: string
  introduction: string
  name: string
  lyric: string[]
  url: string
}

interface Singer {
  id: number
  name: string
  pic: string
  sex: number
  birth: number
}

interface PlayMusic {
  id: string
  url: string
  pic: string
  index: number
  lyric: string[]
  currentSongList: Song[]
}

interface PlayMusicAddName extends PlayMusic{
  name: string
}

interface PlayMusicAddTitle extends PlayMusic{
  songTitle: string
  singerName: string
}