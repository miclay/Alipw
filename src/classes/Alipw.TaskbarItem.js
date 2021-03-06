/**
 * @constructor Alipw.TaskbarItem
 * @extends Alipw.BorderContainer
 * @author zhangwen.cao[zhangwen.cao@aliyun-inc.com]
 * @description 任务条中的项目。
 * @example
 */

Alipw.TaskbarItem = Alipw.extend(Alipw.BorderContainer,
/** @lends Alipw.TaskbarItem.prototype */
{
	win:null,
	width:120,
	height:24,
	text:'',
	iconCls:'',
	baseCls:'alipw-taskbaritem',
	activedCls:'alipw-taskbaritem-actived',
	actived:false,
	commitProperties:function(){
		Alipw.TaskbarItem.superclass.commitProperties.apply(this,arguments);
	},
	initialize:function(){
		Alipw.TaskbarItem.superclass.initialize.apply(this,arguments);
	},
	createDom:function(){
		Alipw.TaskbarItem.superclass.createDom.apply(this,arguments);
		this.getBody().append(new Alipw.Template(
			[
			 '<span class="{$baseCls}-text"></span>'
			]
		).set({'baseCls':this.baseCls}).compile());
		
		this.addEventListener('click',function(){
			this.fireEvent('itemclick');
		},this,true);
	},
	renderComplete:function(){
		Alipw.TaskbarItem.superclass.renderComplete.apply(this,arguments);
		this.setText(this.text);
	},
	//protected
	_doLayout:function(){
		Alipw.TaskbarItem.superclass._doLayout.apply(this,arguments);
	},
	setText:function(text){
		this.el.attr('title',this.text);
		this.el.find('.' + this.baseCls + '-text').text(this.text);
	},
	activate:function(){
		this.actived = true;
		this.el.addClass(this.activedCls);
	},
	deactivate:function(){
		this.actived = false;
		this.el.removeClass(this.activedCls);
	}
});