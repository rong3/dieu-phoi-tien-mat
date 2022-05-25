import { all } from "redux-saga/effects";
import { watchDemoDataTableSaga } from "../saga/demoData.saga"
// import { watchStrategySaga } from "../saga/strategy.saga"
// import { watchWheelInstanceSaga } from "../saga/wheelInstance.saga"
// import { watchThemeInstanceSaga } from "../saga/themeInstance.saga"
// import { watchGroupAllocationSaga } from "./groupAllocation.saga"
// import { watchMasterObjSaga } from "./masterObjectAllocation.saga"
// import { watchGroupChannelPrizeSaga } from "./groupChannelPrize.saga"
import {watchMasterDataSaga} from "./masterData.saga"

export default function* rootSaga() {
    yield all([
        //all listener watches
        watchDemoDataTableSaga(),
        watchMasterDataSaga()
    ]);
}
