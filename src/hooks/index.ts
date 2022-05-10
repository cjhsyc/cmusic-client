import {useConfigStore, useAudioStore} from '@/store'
import {computed, getCurrentInstance, ComponentInternalInstance} from "vue"
import {downloadMusic} from '@/api'
import {RouterName} from "@/enums"
import {LocationQueryRaw, useRouter} from "vue-router"

interface routerOptions {
  path: string
  query?: LocationQueryRaw
}

export default () => {
  const {proxy} = getCurrentInstance() as ComponentInternalInstance
  const configStore = useConfigStore()
  const audioStore = useAudioStore()
  const token = computed(() => configStore.token)
  const router = useRouter()

  function getUserSex(sex: 0 | 1) {
    if (sex === 0) {
      return "女"
    } else if (sex === 1) {
      return "男"
    }
  }

  // 获取歌曲名
  function getSongTitle(str: string) {
    return str.split("-")[1]
  }

  // 获取歌手名
  function getSingerName(str: string) {
    return str.split("-")[0]
  }

  // 判断登录状态
  function checkStatus(status?: boolean) {
    if (!token.value) {
      if (status !== false)
        (proxy as any).$message({
          message: "请先登录",
          type: "warning",
        })
      return false
    }
    return true
  }

  // 播放
  function playMusic({id, url, pic, index, name, lyric, currentSongList}: PlayMusicAddName) {
    const songTitle = getSongTitle(name)
    const singerName = getSingerName(name)
    audioStore.playMusic({
      id,
      url,
      pic,
      index,
      songTitle,
      singerName,
      lyric,
      currentSongList,
    })
  }

  // 下载
  async function download({songUrl, songName}: { songUrl: string, songName: string }) {
    if (!songUrl) {
      (proxy as any).$message({
        message: "下载链接为空！",
        type: "error",
      })
      console.error("下载链接为空！")
      return
    }

    const result = await downloadMusic(songUrl)
    const eleLink = document.createElement("a")
    eleLink.download = `${songName}.mp3`
    eleLink.style.display = "none"
    // 字符内容转变成 blob 地址
    const blob = new Blob([result.data])
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink) // 触发点击
    eleLink.click()
    document.body.removeChild(eleLink) // 移除
  }

  // 导航索引
  function changeIndex(value: string) {
    configStore.setActiveNavName(value)
  }

  // 路由管理
  function routerManager(routerName: string | number, options: routerOptions) {
    switch (routerName) {
      case RouterName.Search:
        router.push({path: options.path, query: options.query})
        break
      case RouterName.Home:
      case RouterName.SongSheet:
      case RouterName.SongSheetDetail:
      case RouterName.Singer:
      case RouterName.SingerDetail:
      case RouterName.Personal:
      case RouterName.PersonalData:
      case RouterName.Setting:
      case RouterName.SignIn:
      case RouterName.SignUp:
      case RouterName.SignOut:
      case RouterName.Lyric:
      case RouterName.Error:
      default:
        router.push({path: options.path})
        break
    }
  }

  function goBack(step = -1) {
    router.go(step)
  }

  return {
    getUserSex,
    getSongTitle,
    getSingerName,
    changeIndex,
    checkStatus,
    playMusic,
    routerManager,
    goBack,
    download,
  }
}