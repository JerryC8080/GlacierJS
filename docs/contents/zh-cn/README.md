# ä»ç»


<p align="center">
  <a href="https://jerryc8080.github.io/GlacierJS/">
      <img width="320" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227085816.png?imageView2/2/w/320">
  </a>
</p>

<h3 align="center">
  <p><a href="https://jerryc8080.github.io/GlacierJS/#/contents/zh-cn/">ð ð¨ð³ ä¸­æææ¡£</a></p>
  <p><a href="https://jerryc8080.github.io/GlacierJS/">ð ð¬ð§ Document for English</a></p>
</h3>

<p align="center">
  ä¸æ¬¾è´åäºè®©ä½ æ´è½»æ¾æå»ºä¼ä¸çº§ PWA åºç¨çæ¡æ¶
</p>


## åè½

- ð§³ å¼ç®±å³ç¨
- ð½ åºäºæ´è±æ¨¡åçå¤ç»´æä»¶ç³»ç»ï¼ç¼ç¨æ´è§£è¦ï¼æ´èªç±
- ð SW å®å¨çæ³¨åä¸å¸è½½
- ð¡ éæèµæºç¼å­
- ð¢ èµæºé¢ç¼å­
- ð  è¿ç¨æ§å¶
- â²ï¸ æ°æ®ææ æ¶é

## å¨æº

ç±äº Service Worker ææ¯çå¤ææ§ï¼æä»¬å¨å¼å PWA åºç¨ä¸­ï¼éè¦äºè§£å¾å¤çç¸å³ç¥è¯ã     
[Google Workbox](https://developers.google.com/web/tools/workbox) æä¾äºä¸å¥æ¹ä¾¿ç APIï¼ç®åäºè¯¸å¦ SW æ³¨ååå®è£ãèµæºç¼å­ç­å¸¸è§ç SW æä½ï¼ä½å®çå®ä½æ¯ï¼ **ãåº Libsã**ã

å½æä»¬ SW ç¨åºä»£ç è¶æ¥è¶å¤çæ¶åï¼ä¼é æä»£ç èè¿ï¼ç®¡çæ··ä¹±ï¼å¤ç¨å°é¾ã    
åæ¶ä¸äºå¸¸è§ç PWA å®ç°ï¼å¦ï¼è¿ç¨æ§å¶ãè¿ç¨éè®¯ãæ°æ®ä¸æ¥ç­ï¼å¸æè½å®ç°æéææå¼çå¤ç¨ã    
æä»¬éè¦ä¸ä¸ªï¼ **ãæ¡æ¶ Frameworkã**ã    

æä»¬æ¯å¦å¯ä»¥ä½¿ç¨ Workbox ä½ä¸ºåºå±ææ¯ï¼å¨æ­¤ä¹ä¸æå»ºæ´é«ä¸å±æ½è±¡çæ¡æ¶ï¼æ¥è§£å³è¿äºé®é¢å¢ï¼    
äºæ¯ï¼ææé åºäºä¸å¥åºç¡å¥ä»¶ï¼GlacierJSã    
å®åºäºä¸ä¸ªæ ¸å¿ãå¤ç»´æ´è±æä»¶ç³»ç»ãï¼ä»¥åå¤ä¸ªæä»¶æ¥ï¼è®©ä½ æ´å¿«éçæå»ºä¸ä¸ªä¼ä¸çº§ç PWA åºç¨ã

> Glacier è¯ä¸ºãå°å·ãï¼æ¨å¨è´æ¬æ¾ç»ç [Lavas](https://github.com/lavas-project/lavas)

## æç®åçä¾å­

å¨ä¸»çº¿ç¨ä¸­
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js"></script>

<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const glacier = new GlacierWindow('./service-worker.js');

    glacier.register().then((registration) => {
      console.log('Register service-worker succeed', registration);
    }).catch((error) => {
      console.error('Register service-worker failed', error);
    });
</script>
```

å¨ ServiceWorker çº¿ç¨ä¸­
```javascript
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.js');

const { GlacierSW } = self['@glacierjs/sw'];
const glacierSW = new GlacierSW();
glacierSW.listen();
```

## è®¾è®¡æ¦è§

### æ¶æ
<p align="center">
    <img alt="logo" width="700" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227172033.png">
</p>

å®ç±å é¨åç»æï¼

* **æ ¸å¿**
    - [x] @glacierjs/core: ä½ä¸º Glacier çæ ¸å¿ï¼å®å®ç°äºæä»¶ç³»ç»ãæ¥å¿ç³»ç»ç­åè½ï¼ä¸è¬ä½ ä¸ä¼ç´æ¥ä½¿ç¨è¿ä¸ªæ¨¡åã
    - [x] @glacierjs/sw: è¿è¡å¨ SW è¿ç¨ä¸­çä»£ç ï¼å°è£äº SW ççå½å¨æï¼æä¾è½ç®åçç¼ç¨æ¹å¼ã
    - [x] @glacierjs/window: è¿è¡å¨ä¸»è¿ç¨çä»£ç ï¼é¤äºæ¯ææä»¶ç¼ç¨å¤ï¼è¿è´è´£ç®¡ç SW çæ³¨åä¸å¸è½½ã

* **åå»ºæä»¶**
    - [x] @glacierjs/plugin-precacheï¼å®ç°éæèµæºé¢ç¼å­åè½
    - [x] @glacierjs/plugin-reporterï¼å®ç°åºæ¬æ°æ®ä¸æ¥åè½
    - [x] @glacierjs/plugin-assetsï¼å®ç°éæèµæºç¼å­åè½
    - [x] @glacierjs/plugin-remote-controller: å®ç°è¿ç¨æ§å¶åè½

* **éå¥è®¾æ½**
    - [ ] @glacierjs/cliï¼æ¯æå¿«éåå»ºåºç¨ä¸æä»¶
    - [ ] @glacierjs/webpack-plugin: æ¯ææå»ºéæèµæºæ¸å

### å¤ç»´æ´è±æä»¶ç³»ç»

GlacierJS éå¯¹ä¼ ç»ç ServiceWorker çå½å¨æé©å­è¿è¡äºå°è£ï¼ä»èæ¯ææä»¶åã    
æä»¶ç³»ç»æ ¹æ®æ´è±æ¨¡åï¼ä¸ºæ¯ä¸ä¸ªåçççå½å¨æé©å­é½å®ç°äºä¸ä¸ªãæ´è±ãï¼æä»¥æä»¬ç§°è¿å¥ç³»ç»ä¸ºï¼    
> **ãå¤ç»´æ´è±æä»¶ç³»ç»ã**

![GlacierJS å¤ç»´æ´è±æä»¶ç³»ç»](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/plugin-system.drawio.png)

å¯¹ä¼ ç»çå½å¨æè¿è¡å°è£ä¹åï¼æä»¬ä¸ºæ¯ä¸ä¸ªæä»¶æä¾äºæ´ä¼éççå½å¨æé©å­å½æ°

![GlacierJS çå½å¨æå¾ç¤º](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/lifecycle.drawio.png)


# èç³»ä¸æ¯æ


* æ¬¢è¿éè¿é®ç®±æ¥è·æèç³»: huangjerryc@gmail.com
* æ¬¢è¿éè¿ [GitHub issue](https://github.com/JerryC8080/glacierjs/issues) æäº¤ BUGãä»¥åå¶ä»é®é¢
* æ¬¢è¿ç»è¯¥é¡¹ç®ç¹ä¸ªèµ â­ï¸ [star on GitHub](https://github.com/beautywe/beautywe) !

# License

This project is licensed under the [MIT license](https://cdn.jsdelivr.net/gh/JerryC8080/glacierjs/LICENSE).

Copyright (c) JerryC Huang (huangjerryc@gmail.com)
