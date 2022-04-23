import React from "react";
import { useRouter } from 'next/router'
import { map } from "jquery";

function DashBoardComponent(props) {
    const router = useRouter()

    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }

    return (
        <>
            <section class="header-menu">
                <div class="wrapper-container">
                    <div class="tabs-menu">
                        <ul class="tab-list d-flex align-items-center">
                            <li class="active"><a class="wrapper-content bg-red d-flex align-items-center" href="#">
                                <div class="icon"> <img src="/asset/images/icons/mail.svg" alt="" /></div>
                                <p class="title-item">Yêu cầu đến<span>12</span></p>
                                <div class="arrow d-flex align-items-center"> <em class="material-icons">chevron_right</em></div></a></li>
                            <li><a class="wrapper-content bg-blue d-flex align-items-center" href="#">
                                <div class="icon"> <img src="/asset/images/icons/mail-1.svg" alt="" /></div>
                                <p class="title-item">Yêu cầu đi<span>95</span></p>
                                <div class="arrow d-flex align-items-center"> <em class="material-icons">chevron_right</em></div></a></li>
                            <li><a class="wrapper-content bg-green d-flex align-items-center" href="#">
                                <div class="icon"> <img src="/asset/images/icons/save-draft.svg" alt="" /></div>
                                <p class="title-item">Lưu nháp<span>03</span></p>
                                <div class="arrow d-flex align-items-center"> <em class="material-icons">chevron_right</em></div></a></li>

                        </ul>
                    </div>
                </div>
            </section>
            <section class="section-main">
                <div class="wrapper-container d-flex align-items-start">
                    <div class="wrapper-left">
                        <div class="side-bar">
                            <div class="side-bar_top">
                                <h2 class="side-bar_top__title">Chọn trạng thái</h2>
                                <ul class="side-bar_top__list">
                                    <li class="active"> <a href=""> <em class="material-icons">mail_outline</em><span>Tất cả</span></a></li>
                                    <li> <a href=""> <em class="material-icons">done_all</em><span>Bổ sung hồ sơ</span></a></li>
                                    <li> <a href=""> <em class="material-icons">schedule</em><span>Chưa xử lý</span></a></li>
                                </ul>
                            </div>
                            <div class="side-bar_bottom">
                                <h2 class="side-bar_bottom__title">Mức độ ưu tiên</h2>
                                <ul class="side-bar_bottom__list">
                                    <li><a href=""> <span class="dot green"> </span><span class="txt">Thấp</span></a></li>
                                    <li><a href=""> <span class="dot yellow"> </span><span class="txt">Trung bình</span></a></li>
                                    <li><a href=""> <span class="dot red"> </span><span class="txt">Khẩn cấp</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-right">
                        <div class="wrapper-right_header">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="wrapper-right_header--left d-flex align-items-center">
                                    <label class="txt" for="">Chủ đề / Loại yêu cầu </label>
                                    <select>
                                        <option value="hide"></option>
                                        <option value="call">Yêu cầu Tiếp/nộp quỹ</option>
                                        <option value="call">Lệnh xuất quỹ</option>
                                        <option value="call">Yêu cầu Hỗ trợ xe</option>
                                        <option value="call">Phiếu Hỗ trợ xe</option>
                                    </select>
                                </div>
                                <div class="wrapper-right_header--right wrap-tabs d-flex align-items-center ms-auto">
                                    <div class="wrapper-right_header--right__select d-flex align-items-center">
                                        <div class="panel active" id="year">
                                            <select>
                                                <option value="hide">Năm</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                            </select>
                                        </div>
                                        <div class="panel" id="mounth">
                                            <select>
                                                <option value="hide">Tháng</option>
                                                <option value="january">Tháng 1</option>
                                                <option value="february">Tháng 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ul class="tab-list wrapper-right_header--right__sort">
                                        <li rel="mounth">Tháng </li>
                                        <li class="active" rel="year">Năm </li>
                                    </ul>
                                </div>
                            </div>
                            <form class="wrap-form" action="">
                                <div class="form-group">
                                    <button><img src="/asset/images/icons/search-black.svg" alt="" /></button>
                                    <input class="form-control" type="text" placeholder="Tìm kiếm" />
                                </div>
                            </form>
                        </div>
                        <div class="wrapper-right_body">
                            <div class="wrap-table">
                                <table>
                                    <tr data-fancybox="popup" data-src="#popup-detail">
                                        <td> <span class="dot green"> </span></td>
                                        <td>
                                            <p>YC00001</p>
                                        </td>
                                        <td>
                                            <div class="status blue-3"> <span>Chờ hoàn tất</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.png" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot yellow"></span></td>
                                        <td>
                                            <p>YC00002</p>
                                        </td>
                                        <td>
                                            <div class="status yellow-2"> <span>Chưa xử lý</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.svg" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot yellow"> </span></td>
                                        <td>
                                            <p>YC00003</p>
                                        </td>
                                        <td>
                                            <div class="status orange-2"> <span>Bổ sung hồ sơ</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.svg" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot green"> </span></td>
                                        <td>
                                            <p>YC00004</p>
                                        </td>
                                        <td>
                                            <div class="status orange-2"> <span>Bổ sung hồ sơ</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.svg" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot red"> </span></td>
                                        <td>
                                            <p>YC00005</p>
                                        </td>
                                        <td>
                                            <div class="status blue-3"> <span>Chờ hoàn tất</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.png" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot red"> </span></td>
                                        <td>
                                            <p>STK 1 tháng đến hạn, STK đảm bảo cho khoản vay của doanh nghiệp, đã báo chuyên viên KHDN Lương Tiến Thạnh</p>
                                        </td>
                                        <td>
                                            <div class="status blue-3"> <span>Chờ hoàn tất</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.png" alt="" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="dot green"> </span></td>
                                        <td>
                                            <p>STK 1 tháng đến hạn, STK đảm bảo cho khoản vay của doanh nghiệp</p>
                                        </td>
                                        <td>
                                            <div class="status blue-3"> <span>Chờ hoàn tất</span></div>
                                        </td>
                                        <td>
                                            <div class="date-time"> <span>03/04/2022</span></div>
                                        </td>
                                        <td>
                                            <div class="user-avatar"> <img src="/asset/images/icons/avatar.png" alt="" /></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="popup-detail popup-savedraft" id="popup-detail">
                <div class="popup-header wide">
                    <h2 class="title">Cập nhật yêu cầu</h2>
                </div>
                <div class="popup-main">
                    <form class="wrap-form wide" action="">
                        <div class="row">
                            <div class="form-group col-lg-4">
                                <label for="">Mã ĐVKD yêu cầu</label>
                                <input class="form-control" type="text" value="0123456" disabled />
                            </div>
                            <div class="form-group col-lg-4">
                                <label for="">Ngày yêu cầu</label>
                                <input class="form-control" type="date" value="03/04/2022" placeholder="dd/mm/yyyy" />
                            </div>
                            <div class="form-group col-lg-4">
                                <label for="">Ưu tiên</label>
                                <select name="">
                                    <option value="">&#128994; Thấp</option>
                                    <option value="">&#128308; Cao</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-lg-12">
                                <label for="">Mô tả</label>
                                <input class="form-control" type="text" value="Mô tả" />
                            </div>
                        </div>
                        <div class="button-bottom">
                            <button class="btn btn-handle">Lưu nháp</button>
                            <button class="btn btn-done">Gửi duyệt</button>
                        </div>
                    </form>
                </div>
            </div>
            <a href="#" class="float" title="Tạo yêu cầu">
                <i class="fa fa-plus my-float"></i>
            </a>
        </>
    );
}

export default DashBoardComponent;