<template>
  <div>
    <ArticleList :articles="articles"></ArticleList>
  </div>
</template>

<script>
import ArticleList from '../../base/ArtcelList/ArtcelList'
export default {
  name: "Article",
  data() {
    return {
      articles:[
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
        {
          title:'学习vue',
          time:'2018年11月22日',
          describe:'啦啦啦，不行就别写啦'
        },
      ]
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$get('/api/publishArticles')
      .then(res=>{
        console.log("请求成功")
      })
    }
  },
  components:{
    ArticleList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
