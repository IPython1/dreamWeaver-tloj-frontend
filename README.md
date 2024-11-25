# tloj-frontend


## 根据后台生成代码
```shell
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
public class Main {

    public static void main(String[] args) {
        int a=Integer.parseInt(args[0]);
        int b=Integer.parseInt(args[1]);
        System.out.println(a+b);
    }

}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Q
{
path: "/",
name: "home",
component: HomeView,
},
{
path: "/about",
name: "about",
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () =>
import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
},
### R
直接引用组件：
在第一个示例中，HomeView 组件被直接引用。
这种方式会在应用启动时立即加载 HomeView 组件。
适用于较小的组件或经常访问的页面。
懒加载组件：
在第二个示例中，AboutView 组件通过动态导入 (import()) 实现懒加载。
动态导入会将 AboutView 组件的代码分割成一个单独的文件（例如 about.[hash].js）。
当用户访问 /about 路由时，才会异步加载并执行这个文件。
适用于较大的组件或不经常访问的页面，可以减少初始加载时间，提高应用性能。

Q：为什么将routes从router中抽象出来
R：目标:根据路由配置信息，自动生成菜单内容。实现更通用、更自动的菜单配置

Q：全局状态管理 vuex
R：所有页面全局共享的变量，而不是局限在某一个页面中
适合作为全局状态的数据:已登录用户信息(每个页面几乎都要用)

全局权限管理（通过路由拦截器实现）
目标：能够直接以一套通用的机制，去定义哪个页面需要那些权限
而不用每个页面独立去判断权限，提高效率
思路：
在路由配置文件， 定义某个路由的访问权限
在全局页面组件 app.vue 中，绑定一个全局路由监听
每次访问页面时，根据用户要访问页面的路由信息，先判断用户是否有对应的访问权限
如果有，跳转到原页面；如果没有，拦截或跳转到 401 鉴权或登录页

npm i @bytemd/plugin-highlight @bytemd/plugin-gfm
npm install monaco-editor
npm install monaco-editor-webpack-plugin

{
    "answer": "暴力破解",
    "content": "题目内容",
    "judgeCase": [
        {
            "input": "1 2",
            "output": "3 4"
        }
    ],
    "judgeConfig": {
        "memoryLimit": 1000,
        "stackLimit": 1000,
        "timeLimit": 1000
    },
    "tags": [
        "队列","简单"
    ],
    "title": "A+C"
}

Q：
分析
结构对比：
第一个示例中，每个 a-form-item 包含两个子 a-form-item，分别用于输入和输出用例。
第二个示例中，每个 a-form-item 只包含一个 a-input 和一个删除按钮。
功能对比：
第一个示例中，每个测试用例包含输入和输出两个字段。
第二个示例中，每个 post 只包含一个输入字段，并且有一个删除按钮。
最终结果：
如果你只需要输入和输出两个字段，并且不需要删除按钮，那么第一个示例更符合你的需求。
如果你需要每个项目都有一个删除按钮，并且每个项目只有一个输入字段，那么第二个示例更合适。
结论
相同点：
两个示例都使用了 v-for 循环来渲染多个表单项。
都使用了 v-model 来绑定输入值。
不同点：
第一个示例中每个表单项包含两个子表单项，分别用于输入和输出。
第二个示例中每个表单项包含一个输入框和一个删除按钮。
建议
如果你只需要输入和输出两个字段，并且不需要删除按钮，那么第一个示例已经满足你的需求。
如果你需要每个项目都有一个删除按钮，并且每个项目只有一个输入字段，那么可以参考第二个示例进行修改

1. await 关键字
   await 是 JavaScript 中用于等待 Promise 解析的关键字。
   它只能在 async 函数内部使用。
   await 会使异步操作暂停，直到 Promise 被解析或拒绝，然后继续执行后续代码。
2. QuestionSubmitControllerService.doQuestionSubmitUsingPost
   QuestionSubmitControllerService.doQuestionSubmitUsingPost 是一个异步函数，通常返回一个 Promise。
   这个函数可能是一个 HTTP 请求，用于提交问题数据到服务器

