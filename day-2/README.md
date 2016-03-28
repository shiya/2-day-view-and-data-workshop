##Client-side technologies

We're working with the "view" today.

##Starter HTML Template
Either you're working with EJS or HTML, the basic syntax is the same.
We're working with WebGL in today's session, so there is no backward compatibility to older Internet Explorer versions, or older Safari versions.

```
<!-- index.ejs -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Login</title>
  <meta name="author" content="Shiya Luo">

  <!-- viewer files to include -->
  <link type="text/css" rel="stylesheet" href="https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css"/>
  <script src="https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js"></script>


  <link rel="stylesheet" href="css/styles.css">
</head>

<body>

<div id="body"></div>

<script src="js/scripts.js"></script>
</body>
</html>
```

##Initialize the viewer with JavaScript (front end)
```
function initialize() {
    var options = {
        'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlidWNrZXQvc2t5c2NwcjEuM2Rz',
        'env':'AutodeskProduction',
        'getAccessToken': token,
        'refreshToken': token,
        };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});

    Autodesk.Viewing.Initializer(options,function() {
        viewer.initialize();
        viewer.load(options.document);
    });
}
```

##To Manipulate elements in the Viewer
Open the JavaScript console.

```
viewer.setLightPreset(5);
viewer.explode(0.5);
```

##JavaScript APIs
Two resources:
[Sample code](http://developer-autodesk.github.io/LmvDbg/)
[Documentation](https://developer.autodesk.com/api/viewerapi/)

##Event Listeners
The viewer stream stuff in after the page loads. If you write JavaScript code to do stuff with the viewer, you'll be hit with an error and the code won't be ran.
```
viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {
  // your code here, e.g. viewer.setLightPreset(2);
});
```

##Exercise:
Create a
