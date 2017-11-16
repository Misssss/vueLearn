new Vue({
	el: '#cyapp',
	data: {
		title: 'hello vue',
		products:[],
		checkAllFlag: false,
		totalPrice: 0,
		delFlag: false,
		targetProduct: '',
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
			};
			this.calcTotalPrice();
		},
		selectProduct: function(item) {
			// 知识点，如何利用vue设置一个不存在的变量（即json里没有声明的变量）
			if (item.checked == undefined) {
				// Vue.set(item,'checked',true);
				//局部注册checked方法
				this.$set(item,'checked',true);
				// console.log(item.checked);
			} else {
				item.checked = !item.checked;
			};

			// 一个个选中后全选，方法一：
			// var k = 0;
			// this.products.forEach(function(item,index){
			// 	if (item.checked) {k++;} 
			// });
			// if (k == this.products.length) {
			// 	this.checkAllFlag = true;
			// } else {
			// 	this.checkAllFlag = false;
			// }

			// 一个个选中后全选，方法二：
			var isAll = this.products.every((item, index) => {
				return item.checked === true;
				console.log(this);
			});
			this.checkAllFlag = isAll ? true : false;

			this.calcTotalPrice();
		},
		checkAll:function(){
			this.checkAllFlag = !this.checkAllFlag;//全选按钮添加/删除check类名
			
			var _this = this;
			this.products.forEach(function(item,index){
				if (item.checked == undefined) { //一上来直接点全选的时候，上面物品还没有注册checked
					_this.$set(item,'checked',true);
				} else {
					item.checked = _this.checkAllFlag;
				}
			});
			this.calcTotalPrice();
		},
		// 计算总金额
		calcTotalPrice: function(){
			var _this = this;
			this.totalPrice = 0;
			this.products.forEach(function(item,index){
				if (item.checked) {
					_this.totalPrice += item.price*item.count;
				};
			});
		},
		delConfirm: function(item){
			this.delFlag = true;
			this.targetProduct = item;
			console.log(this.targetProduct);//获取到了想要删除的这个对象
		},
		delProduct: function() {
			var index = this.products.indexOf(this.targetProduct);
			console.log(index);
			this.products.splice(index,1);
			this.delFlag = false;
			this.calcTotalPrice();
		}
	}
});
Vue.filter("money",function(value,type){
	return  "￥ "+value.toFixed(2)+type;
})