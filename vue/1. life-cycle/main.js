const p = new Vue({
  el: '#app',
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    btnClick () {
      this.a = 2;
      this.b = 3;
    }
  },
  beforeCreate () { // 
    console.log('beforeCreate');
    // console.log(this.a, this.b, this.btnClick); // undefined, undefined, undefined
    // console.log(this.$methods);
  },
  created () { // ￥
    console.log('created');
    // console.log(this);
    // console.log(this.$data);
    // console.log(this.btnClick);
    // console.log(this.$data);
    // console.log(this.$el); // 挂载阶段未开始不能 使用 $el
  },
  beforeMount () {
    console.log('beforeMount');
    console.log(this.$el);
  },
  mounted () {
    console.log('mounted');
    console.log(this.$el);
  },
  beforeUpdate () {
    console.log('beforeUpdate');
    console.log(this.$el);
  },
  updated () {
    console.log('updated');
    console.log(this.a, this.b);
  },
  beforeDestroy () {
    console.log('beforeDestroy');
  },
  destroyed () {
    console.log('destroyed');
  }
})

console.log(p);

const destoryBtn = document.querySelector('.destory');

destoryBtn.onclick = function () {
  p.$destroy();
}