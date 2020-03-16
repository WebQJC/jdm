window.onload = function () {
    /*1.顶部搜索*/
    search();
    /*2.轮播图*/
     banner();
    // /*3.倒计时*/
     downTime();
};

var search = function(){

    var searchbox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
     /*console.log(document.body.scrollTop);
         console.log(document.documentElement.scrollTop);
         console.log(window.pageYOffset);*/
    window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop;
        //console.log(scrollTop);
        var opacity = 0;
        if(scrollTop<height){
            opacity = scrollTop/height*0.85;
        }
        else{
            opacity = 0.85;
        }
        // searchbox.style.opacity = opacity;
        searchbox.style.background = 'rgba(201,21,35,'+opacity+')';
    }
};

var banner = function(){

     /*1. 自动轮播图且无缝   定时器，过渡*/
    /*2. 点要随着图片的轮播改变  根据索引切换*/
    /*3. 滑动效果  利用touch事件完成*/
    /*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
    /*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/
  
    var banner = document.querySelector('.jd_banner');
    // 图片宽度
    var width = banner.offsetWidth;
    // 图片容器
    var imgBox = banner.querySelector('ul:first-child');
    // 点容器
    var spotBox = banner.querySelector('ul:last-child');
    //所以点
    var spots = spotBox.querySelectorAll('li');

    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }


    var index = 1;
    var timer = setInterval(function(){
        index++;
        addTransition();
        setTranslateX(-index * width);

    },1000)
    imgBox.addEventListener('transitionend', function(){
        if(index>=9){  //或用 spots.length+1
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        }
        else if(index<=0){
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();
    });

    /*设置点的方法*/
    var setPoint = function () {
        /*index 1-8*/
        /*清除样式*/
        for (var i = 0; i < spots.length; i++) {
            var obj = spots[i];
            obj.classList.remove('now');
        }
        /*给对应的加上样式*/
        spots[index - 1].classList.add('now');
    };

// 触屏滑动
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart', function(e){
        clearInterval(timer);
        
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function(e){
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -index*width + distanceX; 
        removeTransition();
        setTranslateX(translateX);
        isMove = true;

    });

    imgBox.addEventListener('touchend', function(e){

        if(isMove){   // // 这里的isMove 表上面touchmove滑动过
            if(Math.abs(distanceX) <width/3){
                addTransition();
                setTranslateX(-index*width);
            }else{
                if(distanceX>0){
                    index--;
                }
                else if(distanceX<0){
                    index++;
                }
                addTransition();
                setTranslateX(-index*width);
            }
        }
       
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    });

};
//时间
var  downTime =function(){
    var time = 2*60*60;
    var spans = document.querySelector('.time').querySelectorAll('span');
    var timer = setInterval(function(){
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
         
         if(time<=0){
             clearInterval(timer);
         }
    },1000)
};


