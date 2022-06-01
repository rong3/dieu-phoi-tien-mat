import { request } from '../../shared/packages/service-adapter/axios';

export const PostLXQQuantity = (data) => {
    return request(
        'POST',
        `LXQ/PostLXQByQuantity`,
        'vi', data
    );
}

export const PostLXQ = (data) => {
    return request(
        'POST',
        `LXQ/PostLXQ`,
        'vi', data
    );
}

export const GetLXQById = (id) => {
    return request(
        'GET',
        `LXQ/GetLXQ/${id}`,
        'vi'
    );
}

export const GetLXQ = (type) => {
    return request(
        'GET',
        `LXQ/GetLXQ?type=${type}`,
        'vi'
    );
}

export const UpdateLXQById = (data) => {
    return request(
        'PUT',
        `LXQ/PutLXQ`,
        'vi', data
    );
}

export const UpdateStatusLXQ = (data) => {
    return request(
        'POST',
        `LXQ/Update_Status`,
        'vi', data
    );
}

