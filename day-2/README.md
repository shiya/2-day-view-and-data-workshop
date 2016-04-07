## 前端技术

今天讲前端。

## HTML 模板
ejs 和 HTML 的语法是一样的。今天要开发一款 WebGL app，所以不能向很老的浏览器兼容。

```
<!-- index.ejs -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title></title>
  <meta name="author" content="Shiya Luo">

  <!-- viewer files to include -->
  <link type="text/css" rel="stylesheet" href="https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css"/>
  <script src="https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js"></script>

</head>

<body>

<div id="viewer"></div>

</body>
</html>
```

## 用 JavaScript 初始化 viewer
```
function initialize() {
    var options = {
        'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlidWNrZXQvc2t5c2NwcjEuM2Rz',
        'env':'AutodeskProduction',
        'getAccessToken': token,
        'refreshToken': token
        };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});

    Autodesk.Viewing.Initializer(options,function() {
        viewer.initialize();
        viewer.load(options.document);
    });
}
```

## 对 viewer 进行操作
打开 JavaScript console。

```
viewer.setLightPreset(5);
viewer.explode(0.5);
```

## JavaScript APIs
资源:
[示例代码](http://developer-autodesk.github.io/LmvDbg/)
[文档](https://developer.autodesk.com/api/viewerapi/)
[源代码](https://autodeskviewer.com/viewers/2.5/viewer3D.js)

## 事件
Viewer是在页面初始化以后才开始把图形信息加载进去，所以如果页面 onLoad 就开始操作，会出现错误。要避免这样的情况，监听`GEOMETRY_LOADED_EVENT`。

例如获取 object tree：
```
viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {
  var objectTree = {};
  viewer.getObjectTree(function(tree) {
    console.log(tree);
    objectTree = tree;
  });
});
```

## 课后:
- 创建一款显示一个模型的页面
- 用监听事件的方式，把用户选中的元素高亮并放大
  - 提示：参照用示例代码的“selection set”
