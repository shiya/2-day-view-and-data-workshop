##Client-side technologies

We're working with the "view" today.

##Starter HTML Template
Either you're working with EJS or HTML, the basic syntax is the same.
We're working with WebGL in today's session, so there is no backward compatibility to older Internet Explorer versions, or older Safari versions.

```html
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

<body onload="initialize()">

<div id="viewer"></div>

</body>
</html>
```

##Initialize the viewer with JavaScript (front end)
```javascript
  function getToken() {
    return "ZDPw2C19jKMUS7DL54JGnwYnqvqW";
  }

  function loadDocument(viewer, documentId) {
    // Find the first 3d geometry and load that.
    Autodesk.Viewing.Document.load(documentId, function(doc) {
      var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
        doc.getRootItem(),
        { 'type' : 'geometry', 'role' : '3d' },
        true);
      if (geometryItems.length > 0) {
        viewer.load(doc.getViewablePath(geometryItems[0]));
      }
    },
    function(errorMsg) { // onErrorCallback
      alert("Load Error: " + errorMsg);
    });
  }
  function initialize() {
    var options = {
      'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c2hpeWFzLWJ1Y2tldC0xNC9yZXZpdC5ydnQ=',
      'env':'AutodeskProduction',
      'getAccessToken': getToken,
      'refreshToken': getToken };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
    Autodesk.Viewing.Initializer(options,function() {
      viewer.initialize();
      loadDocument(viewer, options.document);
    });
  }
```

##To Manipulate elements in the Viewer
Open the JavaScript console.

```javascript
viewer.setLightPreset(5);
viewer.explode(0.5);
```

##JavaScript APIs
Resources:
[Sample code](http://developer-autodesk.github.io/LmvDbg/)
[Documentation](https://developer.autodesk.com/api/viewerapi/)
[Source Code](https://autodeskviewer.com/viewers/2.5/viewer3D.js)

##Event Listeners
The viewer stream stuff in after the page loads. If you write JavaScript code to do stuff with the viewer, you'll be hit with an error and the code won't be ran.

For example, getting an object tree:
```javascript
viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {
  var objectTree = {};
  viewer.getObjectTree(function(tree) {
    console.log(tree);
    objectTree = tree;
  });
});
```

##After class:
- Create an app where users can upload their model and display it on the client side
- Practice: highlight and zoom in on the selected element in the viewer
  - Hint: look in the "selection set" sample code
