import React, {useEffect, useState} from "react"
import Editor from "../../components/Editor/Editor"
import Viewer from "../../components/Editor/Viewer"
import "../../components/Editor/style.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Slide from '@mui/material/Slide';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import STAFF from "../../services/staffService";
import {serviceType, specialitiesL, staffRole} from "../../utils/constant";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const initialMarkdownContent = "**Empty**..."

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Create() {
  const [editorHtmlValue, setEditorHtmlValue] = useState("");
  const [description, setDescription] = useState(initialMarkdownContent);
  const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [file, setFile] = useState("");
  const [type, setType] = useState(serviceType.DOCTOR);
  const [speciality, setSpeciality] = useState(specialitiesL[0].id);
  const [chargeOf, setChargeOf] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filterDoctors,setFilterDoctors] = useState([]);

  const handleDoctorChange = (event) => {
    const selectedEmail = event.target.value;
    const selectedDoctor = doctors.find(doctor => doctor.email === selectedEmail);
    setChargeOf(selectedEmail);
    console.log(selectedDoctor);
    if (selectedDoctor) {
      if (type === serviceType.DOCTOR)
        setName(selectedDoctor.name);
      setSpeciality(selectedDoctor.speciality || specialitiesL[0].id);
    }
  };


  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditorContentChanged = content => {
    setEditorHtmlValue(content.html)
    setEditorMarkdownValue(content.markdown)
  }

  const handleSave = () => {
    setDescription(editorMarkdownValue);
    setOpen(false);
  }

  const handleCancel = () => {
    navigate("/service");
  }

  const handleSubmit = async () => {
    if (name === "" || editorMarkdownValue === "" || fee === "") {
      toast.error("Vui điền đầy đủ thông tin");
    } else {
      try {
        const res = await STAFF.createService({
          name,
          description,
          fee,
          file,
          type,
          speciality,
          chargeOf
        });
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Thêm thành công");
          navigate("/service");
        } else {
          toast.error(res.data.message);
        }
      } catch (e) {
        toast.error("Thêm thất bại, vui lòng thử lại sau");
      }
    }
  }

  const fetchData = async () => {
    try {
      const res = await STAFF.getDoctorList();
      if (res.status === 200) {
        setDoctors(res.data);
        setFilterDoctors(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    setFilterDoctors(doctors.filter(doctor => doctor.speciality === speciality));
  }, [speciality]);

  return (
    <div className="flex flex-col max-h-[75vh] overflow-y-auto">
      <h1 className={`text-3xl font-bold text-center`}>Thêm dịch vụ</h1>
      <div className={`flex flex-col items-start`}>
        <p className={`text-xl font-bold`}>Ảnh</p>
        <div className="relative w-full">
          <input
            type="file"
            hidden
            className={`absolute w-full opacity-0 h-32 flex  outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
            onChange={e => setFile(e.target.files[0])}
          />
          {file ? <img src={URL.createObjectURL(file)}
                       className={`h-32 w-auto object-cover rounded-lg outline-1`}/> :
            <div
              className={`h-32 w-full flex justify-center items-center rounded-lg outline-1 border-2 border-gray-200 p-2 hover:cursor-pointer hover:scale-105`}
            >
              <p>Click hoặc kéo thả ảnh vào đây</p>
            </div>
          }
        </div>
      </div>
      <div className={`flex flex-col items-start`}>
        <p className={`text-xl font-bold`}>Tên dịch vụ</p>
        <input
          className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
          type="text"
          placeholder="Tên dịch vụ"
          value={name}
          disabled={type === serviceType.DOCTOR}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={`flex flex-col items-start`}>
        <p className={`text-xl font-bold`}>Chi phí dịch vụ</p>
        <input
          className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
          type="text"
          placeholder="(VND)"
          value={fee}
          onChange={e => setFee(e.target.value)}
        />
      </div>
      <div className={`flex flex-col items-start`}>
        <FormControl
          variant="standard"
        >
          <InputLabel htmlFor="demo-simple-select-label1">Loại hình</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select"
            variant="standard"
            sx={{
              marginTop: 5,
              maxHeight: 300,
              width: 250,
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={serviceType.DOCTOR}>Bác sĩ</MenuItem>
            <MenuItem value={serviceType.PACKAGE}>Gói khám</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={`flex flex-col items-start`}>
        <FormControl
          variant="standard"
        >
          <InputLabel htmlFor="demo-simple-select-label2">Chuyên khoa</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select"
            variant="standard"
            sx={{
              marginTop: 5,
              width: 250,
            }}
            MenuProps={
              {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 250,
                  },
                },
              }
            }
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            {specialitiesL.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={`flex flex-col items-start`}>
        <FormControl
          variant="standard"
        >
          <InputLabel htmlFor="demo-simple-select-label3">Bác sĩ</InputLabel>
          <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select"
            variant="standard"
            sx={{
              marginTop: 5,
              maxHeight: 300,
              width: 250,
            }}
            MenuProps={
              {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 250,
                  },
                },
              }
            }
            value={chargeOf}
            onChange={handleDoctorChange}
          >
            {filterDoctors.length > 0 && filterDoctors.map((item, index) => (
              <MenuItem key={index} value={item.email}>{item.name}<span className="font-mono">-{item.email}</span></MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={`flex items-center h-12 w-full justify-between`}>
        <p className={`text-xl font-bold text-center`}>
          Mô tả
        </p>
        <div className={`flex ml-2 mt-1 justify-end`}>
          <Button
            variant="outlined"
            startIcon={<EditNoteIcon/>}
            // size="small"
            color="primary"
            onClick={handleClickOpen}>
            Edit
          </Button>
        </div>
      </div>
      <div className="viewer max-h-[300px] rounded-lg">
        <Viewer value={description}/>
      </div>
      <div className={`flex items-center h-12 w-full justify-between`}>
        <Button variant="outlined" onClick={handleCancel} color="primary">Hủy</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">Thêm</Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Chỉnh sửa
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <Editor
          value={editorMarkdownValue}
          onChange={onEditorContentChanged}
        />
      </Dialog>
    </div>
  )
}
