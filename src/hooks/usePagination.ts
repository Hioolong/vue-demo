import { ref } from "vue";
import type { Ref } from 'vue'

export interface PaginationRes {
  pageNum: Ref<number>,
  pageSize: Ref<number>,
  onPageUpdate: (e: number) => void,
  onPageSizeUpdate: (e: number) => void
}

export default function usePagination(defaultNum:number = 1, defaultSize:number = 10,): PaginationRes {
  const pageSize = ref(defaultSize);
  const pageNum = ref(defaultNum);

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
