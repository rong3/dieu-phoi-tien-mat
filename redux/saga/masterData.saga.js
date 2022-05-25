import { put, takeLatest, select } from "redux-saga/effects";
import { actionTypes, loadMasterDataSuccess, loadRelatedUserSuccess, loadDSNV3KVSuccess } from "../actions/masterDataAction"
import { GetMasterData, GetNguoiLienQuan, GetDSNV3KV } from "../../services/dptm/masterData"

function* loadMasterDataSaga(payload) {
    try {
        const data = yield GetMasterData(payload);
        yield put(loadMasterDataSuccess(data));
    }
    catch (err) {
        console.log({ err });
        yield put(loadMasterDataSuccess([]));
    }
}

function* loadRelatedUserDataSaga(payload) {
    try {
        const data = yield GetNguoiLienQuan(payload);
        yield put(loadRelatedUserSuccess(data));
    }
    catch (err) {
        console.log({ err });
        yield put(loadRelatedUserSuccess([]));
    }
}

function* loadDSNV3KVSaga(payload) {
    try {
        const data = yield GetDSNV3KV(payload);
        yield put(loadDSNV3KVSuccess(data));
    }
    catch (err) {
        console.log({ err });
        yield put(loadDSNV3KVSuccess([]));
    }
}

export function* watchMasterDataSaga() {
    yield takeLatest(actionTypes.LOAD_MASTERDATA, loadMasterDataSaga);
    yield takeLatest(actionTypes.LOAD_RELATEDUSER, loadRelatedUserDataSaga);
    yield takeLatest(actionTypes.LOAD_DSNHANVIEN3KHUVUC, loadDSNV3KVSaga);
}
