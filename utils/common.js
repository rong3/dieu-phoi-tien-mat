import { masterConfig } from "../config/master"
import { removeAccents } from "../services/dptm/commonService"

export const getDefaultLanguage = () => {
  return masterConfig.language?.find(x => x.default)?.eventCode ?? 'vn'
}

//hien thi tren selectbox label cua thong tin nhan vien
export const patternLabelRelatedUser = (data) => {
  try {
    return `${data?.maNhanVien} - ${data?.hoTenDemNhanVien} ${data?.tenNhanVien} - ${data?.email} - ${data?.tenChucDanhMoiNhat}`
  }
  catch {
    return null
  }
}

export const onSeachCommon = (data, relatedUser, modelData, componentData, setComponentData) => {
  const timeOutId = setTimeout(() => {
    //get list nguoi uu tien
    if (data?.trim()?.length === 0) {
      const relatedUserList = [...relatedUser?.filter(x => !modelData?.nguoiLienQuan?.map(x => x?.id)?.includes(x?.maNhanVien))?.slice(0, 20)?.map(x => ({
        id: x?.maNhanVien,
        name: patternLabelRelatedUser(x),
        checked: x?.checked ?? false
      })), ...modelData?.nguoiLienQuan]?.sort((a, b) => a?.checked ? -1 : 1)
      componentData.nguoilienquan = relatedUserList;
      setComponentData({ ...componentData })
    }
    else {
      const relatedUserList = [...relatedUser?.filter(x => !modelData?.nguoiLienQuan?.map(x => x?.id)?.includes(x?.maNhanVien)
        && (x?.email?.indexOf(data) !== -1 || removeAccents(x.maNhanVien)?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1 || removeAccents((x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien))?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1))?.map(x => ({
          id: x?.maNhanVien,
          name: patternLabelRelatedUser(x),
          checked: x?.checked ?? false
        })), ...modelData?.nguoiLienQuan]?.sort((a, b) => a?.checked ? -1 : 1)
      componentData.nguoilienquan = relatedUserList;
      setComponentData({ ...componentData });
    }
  }, 1000);

  return () => clearTimeout(timeOutId);
}