// // @ts-nocheck
// import { GOOGLE_API_KEY } from '$env/static/private';


// export async function POST(request) {
//     const requestBody = request.body;

//     const apiResponse = await fetch('https://addressvalidation.googleapis.com/v1:validateAddress?key=' + GOOGLE_API_KEY, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//     });

//     if (apiResponse.ok) {
//         const data = await apiResponse.json();
//         return {
//             status: 200,
//             body: data,
//         };
//     } else {
//         // Handle errors or unsuccessful responses
//         return {
//             status: apiResponse.status,
//             body: {
//                 error: 'Failed to validate address'
//             }
//         };
//     }
// }