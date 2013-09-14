Alipw.DatePicker=Alipw.extend(Alipw.BorderContainer,{applyTo:null,width:260,baseCls:"alipw-datepicker",autoRender:false,floating:true,showShadow:true,date:null,selectedDate:null,maxDate:null,minDate:null,yearText:"年",monthText:"月",weekText:["日","一","二","三","四","五","六"],format:"YYYY-MM-DD",constructor:function(){Alipw.DatePicker.superclass.constructor.apply(this,arguments)},commitProperties:function(){Alipw.DatePicker.superclass.commitProperties.apply(this,arguments);if(!this.date){this.date=new Date()}if(this.applyTo){this._applyToEl=Alipw.convertEl(this.applyTo);var b=this._applyToEl.val();if(b){var a=Alipw.utils.Date.parse(b,this.format);if(a&&a!="Invalid Date"&&!isNaN(a)){this.date=a}}}},initialize:function(){Alipw.DatePicker.superclass.initialize.apply(this,arguments)},createDom:function(){Alipw.DatePicker.superclass.createDom.apply(this,arguments);this.getBody().append(new Alipw.Template(['<div class="{$baseCls}-body-wrap">','<div class="{$baseCls}-navbar">','<span class="{$baseCls}-navbar-info"></span>','<a href="#" class="{$baseCls}-navbar-btn-prevyear"></a>','<a href="#" class="{$baseCls}-navbar-btn-prevmonth"></a>','<a href="#" class="{$baseCls}-navbar-btn-nextyear"></a>','<a href="#" class="{$baseCls}-navbar-btn-nextmonth"></a>',"</div>",'<div class="{$baseCls}-calendar">',"<table>","<thead>","</thead>","<tbody>","</tbody>","</table>","</div>","</div>"]).set({baseCls:this.baseCls}).compile());if(this._applyToEl){this._applyToEl.bind("focus",jQuery.proxy(this.applyToElement_DatePicker,this));var a=Alipw.createFuncProxy(this.documentClickHandler_DatePicker,this);jQuery(document).bind("click",a);this.addEventListener("destroy",function(b){jQuery(document).unbind("click",a)},this);this.addEventListener("select",function(c){var b=c.currentTarget.selectedDate;this._applyToEl.val(Alipw.utils.Date.format(b,this.format));this.hide()},this)}},renderComplete:function(){this.setNavigationInfo(this.date.getFullYear()+" "+this.yearText+" "+(this.date.getMonth()+1)+" "+this.monthText);this.renderCalendarHeader();this.renderCells(this.date.getFullYear(),this.date.getMonth()+1);Alipw.DatePicker.superclass.renderComplete.apply(this,arguments);this.el.find("."+this.baseCls+"-navbar-btn-prevyear").click(jQuery.proxy(function(c){c.preventDefault();var b=[this.date.getFullYear(),this.date.getMonth()+1];var a=[b[0]-1,b[1]];this.setDate(new Date(a[0],a[1]-1));this.updateNavigationInfo()},this));this.el.find("."+this.baseCls+"-navbar-btn-prevmonth").click(jQuery.proxy(function(c){c.preventDefault();var b=[this.date.getFullYear(),this.date.getMonth()+1];var a=b[1]==1?[b[0]-1,12]:[b[0],b[1]-1];this.setDate(new Date(a[0],a[1]-1));this.updateNavigationInfo()},this));this.el.find("."+this.baseCls+"-navbar-btn-nextyear").click(jQuery.proxy(function(c){c.preventDefault();var b=[this.date.getFullYear(),this.date.getMonth()+1];var a=[b[0]+1,b[1]];this.setDate(new Date(a[0],a[1]-1));this.updateNavigationInfo()},this));this.el.find("."+this.baseCls+"-navbar-btn-nextmonth").click(jQuery.proxy(function(c){c.preventDefault();var b=[this.date.getFullYear(),this.date.getMonth()+1];var a=b[1]==12?[b[0]+1,1]:[b[0],b[1]+1];this.setDate(new Date(a[0],a[1]-1));this.updateNavigationInfo()},this));this.el.find("."+this.baseCls+"-calendar table").click(jQuery.proxy(function(b){b.preventDefault();if(b.target.nodeName=="TD"){var a=b.target.getAttribute("cellIndex");if(b.target.getAttribute("celldisabled")=="true"){return}this.selectedDate=new Date(this._calendarData[a].year,this._calendarData[a].month-1,this._calendarData[a].day);this.fireEvent("select",{},false)}},this));this.el.find("."+this.baseCls+"-calendar table").mouseover(jQuery.proxy(function(a){if(a.target.nodeName=="TD"&&jQuery(a.target).attr("celldisabled")!="true"){jQuery(a.target).addClass(this.baseCls+"-cell-over")}},this));this.el.find("."+this.baseCls+"-calendar table").mouseout(jQuery.proxy(function(a){if(a.target.nodeName=="TD"&&jQuery(a.target).attr("celldisabled")!="true"){jQuery(a.target).removeClass(this.baseCls+"-cell-over")}},this))},setNavigationInfo:function(a){this.el.find("."+this.baseCls+"-navbar-info").text(a)},updateNavigationInfo:function(){this.setNavigationInfo(this.date.getFullYear()+" "+this.yearText+" "+(this.date.getMonth()+1)+" "+this.monthText)},renderCalendarHeader:function(){var b="";b+="<tr>";for(var a=0;a<7;a++){b+="<th>"+this.weekText[a]+"</th>"}b+="</tr>";this.el.find("."+this.baseCls+"-calendar table thead").empty().append(b)},renderCells:function(f,h){if(!f){f=this.date.getFullYear()}if(!h){h=this.date.getMonth()+1}var e="";e+="<tr>";var c=this.getDays_DatePicker(f,h);this._calendarData=c;var g;var b=new Date();todayYear=b.getFullYear();todayMonth=b.getMonth()+1;todayDay=b.getDate();for(var d=0,a=c.length;d<a;d++){if(d!=0&&d%7==0){e+="</tr><tr>"}if(c[d].isLastMonth){g=this.baseCls+"-lastmonth"}else{if(c[d].isNextMonth){g=this.baseCls+"-nextmonth"}else{if(c[d].year==todayYear&&c[d].month==todayMonth&&c[d].day==todayDay){g=this.baseCls+"-today"}else{g=""}}}if(c[d].disabled){g+=" "+this.baseCls+"-cell-disabled"}e+='<td class="'+g+'" cellIndex="'+d+'" celldisabled="'+c[d].disabled.toString()+'">'+c[d].day.toString()+"</td>"}e+="</tr>";this.el.find("."+this.baseCls+"-calendar table tbody").empty().append(e)},setDate:function(a){this.date=a;this.renderCells(this.date.getFullYear(),this.date.getMonth()+1)},setMinDate:function(a){this.minDate=a;this.renderCells()},setMaxDate:function(a){this.maxDate=a;this.renderCells()},getDays_DatePicker:function(j,h){var o=new Array();var m=function(p,r){var i=(p%100==0?res=(p%400==0?1:0):res=(p%4==0?1:0));var q=new Array(31,28+i,31,30,31,30,31,31,30,31,30,31);return q[r-1]};var f=(new Date(j,h-1)).getDay();var g=h==1?12:(h-1);var n=h==1?j-1:j;var k=f==0?7:f;var b;if(k>0){if(h==1){b=m(j-1,g)}else{b=m(j,g)}for(var c=b-k+1,e=b;c<=e;c++){o.push({year:n,month:g,day:c,isLastMonth:true,disabled:this.isDateDisabled_DatePicker(new Date(n+"/"+g+"/"+c))})}}for(var c=1,e=m(j,h);c<=e;c++){o.push({year:j,month:h,day:c,disabled:this.isDateDisabled_DatePicker(new Date(j+"/"+h+"/"+c))})}var l=42-o.length;var d=h==12?1:(h+1);var a=h==12?j+1:j;for(var c=1;c<=l;c++){o.push({year:a,month:d,day:c,isNextMonth:true,disabled:this.isDateDisabled_DatePicker(new Date(a+"/"+d+"/"+c))})}return o},isDateDisabled_DatePicker:function(a){if(this.minDate&&a&&a<this.minDate){return true}if(this.maxDate&&a&&a>this.maxDate){return true}return false},applyToElement_DatePicker:function(i){var c=jQuery(i.currentTarget);this.show();Alipw.ComponentManager.bringToFront(this);var b=jQuery(window).height();var f=c.offset();var a=this.el.outerHeight();var d=[c.innerWidth(),c.innerHeight()];var h=f.left;var g;if(b-(f.top-jQuery(document).scrollTop())>=a){g=f.top+d[1]}else{g=f.top-a}this.setPosition(h,g)},documentClickHandler_DatePicker:function(a){if(Alipw.isInNode(a.target,this._applyToEl[0])||a.target==this._applyToEl[0]||Alipw.isInNode(a.target,this.el[0])||a.target==this.el[0]){return}this.hide()}});