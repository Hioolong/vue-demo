import { ref } from "vue";

export default function usePagination() {
  const pageSize = ref(10);
  const pageNum = ref(1);

  const onPageUpdate = (e: number) => {
    pageNum.value = e;
  }

  const onPageSizeUpdate = (e: number) => {
    pageSize.value = e;
  };

  return {
    pageNum,
    pageSize,
    onPageUpdate,
    onPageSizeUpdate,
  };
}
