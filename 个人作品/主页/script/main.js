/** 图片滚动栏 **/
$(function(){
	var $imgrolls = $("#Imageroll div a");
	$imgrolls.css("opacity","0.7");
    var len  = $imgrolls.length;
	var index = 0;
	var adTimer = null;
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);
		showImg(index);
	}).eq(0).mouseover();	
	//滑入 停止动画，滑出开始动画.
	$('#Imageroll').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			} , 3000);
	}).trigger("mouseleave");
});
//显示不同的幻灯片
function showImg(index){
	var $rollobj = $("#Imageroll");
	var $rolllist = $rollobj.find("div a");
	var newhref = $rolllist.eq(index).attr("href");
	$("#imgWrap").attr("href",newhref)
			 .find("img").eq(index).stop(true,true).fadeIn().siblings().fadeOut();
	$rolllist.removeClass("chos").css("opacity","0.7")
			 .eq(index).addClass("chos").css("opacity","1"); 
}

/*显示日历*/
$(
function(){
	//加载jqui.js
	var script = document.createElement("script");
	script.id = 'jqui';
	var $calendar = null;
	var updateData = null;
	
	function getUpdateData(){
		//获取JSON数据
		$.getJSON("data/update.json", function(json){
			updateData = json;
			check();
		});
	}
	
	/*根据博文更新情况画圈*/
	function check(){
		//获取正在显示的年，月
		var $yearSpan = $calendar.find('.ui-datepicker-year');
		var year = parseInt($yearSpan.text(), 10);
		var month = parseInt($yearSpan.next().text(), 10);
		var dayData = null;
		for(var i = 0;i < updateData.length;i++){
			if(updateData[i].year === year && updateData[i].month === month){
				dayData = updateData[i].day;
			}
		}
		//画圈
		if(dayData !== null){
			var day, $day;
			$calendar.find('td a').each(function(){
				$day = $(this);
				day = parseInt($day.text(), 10);
				if(dayData[day - 1] === 1){
					$day.addClass('signin');
				}
			});
		}
		//添加事件处理器（因为日历每次刷新都是重新生成，所以每次都要重新绑定）
		$calendar.find('#c_prev').on('click', check);
		$calendar.find('#c_next').on('click', check);
	}

	function loadCalendar(){
		$calendar = $("#datepicker");
		$calendar.datepicker({
	  		inline: true
		});
		//获取更新数据
		getUpdateData();
	}
	
	if('onload' in script){
	  script.onload = function(){
        loadCalendar();
      }
    }
    else{
      script.onreadystatechange = function(){
        if(this.readyState === 'loaded' || this.readyState === 'complete'){
		  loadCalendar();
		  //解绑事件处理器
		  this.onreadystatechange = null;
        }
        else{
          //do nothing 
        }
      }
    }
	
	script.async = 'async';
    script.src = 'script/jquery-ui.js';
    document.body.appendChild(script);
});