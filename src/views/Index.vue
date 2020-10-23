<template>
  <div v-title data-title="ForFun Find Yourself">
    <el-container>

      <!--            <el-main class="me-articles">-->
      <!--              <article-scroll-page></article-scroll-page>-->
      <!--            </el-main>-->
      <el-main class="me-articles">
        <div v-infinite-scroll="loadMore" class="infinite-list" style="overflow:auto">
          <el-card v-for="(item,index) in articles" class="me-area" :key="index" :body-style="{ padding: '16px' }">
            <div class="me-article-header">
              <a class="me-article-title" @click="">{{ item.articleTitle }}</a>
<!--              <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>-->
              <span class="me-pull-right me-article-count">
                <i class="me-icon-comment" />&nbsp;{{ item.watchCount }}
              </span>
              <span class="me-pull-right me-article-count">
                <i class="el-icon-view" />&nbsp;{{ item.watchCount }}
              </span>
            </div>
            <div class="me-artile-description">
              {{ articleSummary }}
            </div>

            <div class="me-article-footer">
              <span class="me-article-author">
                <i class="me-icon-author" />&nbsp;{{ item.articleTitle }}
              </span>

              <el-tag v-for="t in item.articleLabels" :key="t" size="mini" type="success">{{ t }}</el-tag>

              <span class="me-pull-right me-article-count">
                <i class="el-icon-time" />&nbsp;{{ item.createTime }}
              </span>
            </div>
          </el-card>
        </div>
      </el-main>

      <el-aside>
        <card-tag :tags="hotTags" />
        <card-article card-header="最热文章" :articles="hotArticles" />
        <card-archive card-header="文章归档" :archives="archives" />
        <card-article card-header="最新文章" :articles="newArticles" />
      </el-aside>

    </el-container>
  </div>
</template>

<script>
import CardArticle from '@/components/card/CardArticle'
import CardTag from '@/components/card/CardTag'
import CardArchive from '@/components/card/CardArchive'

import { getArticles, getHotArticles, getNewArticles, listArchives } from '@/api/article'
import { getHotTags } from '@/api/tag'

export default {
  name: 'Index',
  components: {
    'card-article': CardArticle,
    'card-tag': CardTag,
    CardArchive
  },
  data() {
    return {
      hotTags: [],
      articles: [],
      hotArticles: [],
      newArticles: [],
      archives: [],

      searchOpt: {},
      queryObj: {}
    }
  },
  computed: {
    listQuery() {
      const value = this.$store.getters.listQuery
      return JSON.parse(JSON.stringify(value))
    }
  },
  created() {
    this.getArticles()
    // this.getHotArticles()
    // this.getNewArticles()
    // this.getHotTags()
    // this.listArchives()
  },
  methods: {
    loadMore() {
      this.listQuery.pageSize += 5
      this.getArticles()
    },
    getArticles() {
      Object.assign(this.queryObj, this.listQuery, this.searchOpt)
      getArticles(this.queryObj).then(res => {
        this.articles = res.data.records
        console.log(this.articles)
      })
    },
    getHotArticles() {
      const that = this
      getHotArticles().then(data => {
        that.hotArticles = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '最热文章加载失败!', showClose: true })
        }
      })
    },
    getNewArticles() {
      const that = this
      getNewArticles().then(data => {
        that.newArticles = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '最新文章加载失败!', showClose: true })
        }
      })
    },
    getHotTags() {
      const that = this
      getHotTags().then(data => {
        that.hotTags = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '最热标签加载失败!', showClose: true })
        }
      })
    },
    listArchives() {
      listArchives().then(data => {
        this.archives = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '文章归档加载失败!', showClose: true })
        }
      })
    }
  }
}
</script>

<style scoped>

.el-container {
  width: 960px;
}

.el-aside {
  margin-left: 20px;
  width: 260px;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}

.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 6px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 8px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
</style>
