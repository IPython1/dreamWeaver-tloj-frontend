<template>
  <div id="QuestionsView">
    <!--    表单查询内容-->
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 280px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 280px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <!--    分割线-->
    <a-divider size="0" />
    <!--    表格展示内容-->
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
      <!--      通过插槽能拿到这条数据的信息 模板字符串的写法-->
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)">
            做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const router = useRouter();
const route = useRoute();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取失败," + res.message);
  }
};
/*
 *页面加载时请求数据
 * */

onMounted(() => {
  loadData();
});
const onContextMenu = () => {
  console.log("right click");
};
// "id": "1",
//   "title": "A+B",
//   "content": "题目内容",
//   "tags": "[\"栈\",\"简单\"]",
//   "answer": "暴力破解",
//   "submitNum": 0,
//   "acceptedNum": 0,
//   "judgeCase": null,
//   "judgeConfig": null,
//   "thumbNum": 0,
//   "favourNum": 0,
//   "userId": "1851904216203571201",
//   "createTime": "2024-11-01T04:08:11.000+00:00",
//   "updateTime": "2024-11-01T04:08:11.000+00:00",
//   "isDelete": 0
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
/*
 * 确认搜索 重新加载数据
 * */
const doSubmit = () => {
  //这里需要重置页号 loadData已经被监听了 不需要再写loadData了
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
const doDelete = async (record: any) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    //todo 更新数据
    loadData();
  } else {
    message.error("删除失败," + res.message);
  }
};
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
/*
 * 跳转到做题页面
 * */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
/*
 * 监听 searchParams 变量 改变时触发页面的重新加载
 * */
watchEffect(() => {
  loadData();
});
// 页号  每页展示多少条信息
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>

<style scoped>
#QuestionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
