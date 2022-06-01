import { put, takeLatest, select } from "redux-saga/effects";
import { actionTypes, loadMasterDataSuccess, loadRelatedUserSuccess, loadDSNV3KVSuccess, loadCaptrenSuccess } from "../actions/masterDataAction"
import { GetMasterData, GetNguoiLienQuan, GetDSNV3KV } from "../../services/dptm/masterData"
import { getCaptrenById } from "../../services/dptm/auth"

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

function* loadCapTrenSaga(payload) {
    try {
        const data = yield getCaptrenById(payload?.payload);
        yield put(loadCaptrenSuccess(data?.data || {
            "maNhanVien": "HD001755",
            "hoTenDemNhanVien": "TRẦN KHÁNH",
            "tenNhanVien": "LINH",
            "email": "linhtk@hdbank.com.vn",
            "tenDonViCap2MoiNhat": "Khối Công nghệ thông tin và Ngân hàng điện tử",
            "maDonViCap6MoiNhat": "",
            "tenDonViCap6MoiNhat": "",
            "tenChucDanhMoiNhat": "Trưởng phòng",
            "maTinhTrangNhanVien": 0,
            "maDonVi": "001",
            "maCapTrenTrucTiep": "HD000775"
        }));
    }
    catch (err) {
        console.log({ err });
        yield put(loadCaptrenSuccess(null));
    }
}

export function* watchMasterDataSaga() {
    yield takeLatest(actionTypes.LOAD_MASTERDATA, loadMasterDataSaga);
    yield takeLatest(actionTypes.LOAD_RELATEDUSER, loadRelatedUserDataSaga);
    yield takeLatest(actionTypes.LOAD_DSNHANVIEN3KHUVUC, loadDSNV3KVSaga);
    yield takeLatest(actionTypes.LOAD_CAPTREN, loadCapTrenSaga);
}
