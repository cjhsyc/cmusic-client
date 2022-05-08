import request from "./request";

const baseurl = import.meta.env.VITE_APP_BASE_URL

// 获取图片信息
export const attachImageUrl = (url: string) => url ? `${baseurl}/${url}` :
    "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"

// =======================> 用户 API
// 登录
export const login = (params: any) => request.post('user/login/status', params)
// 注册
export const register = (params: any) => request.post('user/add', params)

// =======================> 歌单 API
// 获取全部歌单
export const getSongList = () => request.get("songList")
// 获取歌单类型
export const getSongListOfStyle = (style: any) => request.get(`songList/style/detail?style=${style}`)
// 返回标题包含文字的歌单
export const getSongListOfLikeTitle = (keywords: any) => request.get(`songList/likeTitle/detail?title=${keywords}`)
// 返回歌单里指定歌单ID的歌曲
export const getListSongOfSongId = (songListId: any) => request.get(`listSong/detail?songListId=${songListId}`)

// =======================> 歌手 API
// 返回所有歌手
export const getAllSinger = () => request.get("singer")
// 通过性别对歌手分类
export const getSingerOfSex = (sex: any) => request.get(`singer/sex/detail?sex=${sex}`)