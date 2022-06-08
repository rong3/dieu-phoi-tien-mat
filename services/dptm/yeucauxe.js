import { request } from '../../shared/packages/service-adapter/axios';

export const GetYCXe = (data) => {
    return request(
        'POST',
        `YCHoTroXe/GetYCHoTroXe`,
        'vi', data
    );
}

export const GetYCXeById = (id) => {
    return request(
        'GET',
        `YCHoTroXe/GetYCHoTroXe/${id}`,
        'vi',
    );
}

export const GetQuantityYCX = () => {
    return request(
        'GET',
        `YCHoTroXe/GetQuantityInOut`,
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

export const PostSDBSYCHTX = (data) => {
    return request(
        'POST',
        `YCHoTroXeSDBS/PostSDBS`,
        'vi', data
    );
}

export const GetVersionSDBS = (data) => {
    return request(
        'POST',
        `YCHoTroXeSDBS/GetVersionSDBS`,
        'vi',data
    );
}

export const GetModelByVersionSDBS = (data) => {
    return request(
        'POST',
        `YCHoTroXeSDBS/GetSDBSByVersion`,
        'vi',data
    );
}

