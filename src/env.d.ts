/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'axios' {
  import {AxiosRequestConfig} from "axios";

  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

interface Song {
  id: number,
  title: string,
  pic: string,
  style: string,
  introduction: string
}

interface Singer {
  id: number,
  name: string,
  pic: string,
  sex: number,
  birth: number
}