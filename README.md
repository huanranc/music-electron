# 桌面端音乐播放器 #

目前正在修改中

参考了[code-mcx](https://github.com/code-mcx/mango-music)他的使用Redux管理播放状态部分
音乐播放器的音乐信息是拿[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的网易云API接口
在后期我加入了用户系统，拥有本地数据库，数据库是使用MySQL，然后也参照[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)的项目，使用koa2通过自己的后端调用网易云的API

先打开 https://github.com/huanranc/music-electron-api  
node app.js
端口3000,项目使用数据的端口默认 3000

先执行
npm start

端口不使用3000 使用其他端口号

再执行，即打开桌面端
npm run electron


#### 项目截图
----------------------------

这是主页
![发现](./src/commpon/music-electron/discover.jpg)
![发现2](./src/commpon/music-electron/discover2.jpg)
![歌手](./src/commpon/music-electron/art.jpg)
![playlist](./src/commpon/music-electron/playlists.jpg)
![albums](./src/commpon/music-electron/albums.jpg)
![search](./src/commpon/music-electron/search.jpg)
![album](./src/commpon/music-electron/album.jpg)
![album1](./src/commpon/music-electron/album1.jpg)
![like](./src/commpon/music-electron/like.jpg)
![test](./src/commpon/music-electron/test.jpg)
![play](./src/commpon/music-electron/play.jpg)
![playing](./src/commpon/music-electron/playing.jpg)
![lyric](./src/commpon/music-electron/lyric.jpg)
