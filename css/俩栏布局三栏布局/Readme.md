# 俩栏布局

1. left, right使用position: absolute; z-index设置层级。

2. left ->  position: absolute; left: 0; top: 0;
   right -> padding--left + box-sizing: border-box;

## 三栏布局

1. 圣杯布局

  container -> margin: 0 200px 0 150px;
  middle, left, right -> position: relative
  
  middle -> width: 100%;
  left -> left: -leftWidth; margin-left: -100%;
  right -> left: -leftWidth; margin-left: -leftWidth;
  
2. 双飞翼布局

```
  <div class="container">
    <div class="column middle">
      <div class="main"></div>
    </div>
    <div class="column left"></div>
    <div class="column right"></div>
  </div>
```
  container -> 
    middle
      main -> margin: 0 200px 0 150px;
    left -> margin-left: -100%; 
    right -> margin-left: -200px;