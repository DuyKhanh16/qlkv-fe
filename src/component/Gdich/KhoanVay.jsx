import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import { privateAxios } from "../../api/configapi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useSnackbar } from "../../ultit/SnackbarProvider";

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
export default function KhoanVay() {
  const [checkBoxRow, setCheckBoxRow] = useState([]); // Track selected rows by ids
  const [dataRender, setDataRender] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loanNoTatal, setLoanNoTatal] = useState("");
  const [loginData, setLoginData] = useState(
    JSON.parse(Cookies.get("loginData"))
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const paginationModel = { page: 0, pageSize: 10 };
  const columns = [
    {
      field: "loanId",
      headerName: "STT",
      width: 70,
      valueGetter: (params) => dataRender?.findIndex((e) => e.id == params) + 1,
    },
    { field: "contractNo", headerName: "Số hợp đồng", width: 130 },
    { field: "borrOwer", headerName: "Bên vay vốn", width: 200 },
    { field: "lender", headerName: "Bên cho vay", width: 200 },
    { field: "usedCap", headerName: "Bên sử dụng vốn", width: 200 },
    {
      field: "contractType",
      headerName: "Loại hợp đồng",
      width: 130,
      valueGetter: (params) => {
        return params == "R" ? "Hợp đồng hạn mức" : "Hợp đồng không hạn mức";
      },
    },
    { field: "projectName", headerName: "Tên dự án", width: 130 },
    { field: "loanName", headerName: "Ghi chú", width: 150 },
    { field: "loanAmount", headerName: "Hạn mức giải ngân", width: 90 },
    { field: "ccy", headerName: "ĐV Tiền", width: 90 },
    { field: "interestRate1", headerName: "Lãi xuất vay 1", width: 90 },
    {
      field: "descriptionInterestRate",
      headerName: "Ghi chú về mức lãi xuất khoản vay",
      width: 150,
    },
    { field: "fee1", headerName: "Phí khoản vay 1", width: 90 },
    { field: "fee2", headerName: "Phí khoản vay 2", width: 90 },
    { field: "fee3", headerName: "Phí khoản vay 3", width: 90 },
    { field: "loanPeriod", headerName: "Kỳ hạn", width: 90 },
    {
      field: "fromDate",
      headerName: "Ngày bắt đầu",
      width: 90,
      valueGetter: (params) =>
        params == null ? "" : String(params).slice(0, 10),
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      width: 90,
      valueGetter: (params) =>
        params == null ? "" : String(params).slice(0, 10),
    },

    { field: "equityCapital", headerName: "Vốn tự có", width: 90 },
    { field: "comment", headerName: "Mô Tả", width: 90 },
    { field: "mangUser", headerName: "Cán bộ QL khoản vay", width: 90 },
    { field: "loanStatus", headerName: "Trạng thái", width: 90 },
  ];

  const [loan, setLoan] = useState({
    loanId: 0,
    contractNo: loanNoTatal,
    borrowerId: 0,
    lenderId: 0,
    usedCapId: 0,
    contractType: "",
    projectId1: 0,
    projectId2: 0,
    projectId3: 0,
    projectId4: 0,
    projectId5: 0,
    projectId6: 0,
    projectId7: 0,
    projectId8: 0,
    projectId9: 0,
    projectId10: 0,
    projectId11: 0,
    projectId12: 0,
    projectId13: 0,
    projectId14: 0,
    projectId15: 0,
    loanName: "",
    purposeId1: null,
    purposeId2: null,
    purposeId3: null,
    purposeId4: null,
    purposeId5: null,
    purposeId6: null,
    purposeId7: null,
    loanAmountPurpose1: null,
    loanAmountPurpose2: null,
    loanAmountPurpose3: null,
    loanAmountPurpose4: null,
    loanAmountPurpose5: null,
    loanAmountPurpose6: null,
    loanAmountPurpose7: null,
    fromDate: null,
    endDate: null,
    loanAmount: null,
    ccy: "VND",
    kindPriPenatyRate: null,
    kindIntPenatyRate: null,
    dayBasis: "",
    loanStatus: "",
    comment: "",
    mangUser: "",
    inputedDate: null,
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
    loanPeriod: "",
    equityCapital: null,
    bankName: "",
    interestRate1: null,
    descriptionInterestRate: "",
    fee1: null,
    fee2: null,
    fee3: null,
    description: "",
  });
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    callDataRender();
    createContractNo();
  }, [flag]);

  const callDataRender = async () => {
    try {
      const result = await privateAxios.get("api/loan/list", {
        params: { userLogin: loginData.loginName },
      });
      setDataRender(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Tạo Loan thủ công
  const [customer, setCustomer] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [loanPurpose, setLoanPurpose] = useState([]);
  const callCustomer = async () => {
    try {
      const result = await privateAxios.get("api/customers/list-select");
      setCustomer(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const callProject = async () => {
    try {
      const result = await privateAxios.get(
        `api/project/list-select?userCapId=${loan.usedCapId}`
      );
      setProject(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const callUser = async () => {
    try {
      const result = await privateAxios.get("auth/api/user/list-select");
      setUser(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const callLoanPurpose = async () => {
    try {
      const result = await privateAxios.get("api/loanPurpose/list-select");
      setLoanPurpose(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    handleOpen();
    callCustomer();
    // callProject();
    callUser();
    callLoanPurpose();
  };
  const createContractNo = () => {
    if (
      loan.borrowerId != 0 &&
      loan.lenderId != 0 &&
      loan.usedCapId != 0
    ) {
      const borrOwer = customer.find(
        (e) => e.id == loan.borrowerId
      ).abbreviation;
      const lender = customer.find((e) => e.id == loan.lenderId).abbreviation;
      const usedCap = customer.find((e) => e.id == loan.usedCapId).abbreviation;
      setLoan({
        ...loan,
        contractNo: `${borrOwer}-${lender}-${usedCap}`,
      });
    }
    if (
      loan.borrowerId != 0 &&
      loan.lenderId != 0 &&
      loan.usedCapId != 0 &&
      loan.projectId1 != 0
    ) {
      const borrOwer = customer.find(
        (e) => e.id == loan.borrowerId
      ).abbreviation;
      const lender = customer.find((e) => e.id == loan.lenderId).abbreviation;
      const usedCap = customer.find((e) => e.id == loan.usedCapId).abbreviation;
      const projectNo = project.find((e) => e.id == loan.projectId1).projectNo;
      setLoan({
        ...loan,
        contractNo: `${borrOwer}-${lender}-${usedCap}-${projectNo}`,
      });
    }
  };
  function calculateRoundedMonths(startDate, endDate) {

    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day); 
    };
  
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24); 
    return ` ${Math.round(daysDifference/365 * 12)} M`;
  }
  
  const handleCreateNewLoan = async () => {
    if(!window.confirm("Bạn có muốn tạo mới khoản vay?")){return}
    if(loan.contractNo ==""||loan.loanAmount ==null||loan.purposeId1 ==null||loanAmountPurpose1 == null
    ||loan.interestRate1==null||loan.fee1==null||loan.equityCapital==null||loan.mangUser==""||loan.loanPeriod==""){alert("Vui lòng nhập đầy đủ thông tin *");return}
      try {
        const result = await privateAxios.post("api/loan/create-one", loan);
        showSnackbar(result.data.message, "success");
        handleClose();
        setLoan({
          loanId: 0,
    contractNo: loanNoTatal,
    borrowerId: 0,
    lenderId: 0,
    usedCapId: 0,
    contractType: "",
    projectId1: 0,
    projectId2: 0,
    projectId3: 0,
    projectId4: 0,
    projectId5: 0,
    projectId6: 0,
    projectId7: 0,
    projectId8: 0,
    projectId9: 0,
    projectId10: 0,
    projectId11: 0,
    projectId12: 0,
    projectId13: 0,
    projectId14: 0,
    projectId15: 0,
    loanName: "",
    purposeId1: null,
    purposeId2: null,
    purposeId3: null,
    purposeId4: null,
    purposeId5: null,
    purposeId6: null,
    purposeId7: null,
    loanAmountPurpose1: null,
    loanAmountPurpose2: null,
    loanAmountPurpose3: null,
    loanAmountPurpose4: null,
    loanAmountPurpose5: null,
    loanAmountPurpose6: null,
    loanAmountPurpose7: null,
    fromDate: null,
    endDate: null,
    loanAmount: null,
    ccy: "",
    kindPriPenatyRate: null,
    kindIntPenatyRate: null,
    dayBasis: "",
    loanStatus: "",
    comment: "",
    mangUser: "",
    inputedDate: null,
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
    loanPeriod: "",
    equityCapital: null,
    bankName: "",
    interestRate1: null,
    descriptionInterestRate: "",
    fee1: null,
    fee2: null,
    fee3: null,
    description: "",
        })
      } catch (error) {
        console.log(error);
        showSnackbar(error.response.data.message, "error");
        handleClose();
      }
  }
  console.log(loan)
  return (
    <div>
      <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full ">
          {" "}
          Khoản Vay
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {checkBoxRow.length == 0 ? (
          <Button
            variant="success"
            style={{ boxShadow: "none" }}
            onClick={handleClickOpen}
          >
            <i className="fa-solid fa-folder-plus"></i> Tạo Mới
          </Button>
        ) : (
          <Button
            variant="warning"
            style={{ display: checkBoxRow.length == 1 ? "block" : "none" }}
          >
            {" "}
            <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
          </Button>
        )}
        <Button
          variant="danger"
          style={{ display: checkBoxRow.length > 0 ? "block" : "none" }}
        >
          {" "}
          <i className="fa-solid fa-trash"></i> Xóa bỏ
        </Button>
        <div
          className="flex gap-2 items-center"
          style={{ visibility: checkBoxRow.length > 0 ? "hidden" : "visible" }}
        >
          {/* <ButtonImportExcel
            columnsForExcel={columnsExcel}
          /> */}
          {/* <ExportExcel columnsForExcel={columnsExcel}  datatExcel={rowSelectionModel} headersExport={headersExport} excelName={"Khách Hàng"}/>
          <ExportTempalet nameFile={"Khách_Hàng"}/> */}
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
          Danh Sách Khoản Vay
        </p>
      </div>

      {/* table khách hàng */}
      <Paper sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={dataRender}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          selectionModel={checkBoxRow}
          getRowId={(row) => row.loanId}
          onRowSelectionModelChange={(row) => setCheckBoxRow(row)} // Truyền mảng các id của các hàng đã chọn
          sx={{ border: 0 }}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {checkBoxRow.length == 0
              ? "Tạo Mới Khoản Vay"
              : "Chỉnh sửa Khoản Vay"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label={
                <span>
                  Số hợp đồng <span style={{ color: "red" }}>*</span>
                </span>
              }
              value={loan.contractNo}
              multiline
              disabled
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <div className="ml-2 mt-2">
              <p>
                Bên vay <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                onChange={(e) => setLoan({ ...loan, borrowerId: e.value })}
                className="w-[620px]  mb-3"
                placeholder={
                  <p>
                    Bên vay vốn <span style={{ color: "red" }}>*</span>
                  </p>
                }
                onMenuClose={() => {
                  createContractNo();
                }}
                options={customer?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
              <p>
                Bên cho vay <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                onChange={(e) => setLoan({ ...loan, lenderId: e.value })}
                className="w-[620px]  mb-3"
                placeholder={
                  <p>
                    Bên cho vay <span style={{ color: "red" }}>*</span>
                  </p>
                }
                onMenuClose={() => {
                  createContractNo();
                }}
                options={customer?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
              <p>
                Bên sử dụng <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                onChange={(e) => setLoan({ ...loan, usedCapId: e.value })}
                className="w-[620px]  mb-3"
                placeholder={
                  <p>
                    Bên sử dụng vốn <span style={{ color: "red" }}>*</span>
                  </p>
                }
                onMenuClose={() => {
                  createContractNo();
                }}
                options={customer?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
              <p>
                Loại hợp đồng <span style={{ color: "red" }}>*</span>
              </p>
              <select className="w-[620px]  mb-3 h-[50px] border border-gray-400 p-1 rounded-md">
                <option defaultValue={""}>Chọn loại hợp đồng</option>
                <option value="R">Hợp đồng hạn mức</option>
                <option value="N">Hợp đồng không hạn mức</option>
              </select>
              <p>
                Dự án
              </p>

              <Select
                onChange={(e) => {
                  setLoan({ ...loan, projectId1: e.value });
                }}
                onMenuClose={() => {
                  createContractNo();
                }}
                className="w-[620px]  mb-3"
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                placeholder={
                  <p>
                    Dự án 
                  </p>
                }
                onMenuOpen={() => {
                  callProject();
                }}
                options={project?.map((item) => ({
                  value: item.id,
                  label: item.projectName,
                }))}
              />
            </div>
            <TextField
              label={
                <span>
                  Hạn mức giải ngân(VND) <span style={{ color: "red" }}>*</span>
                </span>
              }
              type="number"
              value={loan.loanAmount}
              onChange={(e) => setLoan({ ...loan, loanAmount: Number(e.target.value)})}
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <Select
                onChange={(e) => setLoan({ ...loan, projectId1: e.value })}
                className="w-[620px] ml-3 mt-2 mb-2"
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                placeholder={
                  <p>
                   Mục đích vay 1 <span style={{ color: "red" }}>*</span>
                  </p>
                }
                
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={
                <span>
                  Hạn mức giải ngân mục đích vay 1(VND){" "}
                  <span style={{ color: "red" }}>*</span>
                </span>
              }
               type="number"
              value={loan.loanAmountPurpose1}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose1:Number(e.target.value)})
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <Select
                onChange={(e) => setLoan({ ...loan, projectId2: e.value })}
                className="w-[620px]  ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 2 
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 2(VND)</span>}
              value={loan.loanAmountPurpose2}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose2: Number(e.target.value) })
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           <Select
                onChange={(e) => setLoan({ ...loan, projectId3: e.value })}
                className="w-[620px]  ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 3
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 3(VND)</span>}
              value={loan.loanAmountPurpose3}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose3: Number(e.target.value) })
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           <Select
                onChange={(e) => setLoan({ ...loan, projectId4: e.value })}
                className="w-[620px]  ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 4
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 4(VND)</span>}
              value={loan.loanAmountPurpose4}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose4: Number(e.target.value)})
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <Select
                onChange={(e) => setLoan({ ...loan, projectId5: e.value })}
                className="w-[620px] ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 5 
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 5(VND)</span>}
              value={loan.loanAmountPurpose5}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose5:Number(e.target.value)})
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           <Select
                onChange={(e) => setLoan({ ...loan, projectId6: e.value })}
                className="w-[620px]  ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 6 
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />
            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 6(VND)</span>}
              value={loan.loanAmountPurpose6}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose6: Number(e.target.value) })
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           <Select
                onChange={(e) => setLoan({ ...loan, projectId7: e.value })}
                className="w-[620px]  ml-3 mt-2 mb-2"
                placeholder={
                  <p>
                   Mục đích vay 7 
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={loanPurpose?.map((item) => ({
                  value: item.id,
                  label: item.purposeName,
                }))}
              />

            <TextField
              label={<span>Hạn mức giải ngân mục đích vay 7(VND)</span>}
              value={loan.loanAmountPurpose7}
              onChange={(e) =>
                setLoan({ ...loan, loanAmountPurpose7: Number(e.target.value) })
              }
               type="number"
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={
                <span>
                  Lãi xuất vay 1 (%) <span style={{ color: "red" }}>*</span>
                </span>
              }
               
              value={loan.interestRate1}
              onChange={(e) =>
                setLoan({ ...loan, interestRate1: Number(e.target.value) })
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={<span>Ghi chú về mức lãi xuất khoản vay</span>}
              value={loan.descriptionInterestRate1}
              onChange={(e) =>
                setLoan({ ...loan, descriptionInterestRate1: e.target.value })
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={
                <span>
                  Phí khoản vay 1 <span style={{ color: "red" }}>*</span>
                </span>
              }
               type="number"
              value={loan.fee1}
              onChange={(e) => setLoan({ ...loan, fee1: Number(e.target.value) })}
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={<span>Phí khoản vay 2</span>}
              value={loan.fee2}
              onChange={(e) => setLoan({ ...loan, fee2: Number(e.target.value) })}
              multiline
               type="number"
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={<span>Phí khoản vay 3</span>}
              value={loan.fee3}
              onChange={(e) => setLoan({ ...loan, fee3: Number(e.target.value) })}
              multiline
               type="number"
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <TextField
              label={<span>Kỳ hạn</span>}
              value={loan.loanPeriod}
              multiline
              disabled
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <div className='flex gap-2 m-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label={<p>Ngày hiệu lực <span className="text-red-600">*</span></p>} 
                  onChange={(value) => setLoan({ ...loan, fromDate:  value.format("DD/MM/YYYY")})}/>
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label={<p>Ngày hết hiệu lực <span className="text-red-600">*</span></p>} 
                  minDate={dayjs(String(loan.fromDate).split("/")
                    .map((value, index, array) => {
                      if (index === 0) return array[1]; 
                      if (index === 1) return array[0]; 
                      return value;
                    })
                    .join("/"))}
                 
                   onChange={(value) =>{ setLoan({ ...loan, endDate:  value.format("DD/MM/YYYY"), loanPeriod: calculateRoundedMonths(loan.fromDate, value.format("DD/MM/YYYY"))});
                  
                  } }

                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <TextField
              label={
                <span>
                  Vốn tự có <span style={{ color: "red" }}>*</span>
                </span>
              }
               type="number"
              value={loan.equityCapital}
              onChange={(e) => setLoan({ ...loan, equityCapital: Number(e.target.value) })}
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <p className="ml-2">
               Cán bộ quản lý khoản vay <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                onChange={(e) => setLoan({ ...loan, mangUser: e.value })}
                className="w-[620px]  mb-3 ml-2"
                placeholder={
                  <p>
                    Cán bộ quản lý <span style={{ color: "red" }}>*</span>
                  </p>
                }
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                options={user?.map((item) => ({
                  value: item.loginName,
                  label: item.fullName,
                }))}
              />
               <TextField
              label={
                <span>
                  Mô tả 
                </span>
              }
              value={loan.comment}
              onChange={(e) => setLoan({ ...loan, comment: e.target.value })}
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
             <TextField
              label={
                <span>
               Ghi chú
                </span>
              }
              value={loan.loanName}
              onChange={(e) => setLoan({ ...loan, loanName: e.target.value })}
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
            <select className="w-[620px]  m-2 border border-gray-300 h-[60px] p-2 rounded-md" onChange={(e) => setLoan({ ...loan, loanStatus: e.target.value })} >
              <option value="">Trạng thái</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="LOSED">LOSED</option>
              <option value="OVERDUE">OVERDUE</option>
            </select>
              <div className='flex justify-center mt-3'>
            {checkBoxRow.length === 0 ? 
            <Button variant="success" onClick={handleCreateNewLoan}>Tạo mới</Button>
            :<Button variant="warning">Chỉnh sửa</Button>}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
