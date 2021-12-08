/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址

    悦听接口现在的调用方式是直接把 歌曲的id 替换到  
    https://music.163.com/song/media/outer/url?id=id.mp3这个地址，比如歌曲id为 33894312
    那么歌曲url的地址为
    https://music.163.com/song/media/outer/url?id=33894312.mp3
    把这个地址直接设置给audio标签的src属性即可 ，亲测可用
*/
var app = new Vue({
  el: "#player",
  data: {
    query: "",
    musicList: [],
    musicUrl: "",
    isPlaying: false,
    hotComments: [],
    mvUrl:"",
    isShow:false,
  },
  methods: {
    searchMusic: function () {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function (response) {
          that.musicList = response.data.result.songs;
          console.log(response.data.result.songs);
          // console.log(response);
        },
        function (err) {}
      );
    },
    playMusic: function (id) {
      var that = this;
      that.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(
        function (response) {
          console.log("详情", response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function (err) {}
      );
    },
    playMV:function(id){
      var that=this;
      axios.get("https://autumnfish.cn/mv/url?id="+id).then(
        function(response){
          console.log(response);
          that.mvUrl=response.data.data.url;
          that.isShow=true;
        },function(err){}
      );
    },
    play: function () {
      this.isPlaying = true;
    },
    pause: function () {
      this.isPlaying = false;
    },
    hide:function(){
      this.isShow=false;
    }
  },
});
