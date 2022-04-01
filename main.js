"ui";

importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);
importClass("com.stardust.autojs.core.web.InjectableWebClient");

/* -------------------------------------------------------------------------- */
let sScriptEngine = engines.myEngine();
let scriptableContext = sScriptEngine.context;
let scriptableScriptable = sScriptEngine.scriptable;
let injectableWebClient = new InjectableWebClient(scriptableContext, scriptableScriptable);
/* -------------------------------------------------------------------------- */
//var common= require('jquery.min.js');
ui.layout(
<frame w="*" h="*">
  <vertical bg="#E0FFFF">
      {/* <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="gettask" text="获取任务id" w="auto" /> */}
      <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="finishTask" text="一键任务" w="auto" />
      <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="back" text="后退" w="auto" />
      <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="go" text="前进" w="auto" />
      {/* <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="ck" text="获取cookie" w="auto" /> */}
      <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="clienck" text="清除cookie" w="auto" />
      {/* <button layout_gravity="right|bottom" style="Widget.AppCompat.Button.Colored" id="test" text="test" w="auto" /> */}
      <webview id="webview" h="*" w="*" />

  </vertical>
</frame>
);

let webview = ui.webview;
url = "https://app.fmcc.com.cn/bass-bountyH5/main"
webview.loadUrl(url)
yz();
url = "https://app.fmcc.com.cn/bass-bountyH5/main"
webview.loadUrl(url)
url = "https://app.fmcc.com.cn/bass-bonusServer/getUserPushConfList"
webview.loadUrl(url)


// ui.ck.on("click", ()=>{
//   console.log('当前的ck是' + getCookie());
// });

ui.back.on("click", ()=>{
  webview.goBack()
});

ui.go.on("click", ()=>{
  webview.goForward()
});

// ui.gettask.on("click", ()=>{
//   threads.start(function(){gettaskid()})
//   //webview.gettaskid()
// });

ui.finishTask.on("click", ()=>{
  console.show();
  log('任务开始')
  threads.start(function(){finish()})
  //webview.gettaskid()
});

ui.clienck.on("click", ()=>{
  clienCookie()
  webview.loadUrl(url)
});

// ui.test.on("click", ()=>{
//   yz()
// });


//清除cookie
function clienCookie() {
  var cookieManager = web.cookieManager;
  cookieManager.removeAllCookie();
}

//获取cookie值
function getCookie() {
  http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(web.webkitCookieJar))
  var cookieManager = web.cookieManager;
  var ck = cookieManager.getCookie(url)
  return ck
}



function getqipaotaskid() {
  var getck = getCookie()
  var url='https://app.fmcc.com.cn/bass-bonusServer/getBonusTask';
  var res = httpget(url);
    //获取气泡id
    var r = res.data.bubbleTaskList;
    var taskids = new Array();
    for(x in r){
      taskids.push(r[x].id);
      sleep(200);
    }
    //log(taskids)
    return taskids
}

function finishqipaotask() {
  var taskIds = getqipaotaskid();
  //开始提交气泡任务任务
  log('开始提交气泡')
  var url = 'https://app.fmcc.com.cn/bass-bonusServer/finishTask';
  for(i in taskIds){
      var data = {
        clientVersion : '800',
        taskId : taskIds[i],
        taskType : '1',
      };
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      threads.start(function(){var res = httppostjson(url,data)});
      sleep(1000);
  }

}


function gettaskid() {

  var getck = getCookie()
  var url='https://app.fmcc.com.cn/bass-bonusServer/getBonusTask';
  var res = httpget(url);

  var taskids = new Array();
  //获取低碳任务列表id
  var r = res.data.carbonTask.subList;
  for(x in r){
    for(v in r[x].taskList){
      //log(r[x].taskList[v].mainTitle)
      taskids.push(r[x].taskList[v].id);
      sleep(100);
    }
  }

  //获取日常任务id
  var r = res.data.commonTask.taskList;
  for(x in r){
      taskids.push(r[x].id);
      sleep(100);
    }
  //log(taskids)


  //获取奖励金id
  var url = 'https://app.fmcc.com.cn/bass-bonusServer/getBonusPageTask'
  var res = httpget(url);
  var r = res.data.todayTaskList;
  for(x in r){
    taskids.push(r[x].id)
    sleep(100);
  }

  log('获取到以下任务:' + taskids);
  return taskids
}

function finishTask() {
  var getck = getCookie()
  //先获取任务id
  var taskIds = gettaskid();
  //开始执行任务
  var url = 'https://app.fmcc.com.cn/bass-bonusServer/finishTask';
  for(i in taskIds){
    var data = {
      clientVersion : '800',
      taskId : taskIds[i],
    };
    threads.start(function(){var res = httppostjson(url,data)});
    threads.start(function(){var res = httppostjson(url,data)});
    threads.start(function(){var res = httppostjson(url,data)});
    sleep(500);
  }
}




//拼图抽奖
function pintu1() { 
  var url = 'https://app.fmcc.com.cn/bass-pinTuGame/sign';
  var data = {
    type : '1'
  }
  var res1 = httppostjson(url,data);
  var Id = res1.data.userRecordId;
  log(Id);

  var url = 'https://app.fmcc.com.cn/bass-pinTuGame/luck';
  var data = {
    userRecordId : Id
  }
  var res = httppostjson(url,data);
  var name = res.data.name;
  log(name);
}


function pintu() { 
  var getck = getCookie();

  //获取分享次数
  for(i=0;i<5;i++){
    var url = 'https://app.fmcc.com.cn/bass-pinTuGame/share';
    var res = httpget(url);
    sleep(1000)
  }
  //获取拼图剩余次数
  var url= 'https://app.fmcc.com.cn/bass-pinTuGame/index';
  var res = httpget(url);
  var canplay = res.data.canPlayNum;
  log('拼图剩余次数:'+canplay);

  //如果还有次数进行抽奖
  if(canplay>0){  
    for(i=0;i<canplay;i++){
      log('等待抽奖ID')
      sleep(3000);
      varp = pintu1();
      sleep(3000);
      } 
    }
  }


function zp(){
  var url = 'https://app.fmcc.com.cn/bass-bonusServer/getUserCanDrawRemain';
  var data = {}
  var res = httppost(url,data);
  var canDrawRemain = res.data.canDrawRemain;
  //log(canDrawRemain);
  if(canDrawRemain > 0){
    var url = 'https://app.fmcc.com.cn/bass-bonusServer/luckyDraw?channel=';
    var data = {}
    var res = httppost(url,data);
    var prizeName = res.data.prizeName;
    log(prizeName)
  }
}


function yz(){
  var adid = device.getAndroidId()
  data = {
      'sn': adid
  }
  url = '101.43.32.143:6001'
  var res = httppostjson(url,data)
  if(res.sn!=='true'){
    setClip(adid);
    toast("认证失败，已复制id:"+adid);
    a = app.getPackageName('AutoJsPro')
    log(a)
    var result = shell("am force-stop "+a, true);
  }
  else{
    toast('认证成功');
  }
}



function finish(){
    //进行拼图活动
    var pt = pintu();
    //提交日常任务
    var ftk = finishTask();
    //提交气泡
    var fqptk = finishqipaotask();
    //转盘活动
    var z = zp();
    log('任务结束')
  }









  
//封装get请求
function httpget(url) {
  var res = http.get(url);
  if (res.statusCode == 200) {
      //toast("get请求成功");
      //console.show();
      //log(res.body.string());
      var r = JSON.parse(res.body.string());
      return r


  } else {
      toast("get请求失败:" + res.statusMessage);
  }
}

//封装post请求
function httppost(url,data) {
  var res = http.post(url,data);
  if (res.statusCode == 200) {
      //toast("post请求成功");
      //console.show();
      //log(res.body.string());
      var r = JSON.parse(res.body.string());
      return r
  } else {
      toast("post请求失败:" + res.statusMessage);
  }
}
//封装json请求
function httppostjson(url,data) {
  var res = http.postJson(url, data);
  if (res.statusCode == 200) {
    //toast("json请求成功");
    //console.show();
    //log(res.body.string());
    var r = JSON.parse(res.body.string());
    return r
} else {
    toast("json请求失败:" + res.statusMessage);
}}
