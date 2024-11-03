// import { getRequest, putRequest } from "../../utils/sendRequest";
//
// export const fetchLatestAdvice = async (userToken) => {
//     const res = await getRequest("feed/daily_advices", {}, userToken);
//     if (res.statusCode === 200) {
//         return {
//             text: res.data.text,
//             id: res.data.id,
//             userReaction: res.data.userReaction,
//         };
//     } else {
//         throw new Error('Error fetching daily advice.');
//     }
// };
//
// export const updateLikeOrDislike = async (dailyAdviceId, type, userToken) => {
//     const body = { type };
//     const res = await putRequest(`feed/daily_advices?id=${dailyAdviceId}`, body, userToken);
//     if (res.statusCode === 200) {
//         return true;
//     } else {
//         throw new Error('Error updating reaction.');
//     }
// };
//
// export const getLatestWorkLog = async (userToken) => {
//     const body = {
//         page: 0,
//         size: 1,
//         sortOrder: "desc",
//         fromTime: "2024-04-30T00:00:00",
//         toTime: "2024-04-30T23:59:59",
//     };
//     const res = await getRequest("work_log/latest", body, userToken);
//     if (res.statusCode === 200) {
//         return res.data;
//     } else {
//         throw new Error('Error fetching latest work log.');
//     }
// };