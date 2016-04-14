## 关于
饿了么笔试题第二条，实现轮播图。  
[试题链接](https://github.com/elemefe/hire)

## 快速上手
```html
<div class="slider">
    <ul id="slider-img">
        <li><img src="img1.png" alt="image"></li>
        <li><img src="img2.png" alt="image"></li>
        <li><img src="img3.png" alt="image"></li>
    </ul>
    <div id="slider-nav">
        <ol>
            <li class="active">1</li>
            <li>2</li>
            <li>3</li>
        </ol>
    </div>
</div>
<script src="eleme-slider.js"></script>
<script>
    var sliderEl = document.getElementsByClassName("slider")[0];
    var sliderOpts = {
        intervalTime: 3000
    };

    var slider = new ElemeSlider(sliderEl, sliderOpts);
    slider.init();
</script>
```

## API
目标DOM节点中应该有一个`id`为`slider-img`的`ul`，里面放上各种图片，
一个`id`为`slider-img`的`ol`，其中的`li`数量与上面的图片数量一致，且内容为123……从1开始依次加一。  

引入了js文件后，获取到要轮播的那块DOM节点，并创建`sliderOpts`，其`intervalTime`中值为轮播间隔时间，单位为ms。  
将这两个传入`ElemeSlider`并使用new构造出一个实例，执行实例的`init`方法即可。  
如果不传入`sliderOpts`的`intervalTime`参数，则默认间隔时间为5S。  

当然这还得配个CSS，CSS样式自己去饿了么那个题目的页面上扒下来吧。

## 其他
随手写着玩的，压缩什么的懒得搞了。
