<script lang="ts">
import {defineComponent, ref} from 'vue'
import {ElButton, ElDialog} from 'element-plus'

export default defineComponent({
  components: {
    ElButton,
    ElDialog
  },
  setup() {
    const dialogVisible = ref<boolean>(false)
    const logo="https://hnust-ticknet-swzl.oss-cn-hangzhou.aliyuncs.com/certificate/hnust/Raw2Repo.png"
    const url = ref<string>('')
    const repoURL = ref<string>('')
    const repoName = ref<string>('')
    const starsUrl = ref<string>('')
    const starsList = ref<string[]>([])
    const transformRaw2Repo = (rawURL: string) => {
      // GitHub 格式匹配
      const githubRegex = /^https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/.+/;
      const githubMatch = rawURL.match(githubRegex);

      // Gitee 格式匹配
      const giteeRegex = /^https:\/\/gitee\.com\/([^\/]+)\/([^\/]+)\/raw\/([^\/]+)\/(.+)$/;
      const giteeMatch = rawURL.match(giteeRegex);

      // GitCode 格式匹配
      const gitCodeRegex = /^https:\/\/raw\.gitcode\.com\/([^\/]+)\/([^\/]+)\/raw\/([^\/]+)\/(.+)$/;
      const gitCodeMatch = rawURL.match(gitCodeRegex);

      //Gitlab 格式匹配
      const gitlabRegex = /^https:\/\/gitlab\.com\/([^\/]+)\/([^\/]+)\/-\/raw\/([^\/]+)\/(.+?)(?:\?.*)?$/;
      const gitlabMatch = rawURL.match(gitlabRegex);


      // 根据匹配的结果构建新的 URL
      if (githubMatch) {
        const [, githubUser, githubRepo] = githubMatch;
        repoName.value = `Github`;
        starsUrl.value = `https://api.star-history.com/svg?repos=${githubUser}/${githubRepo}&type=Date`;
        starsList.value = [`https://api.star-history.com/svg?repos=${githubUser}/${githubRepo}&type=Date`];
        return `https://github.com/${githubUser}/${githubRepo}`;
      } else if (giteeMatch) {
        const [, giteeUser, giteeRepo, giteeBranch, giteePath] = giteeMatch;
        repoName.value = `Gitee`;
        starsUrl.value = `https://gitee.com/${giteeUser}/${giteeRepo}/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b`;
        starsList.value = [`https://gitee.com/${giteeUser}/${giteeRepo}/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b`];
        return `https://gitee.com/${giteeUser}/${giteeRepo}/blob/${giteeBranch}/${giteePath}`;
      } else if (gitCodeMatch) {
        repoName.value = `GitCode`;
        const [, gitCodeUser, gitCodeRepo, gitCodeBranch, gitCodePath] = gitCodeMatch;
        return `https://gitcode.com/${gitCodeUser}/${gitCodeRepo}/blob/${gitCodeBranch}/${gitCodePath}`;
      } else if (gitlabMatch) {
        repoName.value = `Gitlab`;
        const [, gitlabUser, gitlabRepo, gitlabBranch, gitlabPath] = gitlabMatch;
        return `https://gitlab.com/${gitlabUser}/${gitlabRepo}/-/blob/${gitlabBranch}/${gitlabPath}`;
      } else {
        // 如果都不匹配，返回原始 URL
        return rawURL;
      }

    }
    const handleOpen = async () => {
      dialogVisible.value = true
      url.value = window.location.href
      repoURL.value = transformRaw2Repo(window.location.href);
    }
    const jump = () => {
      repoURL.value = transformRaw2Repo(window.location.href);
      console.log(repoURL)
      window.location.href = repoURL.value
    }

    const handleClose = () => {
      dialogVisible.value = false
    }
    return {
      repoURL,
      repoName,
      dialogVisible,
      handleClose,
      handleOpen,
      jump,
      logo,
      starUrl: starsUrl,
      starList: starsList
    }
  }
})
</script>

<template>
  <div data-root="true" class="root">
    <el-button type="success" @click="handleOpen">Go</el-button>

    <el-dialog
        v-model="dialogVisible"
        title="Raw2Repo by rick"
        width="30%"
        :before-close="handleClose"
        class="el-dialog"
        style="min-width: 300px"
        center
    >
      <template #header="{titleId}">
          <el-image :src="logo"
                    slot = "logoImg"
                    style="width: 50px; height: 50px"
                    :id="titleId"
          />
          <h2 :id="titleId" >Raw2Repo</h2>
      </template>
      <div>
        <span>是否跳转至{{ repoName }}仓库 -> {{ repoURL }}</span>
      </div>
      <div>
        <el-image :src="starUrl"
                  fit="cover"
                  :preview-src-list="starList"
                  slot = "starsImg"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="jump">GO</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.root {
  position: fixed;
  top: 68px;
  right: 36px;
  z-index: 1000;
}

.el-dialog {
  border-radius: 10px;
}
</style>
