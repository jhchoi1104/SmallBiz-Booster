import { ref, computed } from 'vue';
import axios from 'axios';

export function usePagination(BASEURI) {
  const dataList = ref([]);
  const selectedSigngu = ref('전체');
  const selectedDong = ref('전체');
  const selectedService = ref('전체');
  const searchInput = ref('');
  const filteredDongs = ref([]);

  // 데이터 리스트 가져오는 함수 (경로를 인자로 받음)
  const bringDataList = async (filteredListEndpoint) => {
    try {
      const response = await axios.get(BASEURI + filteredListEndpoint, {
        params: {
          gu: selectedSigngu.value,
          dong: selectedDong.value,
          service: selectedService.value,
          input: searchInput.value,
        },
      });
      if (response.status === 200) {
        dataList.value = response.data;
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (error) {
      console.log('에러 발생: ' + error);
    }
  };

  // '구'에 해당하는 '동' 리스트 호출 함수
  const bringDongList = async () => {
    if (selectedSigngu.value !== '전체') {
      try {
        const response = await axios.get(BASEURI + '/getDong', {
          params: { gu: selectedSigngu.value },
        });
        if (response.status === 200) {
          filteredDongs.value = response.data;
        } else {
          console.log('데이터 조회 실패');
        }
      } catch (error) {
        console.log('에러 발생: ' + error);
      }
    }
  };

  // '구' 필터링 함수
  const onSignguChange = (event, filteredListEndpoint) => {
    selectedSigngu.value = event.target.value;
    bringDataList(filteredListEndpoint);
    bringDongList();
  };

  // '동' 필터링 함수
  const onDongChange = (event, filteredListEndpoint) => {
    selectedDong.value = event.target.value;
    bringDataList(filteredListEndpoint);
  };

  // '서비스업종' 필터링 함수
  const onServiceChange = (event, filteredListEndpoint) => {
    selectedService.value = event.target.value;
    bringDataList(filteredListEndpoint);
  };

  // '검색' 필터링 함수
  const changeInputData = (filteredListEndpoint) => {
    bringDataList(filteredListEndpoint);
  };

  const isSpinning = ref(false);

  // 리셋 버튼 함수 (경로를 인자로 받음)
  const refreshIcon = async (totalEndpoint) => {
    try {
      isSpinning.value = !isSpinning.value;
      const response = await axios.get(BASEURI + totalEndpoint);
      setTimeout(() => {
        isSpinning.value = false;
        selectedSigngu.value = '전체';
        selectedDong.value = '전체';
        selectedService.value = '전체';
        searchInput.value = '';
      }, 500);
      if (response.status === 200) {
        dataList.value = response.data;
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (error) {
      console.log('에러 발생: ' + error);
    }
  };

  // 페이지네이션 관련 변수
  const currentPage = ref(1);
  const itemsPerPage = ref(20);

  const totalItems = computed(() => dataList.value.length);

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return dataList.value.slice(start, start + itemsPerPage.value);
  });

  // 페이지 변경 처리 함수
  const handlePageChange = (page) => {
    currentPage.value = page;
  };

  return {
    dataList,
    selectedSigngu,
    selectedDong,
    selectedService,
    searchInput,
    filteredDongs,
    bringDataList,
    bringDongList,
    onSignguChange,
    onDongChange,
    onServiceChange,
    changeInputData,
    refreshIcon,
    isSpinning,
    currentPage,
    itemsPerPage,
    totalItems,
    paginatedData,
    handlePageChange,
  };
}
