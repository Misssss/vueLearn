new Vue({
	el: '#cyapp',
	data: {
		title: 'hello vue',
		products:[],
		checkAllFlag: true,
	},
	filters: {
		formatMoney:function(value){
			return "￥ "+value.toFixed(2);
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			//保证 this$el已经插入文档
			// vm.cartView();  两种写法都可以
			this.cartView();

		})
	},
	methods: {
		cartView: function(){
			var _this = this;
			this.$http.get('js/cart.json').then(function(res){
				_this.products = res.data.result.list;
			});
		},
		countMoney: function(item,way){
			if (way>0) {
				item.count++;
			}else{
				if (item.count>1) {
					item.count--;
				};
			}
		},
		selectProduct: function(item) {
			// 知识点，如何利用vue设置一个不存在的变量（即json里没有声明的变量）
			if (item.checked == undefined) {
				// Vue.set(item,'checked',true);
				//局部注册checked方法
				this.$set(item,'checked',true);
			} else {
				item.checked = !item.checked;
			}
		},
		checkAll:function(){
			
		}
	}
});
Vue.filter("money",function(value,type){
	return  "￥ "+value.toFixed(2)+type;
})