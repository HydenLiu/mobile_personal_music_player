window.onload = window.onresize = phoneFontSize;

//手机端适配函数
function phoneFontSize() {

    var userClientWidth = document.documentElement.clientWidth;
    var x = 375;
    var userFontSize;

    if (userClientWidth < x) {

        userFontSize = 100 / (x / 375);

    } else if (userClientWidth > 750) {

        userFontSize = 100 / (x / 750);

    } else {
        userFontSize = 100 / (x / userClientWidth);
    }
    document.documentElement.style.fontSize = userFontSize + "px";
}

var $music = new Audio("./爱情公寓我的未来式.mp3");

var $play = $(".play");
var $yl = $(".yl");
var $replay2 = $(".replay2");
var $ylBar = $(".ylBar");4
var $yBar = $(".yBar");
var $twoTime = $(".twoTime");
var $progressBar = $(".barCenter");
var $startBar = $(".barStart");
var $barEnd = $(".barEnd");
var $barMini = $(".barMini");
var $pic = $(".pic");


//播放/暂停音乐
$play.onclick = function () {

    if ($music.paused) {
        $music.play();
        $pic.classList.add("rotate");
        this.style.backgroundImage = "url(./img/play1.png)";
    } else {
        $music.pause();
        $pic.classList.remove("rotate");
        this.style.backgroundImage = "url(./img/play2.png)";
    }
};

//是否静音
$yl.onclick = function(){

    if ($music.muted){
        this.style.backgroundImage = "url(./img/yl.png)";
        $ylBar.style.display = "block";
    }else {
        $music.muted = false;
        this.style.backgroundImage = "url(./img/jy.png)";
        $ylBar.style.display = "none";
    }

    $music.muted = !$music.muted;
};

//重播
$replay2.onclick = function () {
    $music.currentTime = 0;
    $music.play();
};

//两倍速播放
$twoTime.onclick = function(){
    $music.playbackRate = 2;
    $music.play();
};


//获取左右时间
$music.onloadedmetadata = function () {
    $barEnd.innerHTML = conversion($music.duration);
    $startBar.innerHTML = conversion($music.currentTime);
};



//进度条
$progressBar.onclick = function (event) {
    var coordStart = this.getBoundingClientRect().left;
    var coordEnd = event.pageX;
    var p = (coordEnd - coordStart) / this.offsetWidth;
    $barMini.style.width = p.toFixed(3) * 100 + '%';

    $music.currentTime = p * $music.duration;
    $music.play();
    if (!$music.paused) {
        $pic.classList.add("rotate");
        $play.style.backgroundImage = "url(./img/play1.png)";
    }
};

setInterval(() => {
    $startBar.innerHTML = conversion($music.currentTime);
    $barMini.style.width = $music.currentTime / $music.duration.toFixed(3) * 100 + '%'
}, 1000);

//声音控制
$ylBar.addEventListener('click', function (event) {

    var coordStart = this.getBoundingClientRect().left;
    var coordEnd = event.pageX;
    var p = (coordEnd - coordStart) / this.offsetWidth;
    $yBar.style.width = p.toFixed(3) * 100 + '%';
    $music.volume = p;

});


//获取左右时间函数
function conversion (value) {
    var minute = Math.floor(value / 60);
    minute = minute.toString().length === 1 ? ('0' + minute) : minute;
    var second = Math.round(value % 60);
    second = second.toString().length === 1 ? ('0' + second) : second;
    return `${minute}:${second}`
}


//歌词设置

//存储调节的时间值
if (!localStorage.time) {
    localStorage.time = 0;
}
var a = `
[00:03.07]词：刘伟恩
[00:03.24]曲：JEON/JUN GYU
[00:03.44]编曲：徐肖
[00:03.60]音乐制作人：张志林
[00:03.90]MV导演/改编：韦正
[00:04.20]吉他：李庭匡
[00:04.39]鼓：陈柏州/MR.Q
[00:04.63]录音师/录音棚：葛亮-林腾录音棚
[00:05.12]混音师/混音棚：Andrew C/LinkTune studio
[00:05.55]OP：WARNER CHAPPELL MUSIC KOREA INC
[00:05.68]SP：Warner/Chappell Music Publishing Agency (Beijing) Ltd.
[00:13.45]脱下鞋子跳舞
[00:14.87]赤着脚太空漫步
[00:17.67]我笑了你还装酷
[00:19.65]阳光晒过的路
[00:21.03]正好是年轻的温度
[00:23.86]温暖舒服
[00:25.78]吵醒了闹区的树木
[00:28.99]吸一口纯氧就漂浮
[00:31.94]蓝色背景下我练习飞行的角度
[00:36.11]保持我的态度
[00:38.08]我的未来式 由我做主
[00:41.34]跳整天的舞 玩耍整片荧幕
[00:44.28]不断电的梦 直线加速
[00:47.49]奔跑在我画的地图
[00:52.80]谢谢你对我微笑
[00:55.38]十年相伴 这一路
[00:59.60]每一步 每一步
[01:05.14]我的未来式 由我做主
[01:08.37]每一个动作 我都完整投入
[01:11.30]不断电的你 陪我加速
[01:14.59]奔跑在我们的领土
[01:17.53]我的未来式 由我做主
[01:20.77]每一个动作 我都完整投入
[01:23.61]不断电的你 陪我加速
[01:26.85]奔跑在我们的领土
            `;
var shijianshuzu = [];
var gecishuzu = [];
var $left = $(".left");
var $right = $(".right");

$left.onclick = function(){
    back();
};

$right.onclick = function () {
    forward();
};


function parse(lrc) {

    str = lrc.split("[");
    for (var i = 1; i < str.length; i++) {

        var shijian = str[i].split(']')[0];
        var geci = str[i].split(']')[1];
        var fen = shijian.split(":")[0];
        var miao = shijian.split(":")[1];
        var sec = parseInt(fen) * 60 + parseInt(miao);
        //存时间
        shijianshuzu[i - 1] = sec - localStorage.time;
        //存歌词
        gecishuzu[i - 1] = geci;
    }
    setInterval(updategeci, 1000);
}

//更新歌词
function updategeci() {
    //显示了六行歌词，每一行分别改变innerHTML
    var gecier = $("#er");
    var gecisan = $("#san");
    var gecisi = $("#si");
    var geciwu = $("#wu");
    var geciliu = $("#liu");
    //由歌词时间计算出i，得到现在应该显示哪部分歌词
    //这函数下面有介绍
    var i = getcurrent();

    if (gecishuzu[i - 1]) {
        gecier.innerHTML = gecishuzu[i - 1];
    } else {
        gecier.innerHTML = "&nbsp;";
    }
    gecisan.innerHTML = gecishuzu[i];
    if (gecishuzu[i + 1]) {
        gecisi.innerHTML = gecishuzu[i + 1];
    } else {
        gecisi.innerHTML = "&nbsp;";
    }
    if (gecishuzu[i + 2]) {
        geciwu.innerHTML = gecishuzu[i + 2];
    } else {
        geciwu.innerHTML = "&nbsp";
    }
    if (gecishuzu[i + 3]) {
        geciliu.innerHTML = gecishuzu[i + 3];
    } else {
        geciliu.innerHTML = "&nbsp;";
    }
}

//将歌曲实际播放的时间，和我们自己的歌词的时间，进行比较，算出现在应该显示的歌词
function getcurrent() {
    var i = 0;

    for (i = 0; i < shijianshuzu.length; i++) {

        if (shijianshuzu[i] >= $music.currentTime) {
            return i;
        }
    }
    return i - 1;
}

//函数写成这种形式是为了加载页面的时候自动执行
(function ok() {
    parse(a);
})();

//歌词时间减少2S
function back() {
    localStorage.time = parseInt(localStorage.time) - 2;
    parse(a);
}

//歌词时间增加2s
function forward() {
    localStorage.time = parseInt(localStorage.time) + 2;
    parse(a);
}


