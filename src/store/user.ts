// initial state 存储的状态信息 比如用户信息
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  //执行异步操作，并且触发 mutation 的更改（actions 调用 mutation）
  actions: {
    async getLoginUser({ commit, state }, payload) {
      //从远程请求获取登录信息 获取当前用户登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  //定义了对变量进行增删改（更新）的方法
  mutations: {
    //外层传递参数 改变状态
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
