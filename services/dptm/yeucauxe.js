import { request } from '../../shared/packages/service-adapter/axios';

export const GetYCXe = (type) => {
    return request(
        'GET',
        `YCHoTroXe/GetYCHoTroXe?type=${type}`,
        'vi',
    );
}

export const GetYCXeById = (id) => {
    return request(
        'GET',
        `YCHoTroXe/GetYCHoTroXe/${id}`,
        'vi',
    );
}


export const TaoMoiYCXe = (data) => {
    return request(
        'POST',
        `YCHoTroXe/PostYCHoTroXe`,
        'vi', data
    );
}

export const UpdateStatusYCXe = (data) => {
    return request(
        'POST',
        `YCHoTroXe/Update_Status`,
        'vi', data
    );
}

export const CapNhatYCXe = (data) => {
    return request(
        'PUT',
        `YCHoTroXe/PutYCHoTroXe`,
        'vi', data
    );
}

export const PostYCHTXQuantity = (data) => {
    return request(
        'POST',
        `PhieuHoTroXe/PostHTXByQuantity`,
        'vi', data
    );
}