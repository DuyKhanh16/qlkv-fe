import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { privateAxios } from "../../api/configapi";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import { useSnackbar } from "../../ultit/SnackbarProvider";
import { height } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ButtonImportExcel from "../importExcel/ButtonImportExcel";
import ExportExcel from "../exportExcel/ExportExcel";
import ExportTempalet from "../exportExcel/ExportTempalet";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function Duan() {
  const [checkBoxRow, setCheckBoxRow] = React.useState([]);
  const [dataRender, setDataRender] = useState([]);
  const [flag, setFlag] = useState(false);
  const { showSnackbar } = useSnackbar();

   const [loginData, setLoginData] = React.useState(
      JSON.parse(Cookies.get("loginData"))
    );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setProject({
      id: null,
      projectTypeId: null,
      projectOwnerId: null,
      projectName: "",
      startDate: "",
      endDate: "",
      budget: null,
      description: "",
      status: "",
      projectOwner: null,
      disbursers: "",
      mangUser: "",
      inputedDate: null,
      inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
      projectLocation: "",
      legalRecord: "",
      recentValue: null,
      projectNo: "",
      ccy: "VND",
      quantity: null,
      unit: "ha"
    })
    setOpen(false);
  };
  // create
  const [typeProject, setTypeProject] = useState([]);
  const [projectOwner, setProjectOwner] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "STT",
      width: 70,
      valueGetter: (params) => dataRender?.findIndex((e) => e.id == params) + 1,
    },
    { field: "projectNo", headerName: "Mã dự án", width: 130 },
    { field: "projectName", headerName: "Tên dự án", width: 200 },
    { field: "nameType", headerName: "Loại dự án", width: 130 },
    { field: "name", headerName: "Chủ sở hữu dự án", width: 200 },
    {
      field: "startDate",
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
    { field: "projectLocation", headerName: "Địa điểm xây dựng", width: 130 },
    { field: "unit", headerName: "Đơn vị tính", width: 90 },
    { field: "quantity", headerName: "Diện tích", width: 90 },
    { field: "ccy", headerName: "ĐV Tiền", width: 90 },
    { field: "budget", headerName: "Tổng giá trị đầu tư", width: 150 },
    {
      field: "recentValue",
      headerName: "Giá trị định giá gần nhất",
      width: 150,
    },
    { field: "legalRecord", headerName: "Hồ sơ pháp lý", width: 150 },
    { field: "description", headerName: "Mô tả", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 90 },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    getAllProject();
  }, [flag]);
  const getAllProject = async () => {
    try {
      const result = await privateAxios.get("api/project/list");
      setDataRender(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const [project,setProject] = useState({
    id: null,
    projectTypeId: null,
    projectOwnerId: null,
    projectName: "",
    startDate: "",
    endDate: "",
    budget: null,
    description: "",
    status: "",
    projectOwner: null,
    disbursers: "",
    mangUser: "",
    inputedDate: null,
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
    projectLocation: "",
    legalRecord: "",
    recentValue: null,
    projectNo: "",
    ccy: "VND",
    quantity: null,
    unit: "ha"
  });
  const getTypeProject = async () => {
    try {
      const result = await privateAxios.get("api/type-project/list");
      setTypeProject(result.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const getProjectOwner = async () => {
    try {
      const result = await privateAxios.get("api/customers/list");
      setProjectOwner(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenNewProject = () => {
    handleOpen();
   getProjectOwner();
    getTypeProject();
  }
 
// Lưu dự án
const handleSaveProject = async () => {
  if(!window.confirm("Xác nhận lưu dự án")){
    return 
  }
  if( project.projectNo.indexOf(" ") !== -1 ||
  project.projectNo !== project.projectNo.toUpperCase()){
    return alert("Mã dự án chưa đúng định dạng")
  }
  if(project.projectNo==""||project.projectName==""||project.projectOwnerId==null||project.projectTypeId==null||project.quantity==null||project.budget==null || project.recentValue==null
    ||project.legalRecord==""||project.description==""||project.status==""){
        alert("Vui lòng điền đầy đủ thông tin đánh dấu *")
        return
    }
  try {
    const result = await privateAxios.post("api/project/create-one", project);
    showSnackbar(result.data.message, "success");
    
    handleClose();
    setFlag(!flag);
  } catch (error) {
    showSnackbar(error.response.data, "error");
  }
}

  const handleEditProject = async () => {
    const result= await privateAxios.get("api/project/get-one?id="+checkBoxRow[0]);
    setProject(result.data);
    handleOpen();
  }

  const handleSaveEdit = async () => {
    if(!window.confirm("Xác nhận lưu dự án")){
      return 
    }
   if(project.startDate!== null&&project.endDate!== null){
    project.startDate=dayjs(project.startDate.toString(),"MM/DD/YYYY");
    project.endDate=dayjs(project.endDate.toString(),"MM/DD/YYYY");
   }
    try {
      const result = await privateAxios.patch("api/project/update-one", project);
      showSnackbar(result.data.message, "success");
      handleClose();
      setFlag(!flag);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Xác nhận xóa dự án")) {
      return;
    }
    try {
      const result = await privateAxios.post("api/project/delete", checkBoxRow);
      showSnackbar(result.data.message, "success");
      setFlag(!flag);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }

  // EXCEL
  const columnsExcel = [ "projectNo", "projectName", "projectType", "startDate", "endDate", "projectLocation", "unit", "quantity", "ccy", "budget", "recentValue", "name", "legalRecord", "description", "status" ]
  const headersExport=["Mã dự án","Tên dự án","Loại dự án","Ngày bắt đầu","Ngày kết thúc","Địa điểm xây dựng","Đơn vị tính","Diện tích","ĐV Tiền","Tổng giá trị đầu tư","Giá trị định giá gần nhất","Chủ sở hữu dự án","Hồ sơ pháp lý","Mô tả","Trạng thái"]
  const handeleSaveExel = async (dataExcel) => {
    if (!confirm("Xác nhận lưu dữ liệu")) {
      return;
    }
    console.log(dataExcel)
    try {
      const response = await privateAxios.post(
        `api/project/excel-import?mangUser=${loginData.loginName}&inputedUser=${loginData.loginName}`,dataExcel);
      showSnackbar(response.data.message, "success");
      setFlag(!flag);
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
      setTimeout(() => {
      setCallData(!callData);
      }, 1000*2.1);
    }
  }
  return (
    <div>
      <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full "> Dự án</p>
      </div>
      <div className="flex gap-2 items-center">
        {checkBoxRow.length == 0 ? (
          <Button
            variant="success"
            style={{ boxShadow: "none" }}
            onClick={handleOpenNewProject}
          >
            <i className="fa-solid fa-folder-plus"></i> Tạo Mới
          </Button>
        ) : (
          <Button
            variant="warning"
            style={{ display: checkBoxRow.length == 1 ? "block" : "none" }}
            onClick={handleEditProject}
          >
            {" "}
            <i class="fa-solid fa-pen-to-square" ></i> Chỉnh sửa
          </Button>
        )}
        <Button
          variant="danger"
          style={{ display: checkBoxRow.length > 0 ? "block" : "none" }}
          onClick={handleDelete}
        >
          {" "}
          <i className="fa-solid fa-trash"></i> Xóa bỏ
        </Button>
        <div
          className="flex gap-2 items-center"
          style={{ visibility: checkBoxRow.length > 0 ? "hidden" : "visible" }}
        >
          {/* Excel */}
          <div>
              <ButtonImportExcel columnsForExcel={columnsExcel} saveExcel={handeleSaveExel}/>
          </div>
          <ExportExcel columnsForExcel={columnsExcel} datatExcel={dataRender} excelName="Dự án" headersExport={headersExport}/>
          <ExportTempalet nameFile="Dự_Án"/>
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
          Danh Sách Dự Án
        </p>
      </div>
      <div>
        <Paper sx={{ height: "700px", width: "100%" }}>
          <DataGrid
            rows={dataRender}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            selectionModel={checkBoxRow}
            onRowSelectionModelChange={(row) => setCheckBoxRow(row)} // Truyền mảng các id của các hàng đã chọn
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {checkBoxRow.length == 1 ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                label={
                  <span>
                    Mã dự án <span style={{ color: "red" }}>*</span>
                  </span>
                }
                value={project.projectNo}
                onChange={(e) => setProject({ ...project, projectNo: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
              <p className="text-red-500 italic ml-3">
                *Viết hoa không chứa khoảng trống
              </p>
              <TextField
                label={
                  <span>
                    Tên dự án <span style={{ color: "red" }}>*</span>
                  </span>
                }
                value={project.projectName}
                onChange={(e) => setProject({ ...project, projectName: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
              {checkBoxRow.length == 1 ?
                <p className="mt-4 ml-3">Loại Dự án : <span className="font-bold">{dataRender.filter((item) => item.id == checkBoxRow[0])[0]?.typeDesc}</span></p>
                :
              <FormControl fullWidth style={{ margin: "20px 10px 0px " }}>
                <InputLabel id="demo-simple-select-label">
                  Loại dự án <span className="text-red-500">*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Loại dự án *"
                  value={project.projectTypeId}
                  onChange={(e) => setProject({ ...project, projectTypeId: e.target.value })}
                >
                  {typeProject?.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              }
              {checkBoxRow.length == 1 ?
                <p className="mt-4 ml-3">Chủ sở hữu dự án : <span className="font-bold">{dataRender.filter((item) => item.id == checkBoxRow[0])[0]?.name}</span></p>
                :
                <FormControl fullWidth style={{ margin: "20px 10px 0px " }}>
                <InputLabel id="demo-simple-select-label">
                 Chủ sở hữu <span className="text-red-500">*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Chủ sở hữu dự án *"
                  value={project.projectOwnerId}
                  onChange={(e) => setProject({ ...project, projectOwnerId: e.target.value })}
                >
                  {projectOwner?.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              }
             <div className="flex justify-between ml-3 mt-3 mb-4">
             <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <DemoContainer components={["DatePicker"]} >
                  <DatePicker label="Ngày bắt đầu"
                   value={ project.startDate ? dayjs(String(project.startDate)) : null}
                onChange={(value) =>
                  setProject((prev) => ({
                    ...prev,
                    startDate: value ? value.format("MM/DD/YYYY") : null,
                  }))}
                  /> 
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <DemoContainer components={["DatePicker"]} >
                  <DatePicker label="Ngày kết thúc" 
                disabled={!project.startDate}
                minDate={dayjs(project.startDate,"MM/DD/YYYY")}
                value={ project.endDate ? dayjs(String(project.endDate)) : null}
                   onChange={(value) =>{
                    setProject((prev) => ({
                      ...prev,
                      endDate: value.format("MM/DD/YYYY"),
                    }))
                  }}
                 />
                </DemoContainer>
              </LocalizationProvider>
             </div>
             <TextField
                label={
                  <span>
                   Địa điểm xây dựng 
                  </span>
                }
                value={project.projectLocation}
                onChange={(e) => setProject({ ...project, projectLocation: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
              <div>
              <TextField
                label={
                  <span>
                   Diện tích dự án <span className="text-red-500">*</span>
                  </span>
                }
                value={project.quantity}
                onChange={(e) => setProject({ ...project, quantity: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "60%" }}
              />
               <TextField
                label={
                  <span>
                    Đơn vị tính 
                  </span>
                }
                value={project.unit}
                onChange={(e) => setProject({ ...project, unit: e.target.value })}
                defaultValue={"ha"}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "30%" }}
              />
              </div>
              <TextField
                label={
                  <span>
                   Đơn vị tiền tệ
                  </span>
                }
                value={project.ccy}
                onChange={(e) => setProject({ ...project, ccy: e.target.value })}
                defaultValue={"VND"}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "30%" }}
              />
                <TextField
                label={
                  <span>
               Tổng giá trị đầu tư <span className="text-red-500">*</span>
                  </span>
                }
              value={project.budget}
                onChange={(e) => setProject({ ...project, budget: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
               <TextField
                label={
                  <span>
              Giá trị định giá gần nhất <span className="text-red-500">*</span>
                  </span>
                }
              value={project.recentValue}
              onChange={(e) => setProject({ ...project, recentValue: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
                <TextField
                label={
                  <span>
              Hồ sơ pháp lý <span className="text-red-500">*</span>
                  </span>
                }
              value={project.legalRecord}
              onChange={(e) => setProject({ ...project, legalRecord: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
                <TextField
                label={
                  <span>
              Mô tả <span className="text-red-500">*</span>
                  </span>
                }
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
                multiline
                maxRows={4}
                style={{ margin: "10px", width: "100%" }}
              />
              <FormControl fullWidth style={{ margin: "20px 10px 0px " }}>
                <InputLabel id="demo-simple-select-label">
                 Trạng thái <span className="text-red-500">*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Trạng thái *"
                  value={project.status}
                  onChange={(e) => setProject({ ...project, status: e.target.value })}
                >
                    <MenuItem value={"Chưa bán hàng"}>Chưa bán hàng</MenuItem>
                    <MenuItem value={"Đã bán hàng xong"}>Đã bán hàng xong</MenuItem>
                    <MenuItem value={"Đang bán hàng"}>Đang bán hàng</MenuItem>
                    <MenuItem value={"Đang thi công"}>Đang thi công</MenuItem>
                    <MenuItem value={"Đang hoàn thiện thủ tục pháp lý"}>Đang hoàn thiện thủ tục pháp lý</MenuItem>
                </Select>
              </FormControl>
              <div className="ml-[200px] mt-4">
              {checkBoxRow.length ===1?
                <Button variant="warning" onClick={handleSaveEdit}><span>
                <i class="fa-solid fa-pen-to-square"></i>
              </span>{" "}
              Chỉnh sửa</Button>
                :<Button variant="success" onClick={handleSaveProject}> <span>
                <i class="fa-solid fa-plus"></i>
              </span>{" "}
              Thêm Mới</Button>
              }
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
