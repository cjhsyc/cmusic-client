import {defineStore} from "pinia";
import {getAllSinger, getSongList} from '@/api'
import {Icon} from "@/enums";

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
      } else {
        return Promise.reject(result.message)
      }
    }
  },
  getters: {
    popularSong(): Array<Song> {
      return this.songList.sort().slice(0, 10)
    },
    popularSinger(): Array<Singer> {
      return this.singerList.sort().slice(0, 10)
    }
  }
})

export const useAudioStore = defineStore('audio', {
  state() {
    return {
      /** 音乐信息 */
      songId: '', // 音乐 ID
      songTitle: "", // 歌名
      songUrl: "", // 音乐 URL
      songPic: `/img/songPic/tubiao.jpg`, // 歌曲图片
      singerName: "", //  歌手名
      lyric: <string[]>[], // 处理后的歌词数据

      /** 音乐播放信息 */
      isPlay: false, // 播放状态
      playBtnIcon: Icon.BOFANG, // 播放状态的图标
      volume: 0, // 音量
      duration: 0, // 音乐时长
      curTime: 0, // 当前音乐的播放位置
      changeTime: 0, // 指定播放时刻
      autoNext: true, // 用于触发自动播放下一首

      /** 音乐列表信息 */
      currentPlayList: <Song[]>[], // 当前播放列表
      songDetails: <Song | null>null, // 单个歌单信息
      currentPlayIndex: -1, // 当前歌曲在歌曲列表的位置
    }
  },
  actions: {
    playMusic(music: PlayMusicAddTitle) {
      this.songId = music.id
      this.songUrl = music.url
      this.songPic = music.pic
      this.singerName = music.singerName
      this.currentPlayIndex = music.index
      this.songTitle = music.songTitle
      this.lyric = music.lyric
      this.currentPlayList = music.currentSongList
    },
    setDuration(duration: number) {
      this.duration = duration
    },
    setIsPlay(isPlay: boolean) {
      this.isPlay = isPlay
    },
    setCurTime(curTime: number) {
      this.curTime = curTime
    },
    setAutoNext(autoNext: boolean) {
      this.autoNext = autoNext
    },
    setSongDetails(songDetails: Song) {
      this.songDetails = songDetails
    },
    setChangeTime(changeTime: number) {
      this.changeTime = changeTime
    },
    setPlayBtnIcon(playBtnIcon: Icon) {
      this.playBtnIcon = playBtnIcon
    },
    setVolume(volume: number) {
      this.volume = volume
    },
    setCurrentPlayIndex(currentPlayIndex: number){
      this.currentPlayIndex = currentPlayIndex
    }
  }
})

export const useConfigStore = defineStore('config', {
  state() {
    return {
      token: false, // 用户是否登录
      showAside: false, // 是否显示侧边栏
      searchWord: "", // 搜索关键词
      activeNavName: "", // 导航栏名称
    }
  },
  actions: {
    setToken(token: boolean) {
      this.token = token;
    },
    setActiveNavName(activeNavName: string) {
      this.activeNavName = activeNavName;
    },
    setShowAside(showAside: boolean) {
      this.showAside = showAside;
    },
    setSearchWord(searchWord: string) {
      this.searchWord = searchWord;
    },
  }
})

export const useUserStore = defineStore('user', {
  state() {
    return {
      userId: '', // ID
      username: '', // 名字
      userPic: '', // 图片
    }
  },
  actions: {
    setUserId(userId: string) {
      this.userId = userId;
    },
    setUsername(username: string) {
      this.username = username;
    },
    setUserPic(userPic: string) {
      this.userPic = userPic;
    }
  }
})