import { request } from '../../shared/packages/service-adapter/axios';

export const loginGateway = (data) => {
    return request(
        'POST',
        `Users/Authenticate`,
        'vi', data
    );
}

export const getCaptrenById = (data) => {
    return request(
        'POST',
        `Users/GetCapTrenUserByMaNV`,
        'vi', data
    );
}