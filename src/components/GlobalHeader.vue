<template>
  <!--  栅格布局关闭换行-->
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selectedKeys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.png" />
            <div class="title">图灵 OJ</div>
          </div>
        </a-menu-item>
        <!--      有路由和名称即可渲染到菜单项上（routes.ts）-->
        <a-menu-item v-for="item in visiableRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <!--      <div>{{ store.state.user?.loginUser?.role ?? "notLogin" }}</div>-->
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
const store = useStore();
const router = useRouter();

//展示在菜单的路由数组 返回true 即要保留
//注意，这里使用计算属性，是为了当登录用户信息发生变更时，触发菜单栏的重新染，展示新增权哏的菜单项
const visiableRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//默认 高亮显示(有个下划线) 主页
const selectedKeys = ref(["/"]);
//首先点击菜单项 =>跳转更新路由=>更新路由后，同步去更新菜单栏的高亮状态
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// console.log(store.state.user.loginUser);

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "杰杰",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

//菜单跳转
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title-bar .logo {
  height: 48px;
}

.title-bar .title {
  color: #444;
  font-size: 24px;
  font-weight: 600;
  margin-left: 16px;
}
</style>
