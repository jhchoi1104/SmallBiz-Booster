import axios from 'axios';

const id = '1234';

// 혼합 차트 데이터
export let mixed_data = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'], // 라벨 설정
  datasets: [
    {
      type: 'bar',
      label: '일주일 전 판매량',
      data: [],
      borderColor: 'rgb(255, 9, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      type: 'bar', // 첫 번째 라인 데이터셋
      label: '금일 판매량',
      data: [],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1, // 선의 곡률 조정
    },
  ],
};

// 혼합 차트 옵션
export const mixed_options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export let mixed_data2 = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'], // 라벨 설정
  datasets: [
    {
      type: 'bar',
      label: '일주일 전 판매량',
      data: [],
      borderColor: 'rgb(255, 9, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      type: 'bar', // 첫 번째 라인 데이터셋
      label: '금일 판매량',
      data: [],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1, // 선의 곡률 조정
    },
  ],
};

// 혼합 차트 옵션
export const mixed_options2 = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// 데이터 가져오는 함수
export async function fetchChartData(loanRepaymentStatus) {
  const response = await axios.get(`/api/kmap/member/${id}`);
  const dongname = response.data.dongname;

  const doughnut = await axios.get(`/api/chart/doughnut`);

  const sortedData = doughnut.data.sort((a, b) => b.amount - a.amount);

  mixed_data2.labels = sortedData.map((item) => `${item.categoryName}`);
  mixed_data2.datasets[0].data = sortedData.map((item) => item.amount);
  mixed_data2.datasets[1].data = sortedData.map((item) => item.amount);

  loanRepaymentStatus.value = sortedData
    .reduce((acc, item) => acc + item.amount, 0)
    .toLocaleString();

  const mixchart = await axios.get(`/api/chart/mixchart`);

  const firstData = [];
  const secondData = [];

  const categorizedData = mixchart.data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    if (acc[item.category].length === 0) {
      acc[item.category].push(item);
      firstData.push(item); // 첫 번째 데이터를 firstData에 추가
    } else if (acc[item.category].length === 1) {
      acc[item.category].push(item);
      secondData.push(item); // 두 번째 데이터를 secondData에 추가
    }
    return acc;
  }, {});

  const firstAndSecondData = Object.values(categorizedData).flat();

  mixed_data.labels = firstData.map((item) => item.categoryName);

  mixed_data.datasets[0].data = firstData.map((item) => item.amount);
  mixed_data.datasets[1].data = secondData.map((item) => item.amount);
}