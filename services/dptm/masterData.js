import { request } from '../../shared/packages/service-adapter/axios';

export const GetMasterData = (param) => {
    return request(
        'GET',
        `MasterData/GetMasterData`,
        'vi',
    );
}

export const GetNguoiLienQuan=()=>{
    return request(
        'GET',
        `Users/GetAllUser`,
        'vi'
    );
}

export const GetDSNV3KV=()=>{
    return request(
        'GET',
        `RealeaseFundMasterData/GetReleaseFund`,
        'vi'
    );
}