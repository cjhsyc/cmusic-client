import request from './request'

const baseurl: string = import.meta.env.VITE_APP_BASE_URL

// 获取图片信息
export const attachImageUrl = (url: string) =>
  url ? `${baseurl}${url}` : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'

// =======================> 用户 API
// 登录
export const login = (params: URLSearchParams) => request.post('user/login', params)
// 注册
export const register = (params: URLSearchParams) => request.post('user', params)
// 删除用户
export const deleteUser = (id: string) => request.delete(`user/${id}`)
// 更新用户信息
export const updateUserMsg = (params: URLSearchParams) => request.put(`user`, params)
export const updateUserPassword = (params: URLSearchParams) => request.put(`user/password`, params)
// 返回指定ID的用户
export const getUserOfId = (id: string) => request.get(`user/${id}`)
// 更新用户头像
export const uploadUrl = (userId: string) => `${baseurl}/user/avatar/${userId}`

// =======================> 歌单 API
// 获取全部歌单
export const getSongList = () => request.get('songList')
// 获取歌单类型
export const getSongListOfStyle = (style: string) =>
  request.get(`songList/style/detail?style=${style}`)
// 返回标题包含文字的歌单
export const getSongListOfLikeTitle = (keywords: string) =>
  request.get(`songList/likeTitle/detail?title=${keywords}`)
// 返回歌单里指定歌单ID的歌曲
export const getListSongOfSongId = (songListId: string) =>
  request.get(`listSong/detail/${songListId}`)

// =======================> 歌手 API
// 返回所有歌手
export const getAllSinger = () => request.get('singer')
// 通过性别对歌手分类
// export const getSingerOfSex = (sex: number) => request.get(`singer/sex/detail?sex=${sex}`)
export const getSingerOfSex = (sex: number) => request.get(`singer/sex/detail/${sex}`)

// =======================> 歌曲 API
// 返回指定歌曲ID的歌曲
export const getSongOfId = (id: string) => request.get(`song/detail?id=${id}`)
// 返回指定歌手ID的歌曲
export const getSongOfSingerId = (id: string) => request.get(`song/singer/detail?singerId=${id}`)
// 返回指定歌手名的歌曲
export const getSongOfSingerName = (keywords: string) =>
  request.get(`song/singerName/detail?name=${keywords}`)
// 下载音乐
export const downloadMusic = (url: string) => request.get(url, { responseType: 'blob' })

// =======================> 收藏 API
// 返回的指定用户ID的收藏列表
export const getCollectionOfUser = (userId: string) => request.get(`collection/${userId}`)
// 添加收藏的歌曲 type: 0 代表歌曲， 1 代表歌单
export const setCollection = (params: URLSearchParams) => request.post(`collection`, params)
//删除
// export const deleteCollection = (params: URLSearchParams) => request.delete(`collection`, params)
export const deleteCollection = (params: URLSearchParams) =>
  request.post(`collection/delete`, params)
//收藏状态
export const collectionIs = (params: URLSearchParams) => request.post(`collection/status`, params)

// =======================> 评分 API
// 提交评分
export const setRank = (params: URLSearchParams) => request.post(`rank`, params)
// 获取指定歌单的评分
export const getRankOfSongListId = (songListId: string) => request.get(`rank/${songListId}`)
// 获取指定用户的歌单评分
export const getUserRank = (consumerId: string, songListId: string) =>
  request.get(`/rank/${consumerId}/${songListId}`)
