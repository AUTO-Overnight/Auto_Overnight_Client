import client from "../../../api/client";
import { useUserStore } from "../../../store/login";

// TODO: Define the type of the response
type OvernightApplicationResponse = any;

export const submitOvernightApplication = async (
  selectedDates: string[]
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
  const cookies = useUserStore.getState().cookies;

  const dataToSend = {
    date_list: dateList,
    is_weekend: isWeekendList.map(Number),
    outStayApply: convertDateFormat(selectedDates[0]),
    cookies,
  };

  console.log({ 외박신청: dataToSend });
  return client.post("/sendstayout", dataToSend);
};
