(function () {
  const $input = document.getElementById("input_url");
  const $container = document.getElementById("url_container")
  const keyname = "urls"

  // 获取url列表
  setTimeout(() => {
    getUrls().forEach(function (val, key) {
      $container.appendChild(createUrlDiv(val))
    })
  }, 100);


  // 为按钮绑定事件，对url进行添加操作
  document.getElementById("btn").onclick = function () {
    if ($input.data !== "") {
      let urls = getUrls();
      urls.push($input.value);

      setUrls(urls);
      $container.appendChild(createUrlDiv($input.value))
      updateBlockList();
      $input.value = "";
    }
  }

  // 生成一个包含url信息的div
  function createUrlDiv(url) {
    let data = document.createElement("div")
    data.innerText = url
    data.setAttribute("url", url);
    data.className = "url-div";
    data.onclick = function () {
      urlDivListener(data);
    }
    return data;
  }

  // 从localstorage中获取url
  function getUrls() {
    let data = localStorage.getItem(keyname);
    let urls = []
    if (data !== null) {
      urls = JSON.parse(data).urls;
    } else {
      urls = []
    }
    console.log("urls", urls)
    return urls;
  }

  // 对localstorage中的url进行设置
  function setUrls(urls) {
    let data = {urls: urls}
    localStorage.setItem(keyname, JSON.stringify(data))
  }

  // 想后台运行的代码提交更新数据的请求
  function updateBlockList() {
    chrome.runtime.sendMessage({type: 2233});
  }

  // 为一个包含url的div添加事件，点击删除
  function urlDivListener($urlDiv) {
    let urls = []
    getUrls().forEach((val, key) => {
      if (val !== $urlDiv.getAttribute("url")) {
        urls.push(val)
      }
    });
    $urlDiv.remove();
    setUrls(urls);
    updateBlockList();
  }

  // 方便地移除当前结点
  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  }
})();
