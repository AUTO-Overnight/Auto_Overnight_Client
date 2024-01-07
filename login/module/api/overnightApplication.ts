import client from "../../../api/client";

// TODO: Define the type of the response
type OvernightApplicationResponse = any;

export const submitOvernightApplication = async (
  selectedDates: string[],
  cookie: string
): Promise<OvernightApplicationResponse> => {
  const convertDateFormat = (date: string): string => {
    return date.replace(/-/g, "");
  };

  const isWeekend = (date: string): boolean => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 for Sunday, 6 for Saturday
  };

  const dateList = selectedDates.map(convertDateFormat);
  const isWeekendList = selectedDates.map(isWeekend);

  const dataToSend = {
    date_list: dateList,
    is_weekend: isWeekendList.map(Number),
    outStayAplyDt: convertDateFormat(selectedDates[0]),
    cookies: cookie,
  };
  console.log(`API 요청 전 데이터: `, dataToSend);

  try {
    const response = await client.post("/sendstayout", dataToSend);
    console.log(`API 응답: `, response.data);
    return response.data;
  } catch (e) {
    console.error(`API 요청 Error: ${e}`);
    throw e;
  }
};
