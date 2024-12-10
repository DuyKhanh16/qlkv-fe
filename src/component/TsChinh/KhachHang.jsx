import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";

import { Button, Form } from "react-bootstrap";
import { privateAxios } from "../../api/configapi";
import {
  Box,
  Modal,
  sliderClasses,
  TextField,
  Typography,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSnackbar } from "../../ultit/SnackbarProvider";
import ButtonImportExcel from "../importExcel/ButtonImportExcel";
import { Opacity } from "@mui/icons-material";
import { display } from "@mui/system";
import ExportExcel from "../exportExcel/ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function KhachHang() {
  const { showSnackbar } = useSnackbar();
  const [callData, setCallData] = React.useState(true);
  const [loginData, setLoginData] = React.useState(
    JSON.parse(Cookies.get("loginData"))
  );
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]); // Use state to track row selection
  const [checkBoxRow, setCheckBoxRow] = React.useState([]); // Track selected rows by ids
  const paginationModel = { page: 0, pageSize: 10 };
  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // User new
  const [user, setUser] = React.useState({
    // ID: 0,
    name: "",
    abbreviation: "",
    address: "",
    busRegist: "",
    mangUser: loginData.loginName,
    inputedDate: "",
    inputedUser: loginData.loginName,
    charterCapital: null,
    recentRevenue: null,
    recentProfit: null,
    cusAccountNumber: "",
    customerType: null,
    gender: null,
    dateOfBirth: "",
    dateOfIssue: "",
    placeOfIssue: "",
    phone: "",
    email: "",
    bankName: "",
  });

  const columns = [
    { field: "id", headerName: "STT", width: 30 ,valueGetter: (params) => rowSelectionModel?.findIndex((e)=>e.id == params)+1 },
    { field: "name", headerName: "Tên Khách Hàng", width: 150 },
    { field: "abbreviation", headerName: "Tến Viết Tắt", width: 130 },
    {
      field: "customerType",
      headerName: "Loại Khách Hàng",
      width: 130,
      valueGetter: (params) => {
        return params == 1 ? "Tổ chức" : "Cá nhân";
      },
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 90,
      valueGetter: (params) => {
        return params == 0 ? "" : params === 1 ? "Nam" : "Nữ";
      },
    },
    { field: "dateOfBirth", headerName: "Ngày Sinh/Thành Lập", width: 130 },
    { field: "busRegist", headerName: "CMT/CCCD/ĐKKD", width: 90 },
    { field: "dateOfIssuege", headerName: "Ngày Cấp", width: 90 },
    { field: "placeOfIssue", headerName: "Nơi Cấp", width: 90 },
    { field: "phone", headerName: "Số ĐT", width: 90 },
    { field: "email", headerName: "Email", width: 90 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "charterCapital", headerName: "Vốn Điều Lệ", width: 90 },
    { field: "recentRevenue", headerName: "Doanh Thu Năm", width: 90 },
    { field: "recentProfit", headerName: "Lợi Nhuận Năm", width: 90 },
    { field: "cusAccountNumber", headerName: "Số Tài Khoản", width: 90 },
    { field: "bankName", headerName: "Ngân Hàng", width: 90 },
  ];

  // Khai báo  mảng columns excel
  const columnsExcel = [
    "name",
    "abbreviation",
    "customerType",
    "gender",
    "dateOfBirth",
    "busRegist",
    "dateOfIssue",
    "placeOfIssue",
    "phone",
    "email",
    "address",
    "charterCapital",
    "recentRevenue",
    "recentProfit",
    "cusAccountNumber",
    "bankName",
  ];
  // Khai báo exportExcel
  const headersExport = [
    "Tên Khách Hàng",
    "Tến Viết Tắt",
    "Loại Khách Hàng",
    "Giới tính",
    "Ngày Sinh/Thành Lập",
    "CMT/CCCD/ĐKKD",
    "Ngày Cấp",
    "Nơi Cấp",
    "Số ĐT",
    "Email",
    "Địa chỉ",
    "Vốn Điều Lệ",
    "Doanh Thu Năm",
    "Lợi Nhuận Năm",
    "Số Tài Khoản",
    "Ngân Hàng"
];
  // gọi dữ liệu khách hàng
  const handleCallCustomer = async () => {
    try {
      const response = await privateAxios.get("api/customers/list");
      setRowSelectionModel(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCallCustomer();
  }, [callData]); // Added token and flag as dependencies

  // tạo user bằng tay
  const createUser = async () => {
    if (
      user.name === "" ||
      user.abbreviation === "" ||
      user.customerType == 0 ||
      user.busRegist === "" ||
      user.dateOfIssue === "" ||
      user.placeOfIssue === "" ||
      user.cusAccountNumber === "" ||
      user.bankName === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc *");
      return;
    }
    if (
      user.abbreviation.indexOf(" ") !== -1 ||
      user.abbreviation !== user.abbreviation.toUpperCase()
    ) {
      alert("Tên viết tắt không đúng quy chuẩn");
      return;
    }

    try {
      const response = await privateAxios.post(
        "api/customers/create-one",
        user
      );
      showSnackbar(response.data.message, "success");
      setUser({
        name: "",
        abbreviation: "",
        address: "",
        busRegist: "",
        mangUser: loginData.loginName,
        inputedDate: "",
        inputedUser: loginData.loginName,
        charterCapital: null,
        recentRevenue: null,
        recentProfit: null,
        cusAccountNumber: "",
        customerType: null,
        gender: null,
        dateOfBirth: "",
        dateOfIssue: "",
        placeOfIssue: "",
        phone: "",
        email: "",
        bankName: "",
      });
      setOpen(false);
      setFlag(!callData);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  };

  // Import file excel khách hàng
  const handeleSaveExel = async (dataExcel) => {
    if (!confirm("Xác nhận lưu dữ liệu")) {
      return;
    }
    try {
      const response = await privateAxios.post(
        `api/customers/excel-import?mangUser=${loginData.loginName}&inputedUser=${loginData.loginName}`,
        dataExcel
      );
      showSnackbar(response.data.message, "success");
      setCallData(!callData);
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
      setCallData(!callData);
    }
  };

  // Xóa khách hàng
  const handleDeleteCustomer = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa")) {
      return;
    }
    try {
      const result = await privateAxios.post(
        "api/customers/delete",
        checkBoxRow
      );
      showSnackbar(result.data.message, "success");
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      console.log(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    }
  };
  const buttonUpdateOpen = () => {
    const customeEdit = rowSelectionModel.filter(
      (item) => item.id === checkBoxRow[0]
    );
    setUser(customeEdit[0]);
    setOpen(true);
  };
  // cap nhat khach hang
  const handleUpdateCustomer = async () => {
    try {
      const result = await privateAxios.patch("api/customers/update-one", user);
      showSnackbar(result.data.message, "success");
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  };
  return (
    <div>
      {/* Group button */}
      <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full ">
          {" "}
          Khách Hàng
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {checkBoxRow.length == 0 ? (
          <Button
            variant="success"
            style={{ boxShadow: "none" }}
            onClick={handleOpen}
          >
            <i className="fa-solid fa-folder-plus"></i> Tạo Mới
          </Button>
        ) : (
          <Button
            variant="warning"
            style={{ display: checkBoxRow.length == 1 ? "block" : "none" }}
            onClick={buttonUpdateOpen}
          >
            {" "}
            <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
          </Button>
        )}
        <Button
          variant="danger"
          style={{ display: checkBoxRow.length > 0 ? "block" : "none" }}
          onClick={handleDeleteCustomer}
        >
          {" "}
          <i className="fa-solid fa-trash"></i> Xóa bỏ
        </Button>
        <div
          className="flex gap-2 items-center"
          style={{ visibility: checkBoxRow.length > 0 ? "hidden" : "visible" }}
        >
          <ButtonImportExcel
            columnsForExcel={columnsExcel}
            saveExcel={handeleSaveExel}
          />
          <ExportExcel columnsForExcel={columnsExcel}  datatExcel={rowSelectionModel} headersExport={headersExport} excelName={"Khách Hàng"}/>
        </div>
        <Button variant="none" className="ml-auto">
          <i
            onClick={() => window.location.reload()}
            style={{ fontSize: "20px", color: "red" }}
            className="fa-solid fa-rotate-right"
          ></i>{" "}
        </Button>
      </div>
      <div>
        <p className="font-bold text-blue-500 p-2">
          {" "}
          <span>
            <i
              style={{ fontSize: "20px", color: "gray", marginRight: "5px" }}
              className="fa-solid fa-list"
            ></i>
          </span>{" "}
          Danh Sách Khách Hàng
        </p>
      </div>
      {/* table khách hàng */}
      <Paper sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={rowSelectionModel}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          selectionModel={checkBoxRow}
          onRowSelectionModelChange={(row) => setCheckBoxRow(row)} // Truyền mảng các id của các hàng đã chọn
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Modal add/edit khách hàng */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            style={{ textAlign: "center" }}
          >
            {checkBoxRow.length == 1 ? (
              <span span style={{ fontWeight: "bold" }}>
                Chỉnh sửa khách hàng
              </span>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Tạo mới khách hàng
              </span>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <select
              name="customerType"
              style={{
                margin: "10px",
                width: "35%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                display: checkBoxRow.length == 1 ? "none" : "block",
              }}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option> Loại Khách hàng *</option>
              <option value="1"> Khách hàng tổ chức</option>
              <option value="2"> Khách hàng cá nhân</option>
            </select>
            <p
              className="text-lg ml-3"
              style={{ display: checkBoxRow.length == 1 ? "block" : "none" }}
            >
              Loại Khách Hàng: {user.customerType === 2 ? "Cá Nhân" : "Tổ chức"}
            </p>
            <TextField
              label={
                <span>
                  Tên khách hàng <span style={{ color: "red" }}>*</span>
                </span>
              }
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              value={user.abbreviation}
              label={
                <span>
                  Tên viết tắt <span style={{ color: "red" }}>*</span>
                </span>
              }
              onChange={(e) =>
                setUser((prev) => ({ ...prev, abbreviation: e.target.value }))
              }
              multiline
              maxRows={4}
              helperText={
                <span style={{ color: "red" }}> Viết hoa liền không cách</span>
              }
              style={{ margin: "10px", width: "100%" }}
            />

            <br />
            <select
              style={{
                margin: "10px",
                width: "35%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                display: user.customerType == 1 ? "none" : "block",
              }}
              name="gender"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value=""> Giới tính</option>
              <option value="1"> Nam</option>
              <option value="2"> Nữ</option>
            </select>

            <div style={{ margin: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={
                      user.dateOfBirth
                        ? dayjs(user.dateOfBirth.toString())
                        : null
                    }
                    label={
                      user.customerType == 2 ? (
                        <span>Ngày sinh</span>
                      ) : (
                        <span>Ngày thành lập</span>
                      )
                    }
                    onChange={(value) =>
                      setUser((prev) => ({
                        ...prev,
                        dateOfBirth: value ? value.format("DD/MM/YYYY") : null,
                      }))
                    }
                    maxDate={dayjs().subtract(1, "day")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Typography>
          <TextField
            value={user.busRegist}
            label={
              <span>
                CMT/CCCD/ĐKKD <span style={{ color: "red" }}>*</span>
              </span>
            }
            onChange={(e) =>
              setUser((prev) => ({ ...prev, busRegist: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <div style={{ margin: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={
                    user.dateOfIssue ? dayjs(user.dateOfIssue.toString()) : null
                  }
                  label={
                    <span>
                      Ngày cấp <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  onChange={(value) =>
                    setUser((prev) => ({
                      ...prev,
                      dateOfIssue: value ? value.format("DD/MM/YYYY") : null,
                    }))
                  }
                  maxDate={dayjs().subtract(1, "day")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <TextField
            value={user.placeOfIssue}
            label={
              <span>
                Nơi cấp <span style={{ color: "red" }}>*</span>
              </span>
            }
            onChange={(e) =>
              setUser((prev) => ({ ...prev, placeOfIssue: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Điện thoại</span>}
            value={user.phone}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phone: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Email</span>}
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Địa chỉ</span>}
            value={user.address}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, address: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Vốn điều lệ</span>}
            value={user.charterCapital == 0 ? null : user.charterCapital}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, charterCapital: e.target.value }))
            }
            multiline
            maxRows={4}
            type="number"
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Doanh thu năm gần nhất</span>}
            value={user.recentRevenue == 0 ? null : user.recentRevenue}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, recentRevenue: e.target.value }))
            }
            multiline
            maxRows={4}
            type="number"
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={<span>Lợi nhuận năm gần nhất</span>}
            value={user.recentProfit == 0 ? null : user.recentProfit}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, recentProfit: e.target.value }))
            }
            multiline
            maxRows={4}
            type="number"
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={
              <span>
                Số tài khoản khách hàng <span style={{ color: "red" }}>*</span>
              </span>
            }
            value={user.cusAccountNumber}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, cusAccountNumber: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <TextField
            label={
              <span>
                Ngân hàng <span style={{ color: "red" }}>*</span>
              </span>
            }
            value={user.bankName}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, bankName: e.target.value }))
            }
            multiline
            maxRows={4}
            style={{ margin: "10px", width: "100%" }}
          />
          <div className="flex justify-center mt-6">
            {checkBoxRow.length == 1 ? (
              <Button variant="warning" onClick={handleUpdateCustomer}>
                <span>
                  <i class="fa-solid fa-pen-to-square"></i>
                </span>{" "}
                Chỉnh sửa
              </Button>
            ) : (
              <Button variant="success" onClick={createUser}>
                {" "}
                <span>
                  <i class="fa-solid fa-plus"></i>
                </span>{" "}
                Thêm Mới
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
