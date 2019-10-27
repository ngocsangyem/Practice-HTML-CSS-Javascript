1. Detect the Drag & Drop Feature Support in Your Browser

```javascript
//Feature detection from Modernizr

var div = document.createElement('div');

if ('draggable' in div || ('ondragstart' in div && 'ondrop' in div))
	console.log('Drag and Drop API is supported!');
```

2. Decide which HTML Element is going to be dragged

-   The draggable attribute, which determines whether the element can be dragged or not.
-   The ondragstart event handler, which executes when the drag event starts.

```html
<p draggable="true" ondragstart="onDragStart(event)">Hello World</p>
```
