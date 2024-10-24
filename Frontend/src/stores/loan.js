import { ref, computed } from 'vue';
import axios from 'axios';

export function useLoan(BASEURI) {
  const selectedBank = ref('전체');
  const selectedType = ref('전체');
  const selectedRepay = ref('전체');
  const searchInput = ref('');
  const dataList = ref([]);
  const best4List = ref([]);

  const currentPage = ref(1);
  const itemsPerPage = 6;
  const totalItems = ref(0);
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

  // 데이터 리스트 가져오는 함수
  const bringLoanList = async (url) => {
    try {
      const response = await axios.get(`${BASEURI}${url}`, {
        params: {
          companyName: selectedBank.value,
          input: searchInput.value,
          type: selectedType.value,
        },
      });
      if (response.status === 200) {
        dataList.value = response.data;
        totalItems.value = dataList.value.length;
        console.log(dataList.value);
        console.log(response.data);
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (error) {
      console.log('에러발생 :' + error);
    }
  };

  // Best 4 리스트 가져오는 함수
  const bringBest4List = async (url) => {
    try {
      const response = await axios.get(`${BASEURI}${url}`);
      if (response.status === 200) {
        best4List.value = response.data;
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (error) {
      console.log('에러발생 :' + error);
    }
  };

  // 새로고침
  const refreshIcon = async (url) => {
    await bringLoanList(url);
    selectedBank.value = '전체';
    selectedType.value = '전체';
    searchInput.value = '';
  };

  // 현재 페이지에 해당하는 데이터만 반환하는 계산된 속성
  const paginatedDataList = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataList.value.slice(startIndex, endIndex);
  });

  // 페이지 전환 함수
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  // 날짜 형식 변환
  const formatDate = (date) => {
    const dateString = String(date);
    if (dateString.length !== 8) {
      return dateString;
    }

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${year.substring(2)}/${month}/${day}`;
  };

  // dclsEndDay가 null일 경우를 처리하는 함수
  const formatEndDate = (date) => {
    return date === null ? '' : formatDate(date);
  };

  const handlePageChange = (page) => {
    currentPage.value = page;
  };

  return {
    selectedBank,
    selectedType,
    searchInput,
    selectedRepay,
    dataList,
    best4List,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    paginatedDataList,
    bringLoanList,
    bringBest4List,
    refreshIcon,
    changePage,
    formatDate,
    formatEndDate,
    handlePageChange,
  };
}
