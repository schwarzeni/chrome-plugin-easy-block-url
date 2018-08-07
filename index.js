(function () {

  // 从localstorage中获取url
  let urls = geturls();

  // 如果用户对url作出了修改在这里会及时更新
  chrome.runtime.onMessage.addListener(function(msg, sender ,callback) {
    if (msg.type === 2233) {
      urls = geturls();
    }
    callback()
  })

  // 对指定的url进行阻塞
  chrome.webRequest.onBeforeRequest.addListener(function (details) {
    for (let i = 0; i < urls.length; i++) {
      if (details.url.indexOf(urls[i]) !== -1) {
        return {cancel: true}
      }
    }
    return {cancel: false};
  }, {urls: ["<all_urls>"]}, ["blocking"])
})();

// 从localstorage中获取url
function geturls() {
  const data = localStorage.getItem("urls");
  let urls;
  if (data === null) {
    urls = []
  } else {
    urls = JSON.parse(data).urls
  }
  return urls;
}
