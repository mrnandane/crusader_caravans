// import { call, put } from 'redux-saga/effects';
// import { fetchIndexesHeatmapDataAPI } from './HomePage_Service';
// import { receivedIndexesHeatmapDataAction, requestIndexesHeatmapDataFailed } from './HomePage_Action';

// export function* fetchIndexesHeatmapDataSaga(action) {
//   try {
//     const indexHeatmapData = yield call(fetchIndexesHeatmapDataAPI, action.id);
//     yield put(receivedIndexesHeatmapDataAction(indexHeatmapData));
//   } catch (err) {
//     yield put(requestIndexesHeatmapDataFailed({ error: 'failed to fetch indexes Heatmap data' }));
//   }
// }
