import { request } from '../../shared/packages/service-adapter/axios';

export const PostPYCHTX = (data) => {
    return request(
        'POST',
        `PhieuHoTroXe/PostPHTX`,
        'vi', data
    );
}

export const GetPYCHTXById = (id) => {
    return request(
        'GET',
        `PhieuHoTroXe/GetPHTX/${id}`,
        'vi'
    );
}

export const GetPYCHTX = (data) => {
    return request(
        'POST',
        `PhieuHoTroXe/GetPHTX`,
        'vi',data
    );
}

export const GetQuantityPYCHTX = () => {
    return request(
        'GET',
        `PhieuHoTroXe/GetQuantityInOut`,
        'vi',
    );
}

export const UpdatePYCHTXById = (data) => {
    return request(
        'PUT',
        `PhieuHoTroXe/PutPHTX`,
        'vi', data
    );
}

export const UpdateStatusPYCHTX = (data) => {
    return request(
        'POST',
        `PhieuHoTroXe/Update_Status`,
        'vi', data
    );
}

