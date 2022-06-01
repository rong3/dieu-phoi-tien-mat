import { request } from '../../shared/packages/service-adapter/axios';

export const GetYCTiepNopQuy = (type) => {
    return request(
        'GET',
        `YCTiepNopQuy/GetYCTiepNopQuy?type=${type}`,
        'vi',
    );
}

export const GetYCTiepNopQuyById = (id) => {
    return request(
        'GET',
        `YCTiepNopQuy/GetYCTiepNopQuy/${id}`,
        'vi',
    );
}


export const TaoMoiYCTiepNopQuy = (data) => {
    return request(
        'POST',
        `YCTiepNopQuy/PostYCTiepNopQuy`,
        'vi', data
    );
}

export const UpdateStatusYCTiepNopQuy = (data) => {
    return request(
        'POST',
        `YCTiepNopQuy/Update_Status`,
        'vi', data
    );
}

export const CapNhatYCTiepNopQuy = (data) => {
    return request(
        'PUT',
        `YCTiepNopQuy/PutYCTiepNopQuy`,
        'vi', data
    );
}