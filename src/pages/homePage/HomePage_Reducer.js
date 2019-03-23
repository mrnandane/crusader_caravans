// import { REQUEST_INDEXES_HEATMAP_DATA, RECEIVED_INDEXES_HEATMAP_DATA, FAILED_TO_REQUEST_INDEXES_HEATMAP_DATA } from './HomePage_Action';

// const initialState = {
//   isFetching: false,
//   error: '',
//   data: ''
// };

// export function indexesHeatmapReducer(state = initialState, action) {
//   switch (action.type) {
//     case REQUEST_INDEXES_HEATMAP_DATA:
//       return { ...state, isFetching: true };
//     case RECEIVED_INDEXES_HEATMAP_DATA:
//       return {
//         ...state,
//         data: action.data,
//         isFetching: false
//       };
//     case FAILED_TO_REQUEST_INDEXES_HEATMAP_DATA:
//       return { ...state, isFetching: false, error: action.err };
//     default:
//       return state;
//   }
// }
