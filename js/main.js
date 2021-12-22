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
    loginStatus:false,
    query: "",
    musicList: [],
    likeListID:"",
    musicUrl: "",
    isPlaying: false,
    hotComments: [],
    mvUrl: "",
    isShow: false,
    dialogFormVisible: false,
    formLabelWidth: "80px",
    userId:"",
    form: {
      phone: "",
      password: "",
    },
    rules: {
      phone: [
        { required: true, message: "手机号必填！", trigger: "blur" },
        {
          min: 11,
          max: 11,
          message: "输入手机号格式不正确！",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "密码必填！", trigger: "blur" }],
    }
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
      that.musicUrl ="https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(
        function (response) {
          console.log("详情", response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function (err) {}
      );
    },
    playMV: function (id) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + id).then(
        function (response) {
          console.log(response);
          that.mvUrl = response.data.data.url;
          that.isShow = true;
        },
        function (err) {}
      );
    },
    play: function () {
      this.isPlaying = true;
    },
    pause: function () {
      this.isPlaying = false;
    },
    hide: function () {
      this.isShow = false;
    },
    historySearch(history) {
      this.query = history
      this.searchMusic()
      this.showHistory = false;
    },
    // /login/cellphone?phone=xxx&password=yyy
    login(){
      var that = this;
      var timestamp = Date.parse(new Date());
      axios.get("http://www.codeman.ink:3000/login/cellphone?phone=" + this.form.phone + "&password=" +
       this.form.password+"&withCredentials=true&"+timestamp).then(
         function(response){
        if(response.data.code == 200){      
          console.log('login');
          console.log(response);
          window.localStorage.setItem("userId", response.data.profile.userId);
          that.userId=response.data.profile.userId;
          axios.get("http://www.codeman.ink:3000/user/playlist?uid="+that.userId).then(
            function(response){
              console.log(response);
              that.likeListID=response.data.playlist[0].id;
              var timestamp2 = Date.parse(new Date());
              // "http://www.codeman.ink:3000/playlist/detail?id="+that.likeListID+"&timestamp="+timestamp2
              that.dialogFormVisible = false;
              that.loginStatus=true;
              that.musicList=[
                {
                name: "Vagrant Poet",
                id: 1349618169,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 12003051,
                name: "洛仃洋",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 95,
                st: 0,
                rt: "",
                fee: 8,
                v: 21,
                crbt: null,
                cf: "",
                al: {
                id: 75718356,
                name: "流浪诗歌",
                picUrl: "http://p4.music.126.net/Ko_cAtrxcf5WV_Vl0YM2rQ==/109951163899143255.jpg",
                tns: [ ],
                pic_str: "109951163899143255",
                pic: 109951163899143250
                },
                dt: 523935,
                h: {
                br: 320000,
                fid: 0,
                size: 20959652,
                vd: 31540
                },
                m: {
                br: 192000,
                fid: 0,
                size: 12575809,
                vd: 34185
                },
                l: {
                br: 128000,
                fid: 0,
                size: 8383887,
                vd: 35991
                },
                a: null,
                cd: "01",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 131136,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 0
                },
                {
                name: "Star, Moon, Sea",
                id: 413188431,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 12003051,
                name: "洛仃洋",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 80,
                st: 0,
                rt: "",
                fee: 0,
                v: 39,
                crbt: null,
                cf: "",
                al: {
                id: 34694587,
                name: "星，月，海",
                picUrl: "http://p3.music.126.net/ZLIt7ehY2Ad_Axxv0HyBBw==/18334356393625675.jpg",
                tns: [ ],
                pic_str: "18334356393625675",
                pic: 18334356393625676
                },
                dt: 260312,
                h: {
                br: 320000,
                fid: 0,
                size: 10415587,
                vd: 65088
                },
                m: {
                br: 192000,
                fid: 0,
                size: 6249369,
                vd: 67274
                },
                l: {
                br: 128000,
                fid: 0,
                size: 4166261,
                vd: 70252
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 64,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 1463404521866
                },
                {
                name: "Saving Us",
                id: 34478646,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 12531080,
                name: "R!N/Gemie",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 1096011,
                name: "SawanoHiroyuki[nZk]",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 95,
                st: 0,
                rt: null,
                fee: 8,
                v: 41,
                crbt: null,
                cf: "",
                al: {
                id: 3279452,
                name: "o1",
                picUrl: "http://p4.music.126.net/XkQ8DECoWhsbULisbJ0J6w==/109951166417230374.jpg",
                tns: [ ],
                pic_str: "109951166417230374",
                pic: 109951166417230370
                },
                dt: 283152,
                h: {
                br: 320000,
                fid: 0,
                size: 11328826,
                vd: -23348
                },
                m: {
                br: 192000,
                fid: 0,
                size: 6797313,
                vd: -23348
                },
                l: {
                br: 128000,
                fid: 0,
                size: 4531556,
                vd: -23348
                },
                a: null,
                cd: "1",
                no: 8,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 9007199255011328,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 2706476,
                publishTime: 1441728000000
                },
                {
                name: "潮鳴り",
                id: 22707008,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 15102,
                name: "折戸伸治",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [
                "PC 游戏《CLANNAD》插曲",
                "TV 动画《CLANNAD》插曲"
                ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 0,
                v: 37,
                crbt: null,
                cf: "",
                al: {
                id: 2083842,
                name: "CLANNAD ORIGINAL SOUNDTRACK",
                picUrl: "http://p4.music.126.net/PtLd62-khEg8iCutTdE5Vg==/109951163286813093.jpg",
                tns: [ ],
                pic_str: "109951163286813093",
                pic: 109951163286813090
                },
                dt: 157000,
                h: {
                br: 320000,
                fid: 0,
                size: 6283014,
                vd: -2
                },
                m: {
                br: 192000,
                fid: 0,
                size: 3769825,
                vd: 0
                },
                l: {
                br: 128000,
                fid: 0,
                size: 2513231,
                vd: 430
                },
                a: null,
                cd: "2",
                no: 2,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 2,
                s_id: 0,
                mark: 9007199255134208,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 663018,
                publishTime: 1092326400007,
                tns: [
                "潮鸣"
                ]
                },
                {
                name: "Loving Strangers",
                id: 2788529,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 61082,
                name: "Jocelyn Pook",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 72726,
                name: "Russian Red",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 0,
                v: 25,
                crbt: null,
                cf: "",
                al: {
                id: 281067,
                name: "Habitación En Roma",
                picUrl: "http://p4.music.126.net/4YLeBH86MTluZLqojCz9nQ==/109951164616015223.jpg",
                tns: [ ],
                pic_str: "109951164616015223",
                pic: 109951164616015220
                },
                dt: 239000,
                h: {
                br: 320000,
                fid: 0,
                size: 9563112,
                vd: -8200
                },
                m: {
                br: 192000,
                fid: 0,
                size: 5737949,
                vd: -5600
                },
                l: {
                br: 128000,
                fid: 0,
                size: 3825368,
                vd: -3700
                },
                a: null,
                cd: "1",
                no: 18,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 2,
                s_id: 0,
                mark: 262144,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 1273161600007
                },
                {
                name: "Moon River",
                id: 494489884,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 47942,
                name: "Audrey Hepburn",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 139457,
                name: "Mancini",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 271544,
                name: "DR",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 45,
                st: 0,
                rt: null,
                fee: 8,
                v: 8,
                crbt: null,
                cf: "",
                al: {
                id: 35860744,
                name: "The Best Compilation Ever",
                picUrl: "http://p4.music.126.net/UPTHyg3lY44fJLCccPEdbQ==/17655957719264627.jpg",
                tns: [ ],
                pic_str: "17655957719264627",
                pic: 17655957719264628
                },
                dt: 123160,
                h: {
                br: 320000,
                fid: 0,
                size: 4928827,
                vd: 55480
                },
                m: {
                br: 192000,
                fid: 0,
                size: 2957314,
                vd: 55480
                },
                l: {
                br: 128000,
                fid: 0,
                size: 1971557,
                vd: 55480
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 262144,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 405025,
                publishTime: 1428768000007
                },
                {
                name: "A Thousand Years",
                id: 1448422465,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 52979,
                name: "Christina Perri",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 60,
                st: 0,
                rt: "",
                fee: 8,
                v: 5,
                crbt: null,
                cf: "",
                al: {
                id: 89514147,
                name: "Ballads",
                picUrl: "http://p4.music.126.net/xT_57cghY8qDsZid_-UUpw==/109951164990091853.jpg",
                tns: [ ],
                pic_str: "109951164990091853",
                pic: 109951164990091860
                },
                dt: 285152,
                h: {
                br: 320001,
                fid: 0,
                size: 11407195,
                vd: -42113
                },
                m: {
                br: 192001,
                fid: 0,
                size: 6844334,
                vd: -39515
                },
                l: {
                br: 128001,
                fid: 0,
                size: 4562904,
                vd: -37799
                },
                a: null,
                cd: "01",
                no: 39,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 270336,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 7002,
                publishTime: 1589472000000
                },
                {
                name: "La Vie En Rose",
                id: 37820801,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 975673,
                name: "Daniela Andrade",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: null,
                fee: 8,
                v: 19,
                crbt: null,
                cf: "",
                al: {
                id: 3415946,
                name: "La Vie En Rose",
                picUrl: "http://p3.music.126.net/J24xsphxfeasO1CzuF3NmQ==/109951165988192245.jpg",
                tns: [ ],
                pic_str: "109951165988192245",
                pic: 109951165988192240
                },
                dt: 105500,
                h: {
                br: 320000,
                fid: 0,
                size: 4222476,
                vd: -24732
                },
                m: {
                br: 192000,
                fid: 0,
                size: 2533503,
                vd: -22123
                },
                l: {
                br: 128000,
                fid: 0,
                size: 1689017,
                vd: -20429
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 270336,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 5393943,
                rurl: null,
                mst: 9,
                cp: 1416729,
                publishTime: 1449057698860
                },
                {
                name: "The Best For You",
                id: 1453911130,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 1087140,
                name: "欧阳娜娜",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 6,
                crbt: null,
                cf: "",
                al: {
                id: 90522645,
                name: "NANA I",
                picUrl: "http://p3.music.126.net/BKmoyFBZ67oaHeMtIeBi1g==/109951165048116778.jpg",
                tns: [ ],
                pic_str: "109951165048116778",
                pic: 109951165048116780
                },
                dt: 238822,
                h: {
                br: 320000,
                fid: 0,
                size: 9555636,
                vd: -30283
                },
                m: {
                br: 192000,
                fid: 0,
                size: 5733399,
                vd: -27660
                },
                l: {
                br: 128000,
                fid: 0,
                size: 3822280,
                vd: -25927
                },
                a: null,
                cd: "01",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 270336,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 10945464,
                rurl: null,
                mst: 9,
                cp: 1416860,
                publishTime: 0
                },
                {
                name: "人生のメリーゴーランド -Jazz Ver.-",
                id: 484058217,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 12302044,
                name: "シエナ・ウインド・オーケストラ",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 12302074,
                name: "オリタ ノボッタ",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: null,
                fee: 8,
                v: 10,
                crbt: null,
                cf: "",
                al: {
                id: 35622060,
                name: "SUPER SOUND COLLECTION スタジオジブリ吹奏楽",
                picUrl: "http://p3.music.126.net/APYe3IGDvLaYWXe4NVvh8g==/18989665323504298.jpg",
                tns: [
                "吉卜力动画管乐曲 SUPER SOUND COLLECTION"
                ],
                pic_str: "18989665323504298",
                pic: 18989665323504296
                },
                dt: 225960,
                h: {
                br: 320000,
                fid: 0,
                size: 9041546,
                vd: -13200
                },
                m: {
                br: 192000,
                fid: 0,
                size: 5424945,
                vd: -10599
                },
                l: {
                br: 128000,
                fid: 0,
                size: 3616644,
                vd: -8900
                },
                a: null,
                cd: "1",
                no: 6,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 401536,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 457010,
                publishTime: 1497369600007,
                tns: [
                "人生的旋转木马 -Jazz Ver.-"
                ]
                },
                {
                name: "Once A Girl Likes U",
                id: 543160806,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 12395708,
                name: "MT1990",
                tns: [ ],
                alias: [ ]
                },
                {
                id: 12056052,
                name: "小猪迷糊糊",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 95,
                st: 0,
                rt: null,
                fee: 8,
                v: 12,
                crbt: null,
                cf: "",
                al: {
                id: 37796705,
                name: "Once A Girl Likes U",
                picUrl: "http://p4.music.126.net/YgQqYKmIsioEtaCsND5VTA==/109951163172666515.jpg",
                tns: [ ],
                pic_str: "109951163172666515",
                pic: 109951163172666510
                },
                dt: 237565,
                h: {
                br: 320000,
                fid: 0,
                size: 9512795,
                vd: -22000
                },
                m: {
                br: 192000,
                fid: 0,
                size: 5707694,
                vd: -19400
                },
                l: {
                br: 128000,
                fid: 0,
                size: 3805144,
                vd: -17700
                },
                a: null,
                cd: "01",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 64,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 1520072210310
                },
                {
                name: "愛し子よ",
                id: 640545,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 17597,
                name: "ルルティア",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 15,
                crbt: null,
                cf: "",
                al: {
                id: 61395,
                name: "愛し子よ",
                picUrl: "http://p3.music.126.net/29da7sjjJD5fDS4MfWgiwA==/756463999921839.jpg",
                tns: [ ],
                pic: 756463999921839
                },
                dt: 220000,
                h: {
                br: 320000,
                fid: 0,
                size: 8805607,
                vd: -15599
                },
                m: {
                br: 192000,
                fid: 0,
                size: 5283465,
                vd: -13000
                },
                l: {
                br: 128000,
                fid: 0,
                size: 3522394,
                vd: -11200
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 9007199255011328,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 281222,
                rurl: null,
                mst: 9,
                cp: 7003,
                publishTime: 1002297600000
                },
                {
                name: "僕が死のうと思ったのは",
                id: 26830207,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 160729,
                name: "中島美嘉",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 425,
                crbt: null,
                cf: "",
                al: {
                id: 2565022,
                name: "僕が死のうと思ったのは",
                picUrl: "http://p3.music.126.net/ECoB5pAS7dnHfFLrsifWPg==/109951165946252774.jpg",
                tns: [ ],
                pic_str: "109951165946252774",
                pic: 109951165946252770
                },
                dt: 380577,
                h: {
                br: 320000,
                fid: 0,
                size: 15223162,
                vd: -47602
                },
                m: {
                br: 192000,
                fid: 0,
                size: 9133915,
                vd: -45029
                },
                l: {
                br: 128000,
                fid: 0,
                size: 6089291,
                vd: -43371
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 270336,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 159031,
                rurl: null,
                mst: 9,
                cp: 2706476,
                publishTime: 1377619200000,
                tns: [
                "曾经我也想过一了百了"
                ]
                },
                {
                name: "Намалюю тобі зорі ",
                id: 31209680,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 1030001,
                name: "周深",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 80,
                st: 0,
                rt: null,
                fee: 0,
                v: 267,
                crbt: null,
                cf: "",
                al: {
                id: 3104432,
                name: "最新热歌慢摇94",
                picUrl: "http://p4.music.126.net/FZX7XAjsmEPGyVOqm4H7aQ==/109951166361039007.jpg",
                tns: [ ],
                pic_str: "109951166361039007",
                pic: 109951166361039000
                },
                dt: 189000,
                h: null,
                m: null,
                l: {
                br: 128000,
                fid: 0,
                size: 3035012,
                vd: 42584
                },
                a: null,
                cd: "01",
                no: 14,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 2,
                s_id: 0,
                mark: 262144,
                originCoverType: 0,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 1388505600004
                },
                {
                name: "微睡む月の夜のアリア 竖琴ver.",
                id: 406000158,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 1138026,
                name: "Meandi鸦缺",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 85,
                st: 0,
                rt: "",
                fee: 0,
                v: 4,
                crbt: null,
                cf: "",
                al: {
                id: 34511778,
                name: "微睡む月の夜のアリア",
                picUrl: "http://p4.music.126.net/qRLIuZGI4soPuo-4AFxEOA==/16643307510201854.jpg",
                tns: [ ],
                pic_str: "16643307510201854",
                pic: 16643307510201854
                },
                dt: 141931,
                h: {
                br: 320000,
                fid: 0,
                size: 5684288,
                vd: -15100
                },
                m: {
                br: 192000,
                fid: 0,
                size: 3410590,
                vd: -12400
                },
                l: {
                br: 128000,
                fid: 0,
                size: 2273741,
                vd: -10599
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 262144,
                originCoverType: 2,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 0,
                publishTime: 1457521640993
                },
                {
                name: "是但求其爱",
                id: 1496602290,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 2116,
                name: "陈奕迅",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 5,
                crbt: null,
                cf: "",
                al: {
                id: 98517711,
                name: "是但求其爱",
                picUrl: "http://p4.music.126.net/flFrObLA9GZdj8B0b6ni1A==/109951165480807278.jpg",
                tns: [ ],
                pic_str: "109951165480807278",
                pic: 109951165480807280
                },
                dt: 269035,
                h: {
                br: 320001,
                fid: 0,
                size: 10762493,
                vd: -57464
                },
                m: {
                br: 192001,
                fid: 0,
                size: 6457513,
                vd: -54838
                },
                l: {
                br: 128001,
                fid: 0,
                size: 4305023,
                vd: -53067
                },
                a: null,
                cd: "01",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 8192,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 10971589,
                rurl: null,
                mst: 9,
                cp: 7003,
                publishTime: 1605801600000
                },
                {
                name: "Without You",
                id: 3029019,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 66355,
                name: "Mariah Carey",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 18,
                crbt: null,
                cf: "",
                al: {
                id: 306437,
                name: "Without You",
                picUrl: "http://p3.music.126.net/CDCzZ6EDBvw9vUDfjP3lPg==/109951163271821211.jpg",
                tns: [ ],
                pic_str: "109951163271821211",
                pic: 109951163271821220
                },
                dt: 214026,
                h: {
                br: 320002,
                fid: 0,
                size: 8564027,
                vd: 2273
                },
                m: {
                br: 192002,
                fid: 0,
                size: 5138434,
                vd: 4970
                },
                l: {
                br: 128002,
                fid: 0,
                size: 3425637,
                vd: 6802
                },
                a: null,
                cd: "1",
                no: 1,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 262144,
                originCoverType: 2,
                originSongSimpleData: {
                songId: 2199935,
                name: "Without You",
                artists: [
                {
                id: 48516,
                name: "Badfinger"
                }
                ],
                albumMeta: {
                id: 221718,
                name: "No Dice"
                }
                },
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 0,
                rurl: null,
                mst: 9,
                cp: 7001,
                publishTime: 759254400007
                },
                {
                name: "I Have Nothing",
                id: 3819488,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 84061,
                name: "Whitney Houston",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "",
                fee: 8,
                v: 41,
                crbt: null,
                cf: "",
                al: {
                id: 386366,
                name: "The Bodyguard (Original Motion Picture Soundtrack)",
                picUrl: "http://p4.music.126.net/0IgaZZhaMzEOttsBwG3lMA==/109951163122961816.jpg",
                tns: [ ],
                pic_str: "109951163122961816",
                pic: 109951163122961820
                },
                dt: 290026,
                h: {
                br: 320000,
                fid: 0,
                size: 11603636,
                vd: -2
                },
                m: {
                br: 192000,
                fid: 0,
                size: 6962199,
                vd: -2
                },
                l: {
                br: 128000,
                fid: 0,
                size: 4641480,
                vd: -2
                },
                a: null,
                cd: "1",
                no: 2,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 1,
                s_id: 0,
                mark: 262144,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 5363039,
                rurl: null,
                mst: 9,
                cp: 7001,
                publishTime: 721929600007,
                tns: [
                "保镖"
                ]
                },
                {
                name: "后来",
                id: 254574,
                pst: 0,
                t: 0,
                ar: [
                {
                id: 8326,
                name: "刘若英",
                tns: [ ],
                alias: [ ]
                }
                ],
                alia: [ ],
                pop: 100,
                st: 0,
                rt: "600902000007952517",
                fee: 8,
                v: 51,
                crbt: null,
                cf: "",
                al: {
                id: 25437,
                name: "我等你",
                picUrl: "http://p4.music.126.net/eBF7bHnJYBUfOFrJ_7SUfw==/109951163351825356.jpg",
                tns: [ ],
                pic_str: "109951163351825356",
                pic: 109951163351825360
                },
                dt: 341400,
                h: {
                br: 320000,
                fid: 0,
                size: 13658949,
                vd: -3500
                },
                m: {
                br: 192000,
                fid: 0,
                size: 8195386,
                vd: -1000
                },
                l: {
                br: 128000,
                fid: 0,
                size: 5463605,
                vd: -2
                },
                a: null,
                cd: "1",
                no: 2,
                rtUrl: null,
                ftype: 0,
                rtUrls: [ ],
                djId: 0,
                copyright: 0,
                s_id: 0,
                mark: 8704,
                originCoverType: 1,
                originSongSimpleData: null,
                single: 0,
                noCopyrightRcmd: null,
                rtype: 0,
                mv: 5365400,
                rurl: null,
                mst: 9,
                cp: 684010,
                publishTime: 941385600000
                }
                ];
              // axios.get("http://www.codeman.ink:3000/playlist/detail?id=7118359658&timestamp=1640134004000").then(
              //   function(response){
              //     that.dialogFormVisible = false;
              //     that.loginStatus=true;
              //     that.musicList=response.data.playlist.tracks;
                  
              //   },function(err){

              //   }
              // )
            },function(err){

            }
          )
          
          
        }
      },function(err){
        console.log(err)
        this.$alert('账号密码错误', '', {
          confirmButtonText: '确定',
          callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          //   });
          }
        });
      })


    }

  },
});
