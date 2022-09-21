# Ajax与Comet

## XMLHttpRequest对象

IE5是第一款引入XHR对象的浏览器。 在IE5中， XHR对象是通过MSXML库中的一个ActiveX对象实现的。 因此， 在IE中可能会遇到三种不同的版本的XHR对象， 即 `MSXML2.XMLHttp`、 `MSXML2.XMLHTTP.3.0`、`MSXML2.XMLHttp.6.0`。

```javascript
// 使用于IE7之前的版本
function createXHR () {
  if (typeof arguments.callee.activeXString !== 'string') {
    var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
        i,
        len;

    for (i = 0, len = version.length; i < len; i++) {
      try {
        new ActiveXObject(version[i]);
        arguments.callee.activeXString = versions[i];
        break;
      } catch (e) {}
    }
  }

  return new ActiveXObject(arguments.callee.activeXString);
}

```

IE7+、Firedox、Opera、Chorme和Safari都支持原生的XHR对象，在这些浏览器中创建XHR对象如下:

```javascript
var xhr = new XMLHttpRequest();
```

## XHR的用法

在使用XHR对象时，要调用的第一个方法是`open()`， 它接收三个参数: 要发送的请求类型(get、post等)、请求的URL和表示是否异步发送的布尔值。

```javascript
xhr.open('get', 'example.php', false);
```

要发送特定的请求，必须调用`send()` 方法。 `send()` 接收一个参数， 即要作为请求的主体发送的数据。如果不需要， 这必须传入null。

```javascript
xhr.open('get', 'example.php', false);
xhr.send(null);
```
调用 `send()` 之后，请求会被分派到服务器。

由于这次请求是同步的，JavaScript代码会等到服务器响应之后再继续执行。在收到响应后，响应的数据会自动填充XHR对象的属性， 相关的属性如下:

- `responseText`: 作为响应主体被返回的文本。
- `responseXML`: 如果响应内容的类型是 `text/xml` 或 `application/xml`， 这个属性中将保存着包含响应数据的 XML DOM 文本。
- `status`: 响应HTTP的状态。
- `statusText`：HTTP状态的说明。

在接收到响应后，第一步是检查 `status属性`， 以确定响应成功返回。

```javascript
xhr.open('get', 'example.php', false);
xhr.send(null);

if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  alert(xhr.responseText);
} else {
  alert('请求失败: ' + xhr.status);
}
```
建议通过检测 `status` 来决定下一步的操作，不要依赖`statusText`。另外，无论什么内容类型是什么，响应主体的内容都会保存到`responseText`属性中，而对于非XML数据而言，`responseXML`属性的值将为null。

像前面这样发送同步请求当然没有什么，但多数情况下，我们还是要发送异步请求，才能让JavaScript继续执行而不必等待响应。此时，可以检测XHR对象的`readyState属性`，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

- 0: 未初始化。尚未调用open()方法。
- 1: 启动。已经open()但未send()。
- 2: 已发送。已send()但未接收到响应。
- 3: 接收。已接收到部分响应数据。
- 4: 完成。已经接收到全部数据，而且已经可以在客户端使用了。

只要`readyState属性`值改变，都会触发一次`readystatechange事件`。

```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'example.php', true);
xhr.send(null);

xhr.readtstatechange = function () {
  if (xhr.readystate === 4 && xhr.status === 200) {
    alert(xhr.responseText);
  } else {
    alert('请求失败' + xhr.status);
  }
}
```



## AJAX封装

```javascript
var $ = (function () {
  var o = window.XMLHttpRequest ? 
      		new XMLHttpRequest : 
  				new ActiveXObject('Microsoft.XMLHTTP');
  
  if (!o) {
    throw new Error('您的浏览器不支持异步发起HTTP请求');
  }
  
  function _doAjax (opt) {
  	var opt = opt || {},
        url = opt.url,
        type = opt.type || 'GET',
        data = opt.data,
        async = opt.async || true,
        success = opt.success || function () {},
        error = opt.error || function () {},
        complete = opt.complete || function () {};
    
    o.open(type, url, async);
    
    type === 'POST' 
    ? 
    o.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    :
    null;
    
    o.send(type === 'GET' ? null : formatData(data));
    
    o.onreadystatechange = function () {
      if (o.readystate === 4 && o.status === 200) {
        success(JSON.parse(o.responseText));
      }
      
      if (o.readystate === 4 && o.status === 404) {
        error(o.responseText);
      }
      
    }
    
    function formatData (data) {
      var str = '';
      for(var key in data) {
        str += key + '=' + data[key] + '&';
      }
      
      return str.replace(/&$/, '');
    }
  }
  
  
  return {
    ajax: function (opt) {
      _doAjax(opt);
    },
    get: function (opt) {
      _doAjax({
        type: 'GET',
        url: opt.url,
        async: opt.async,
        success: opt.success,
        error: opt.error,
        complete: opt.complete
      })
    },
    set: function (opt) {
      _doAjax({
        type: 'POST',
        url: opt.url,
        async: opt.async,
        success: opt.success,
        error: opt.error,
        complete: opt.complete
      })
    }
  }
  
})();
```











