import React, { useState } from "react"
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

const initialMarkdownContent = "**Empty**..."

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatNews() {
  const [editorHtmlValue, setEditorHtmlValue] = useState("");
  const [content, setContent] = useState(initialMarkdownContent);
  const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
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

  const handleSave = (content) => {
    setContent(editorMarkdownValue);
    setOpen(false);
  }

  const handleCancel = () => {
      navigate("/news");
  }

  const handleSubmit = async () => {
    if(title === "" || editorMarkdownValue === "") {
        toast.dismiss();
        toast.error("Vui điền tên bài viết và nội dung bài viết");
    }
    else {
        try {
            toast.dismiss();
            toast.loading("Đang tạo bài viết");
            const res = await STAFF.createGuide(title, content, file);
            if(res.status === 200) {
                toast.success("Tạo bài viết thành công");
                navigate("/news");
            } else {
                toast.error("Tạo bài viết thất bại, vui lòng thử lại sau");
            }
        }
        catch (e) {
            toast.error("Tạo bài viết thất bại, vui lòng thử lại sau");
        }
    }
  }

  return (
      <div className="flex flex-col max-h-[75vh]">
          <h1 className={`text-3xl font-bold text-center`}>Tạo bài viết</h1>
          <div className={`flex flex-col items-start`}>
              <p className={`text-xl font-bold`}>Bài viết mới</p>
              <input
                  className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                  type="text"
                  placeholder="Tên bài viết"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
              />
          </div>
          <div className={`flex flex-col items-start`}>
              <p className={`text-xl font-bold`}>Banner</p>
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
          <div className={`flex items-center h-12 w-full justify-between`}>
              <p className={`text-xl font-bold text-center`}>
                  Nội dung
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
          <div className="viewer max-h-[500px] overflow-auto rounded-lg">
              <Viewer value={content}/>
          </div>
          <div className={`flex items-center h-12 w-full justify-between`}>
              <Button variant="outlined" onClick={handleCancel} color="primary">Hủy</Button>
              <Button variant="contained" onClick={handleSubmit} color="primary">Tạo</Button>
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
