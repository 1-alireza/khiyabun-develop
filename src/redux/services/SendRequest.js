import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from "../../utils/constant";

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['CallAjax'],
    endpoints: (builder) => ({
        callAjax: builder.mutation({
            query: ({api, body, method, needToken}) => {
                console.log(api);
                console.log(body);
                console.log(method);
                console.log(needToken);
                return ({
                    url: api,
                    method: method,
                    body: body,
                    headers: needToken
                        ? {
                            'Content-Type': 'application/json',
                            'Token': 'your-token-value',
                        }
                        : {
                            'Content-Type': 'application/json',
                        },
                })
            },
        }),
    }),
});

export default api;
