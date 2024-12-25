import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { privateAxios } from '../../api/configapi';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useSnackbar } from '../../ultit/SnackbarProvider';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoaiDuAn() {
  const [dataRender,setDataRender] =useState([]);
  const [checkBoxRow, setCheckBoxRow] = useState([]);
  const [flag, setFlag] = useState(false);
  const {showSnackbar} = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setTypeProject({
      typeDesc: "",
    name: "",
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
    })
     setOpen(false)};

  const [typeProject, setTypeProject] = useState({
    typeDesc: "",
    name: "",
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
  }); 
  const columns = [
    { field: "id", headerName: "STT", width: 70 ,valueGetter: (params) => dataRender?.findIndex((e)=>e.id == params)+1},
    { field: "name", headerName: "Loại dự án", width: 300 },
    { field: "typeDesc", headerName: "Mô tả loại dự án", width: 300 },
  ]
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    getListTypeProject();
  },[flag]);

  const getListTypeProject = async () => {
    try {
      const result= await privateAxios.get("api/type-project/list");
      setDataRender(result.data);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }
 
  const createNewType = async () => {
    if(!window.confirm("Bạn có muốn thêm loại dự án mới ?")){
      handleClose();
      return
    }
    if(typeProject.name==""){
    return  alert("Vui lớng nhập đầy đủ thống tin")
    }
    if(typeProject.typeDesc==""){
      typeProject.typeDesc=typeProject.name
    }
    try {
      const result = await privateAxios.post("api/type-project/create", typeProject);
      showSnackbar(result.data, "success");
     setTimeout(() => {
      handleClose();
      setFlag(!flag);
     }, 2100);
  
    } catch (error) {
      console.log(error)
      showSnackbar(error.response.data, "error");
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Xác nhận xóa dự án")) {
      return;
    }
    try {
      const result = await privateAxios.post("api/type-project/delete", checkBoxRow);
      showSnackbar(result.data, "success");
      setFlag(!flag);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }

 const openEdit = () =>{
    const data = dataRender.find(e => e.id == checkBoxRow[0]);
    setTypeProject(data);
    handleOpen();
 }

 const handleEdit = async () => {
  if (!window.confirm("Cập nhật loại dự án này?")) {
    return;
  }
   try {
    const result = await privateAxios.patch("api/type-project/update-one", typeProject);
    showSnackbar(result.data.message, "success");
    handleClose();
    setFlag(!flag);
   } catch (error) {
    showSnackbar(error.response.data.message, "error");
   }
 }
  return (
    <div>
       <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full ">
          {" "}
          Loại dự án
        </p>
      </div>
      <div className="flex gap-2 items-center">
      <Button   style={{ display: checkBoxRow.length == 1 ? "none" : "block" }}  onClick={handleOpen} variant="success"><i className="fa-solid fa-folder-plus"></i> Tạo Mới</Button>
      <Button style={{ display: checkBoxRow.length == 1 ? "block" : "none" }} variant="warning" onClick={openEdit} >   <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa</Button>
      <Button style={{ display: checkBoxRow.length > 0 ? "block" : "none" }} variant="danger" onClick={handleDelete}><i className="fa-solid fa-trash" ></i> Xóa bỏ</Button>
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
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {checkBoxRow.length ==1 ? "Chỉnh sửa loại dự án" : "Tạo mới loại dự án"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
              value={typeProject.name}
              onChange={(e) =>
                setTypeProject((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              label={
                <span>
                  Loại dự án <span style={{ color: "red" }}>*</span>
                </span>
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
             <TextField
             value={typeProject.typeDesc}
             onChange={(e) =>
              setTypeProject((prev) => ({
                ...prev,
                typeDesc: e.target.value,
              }))
            }
              label={
                <span>
                 Mô tả 
                </span>
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           { checkBoxRow.length ==1 ?
            <Button style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="warning" onClick={handleEdit}>{" "} <i class="fa-solid fa-floppy-disk"></i> Sửa</Button>
            :
            <Button onClick={createNewType} style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="success">{" "} <i class="fa-solid fa-floppy-disk"></i> Lưu</Button>
           }
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
