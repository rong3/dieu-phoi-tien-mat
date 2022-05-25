import { actionTypes } from "../actions/masterDataAction";

export const initialState = {
    masterData: [],
    relatedUser:[],
    dsnv3kv:[]
}

const masterDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_MASTERDATA_SUCCESS: {
            return {
                ...state,
                masterData: action.payload?.data ?? []
            }
        }
        case actionTypes.LOAD_RELATEDUSER_SUCCESS: {
            return {
                ...state,
                relatedUser: action.payload?.data ?? []
            }
        }
        case actionTypes.LOAD_DSNHANVIEN3KHUVUC_SUCCESS: {
            return {
                ...state,
                dsnv3kv: action.payload?.data ?? []
            }
        }
        default:
            return state;
    }
};

export default masterDataReducer;
