### Welcome to JQ-Cling.
This plugin attempts to recreate the Android ClingView in jQuery and JQM.

### What's the "ClingView"
The ClingView is this overlay you get when you first start your device or a new app which acts as an in context help to guide the user.

It looks like this in its native state:

![cling view](http://i.stack.imgur.com/1FUCi.png)

### usage

```
$('#cling-this').cling({
   title:"My title",
   description:"The <span style="color: red;">html</span> description"
    });
```