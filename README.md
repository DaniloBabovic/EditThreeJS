# EditThreeJS
Light editor for three.js

Live demo: 
http://playgroundthreed.appspot.com/doc/edit3js/edit3js.html?with_alias=true

Fast demo { antialias: false } 
http://playgroundthreed.appspot.com/doc/edit3js/edit3js.html?with_alias=false

![alt tag](http://playgroundthreed.appspot.com/doc/img/edit3js_1.png)

Productivity features:
* Runtime editing
* Position, rotation, scale
* Grouping
* Materials

The editor writes javascript for:
* lights
* single Object3D
* all Object3D

The main goal is to start with a new project a little bit faster.

There are Project files and Edit files in separate folders.
When you are done with the editor you can remove Editor folder.

The editor writes javascript code for file lights.js and load_scene.js located in the project directory.
You will get auto-generated code for lights.js and load_scene.js but you must manually overwrite it.

Happy coding!

License: MIT 



