export const actionTypes = {
    LOAD_MASTERDATA: "LOAD_MASTERDATA",
    LOAD_MASTERDATA_SUCCESS: "LOAD_MASTERDATA_SUCCESS",
    LOAD_RELATEDUSER:"LOAD_RELATEDUSER",
    LOAD_RELATEDUSER_SUCCESS:"LOAD_RELATEDUSER_SUCCESS",
    LOAD_DSNHANVIEN3KHUVUC:"LOAD_DSNHANVIEN3KHUVUC",
    LOAD_DSNHANVIEN3KHUVUC_SUCCESS:"LOAD_DSNHANVIEN3KHUVUC_SUCCESS",
    LOAD_CAPTREN:"LOAD_CAPTREN",
    LOAD_CAPTREN_SUCCESS:"LOAD_CAPTREN_SUCCESS",
};


export function loadMasterData(payload) {
    return {
        type: actionTypes.LOAD_MASTERDATA,
        payload
    };
}


export function loadMasterDataSuccess(data) {
    return {
        type: actionTypes.LOAD_MASTERDATA_SUCCESS,
        payload: data
    };
}


export function loadRelatedUser(payload) {
    return {
        type: actionTypes.LOAD_RELATEDUSER,
        payload
    };
}


export function loadRelatedUserSuccess(data) {
    return {
        type: actionTypes.LOAD_RELATEDUSER_SUCCESS,
        payload: data
    };
}

export function loadDSNV3KV(payload) {
    return {
        type: actionTypes.LOAD_DSNHANVIEN3KHUVUC,
        payload
    };
}


export function loadDSNV3KVSuccess(data) {
    return {
        type: actionTypes.LOAD_DSNHANVIEN3KHUVUC_SUCCESS,
        payload: data
    };
}

export function loadCaptren(payload) {
    return {
        type: actionTypes.LOAD_CAPTREN,
        payload
    };
}


export function loadCaptrenSuccess(data) {
    return {
        type: actionTypes.LOAD_CAPTREN_SUCCESS,
        payload: data
    };
}