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

const initialMarkdownContent = "**Empty**..."

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateGuide() {
  const [editorHtmlValue, setEditorHtmlValue] = useState("");
  const [htmlValue, setHtmlValue] = useState(initialMarkdownContent);
  const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");

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
    setHtmlValue(editorHtmlValue);
    setOpen(false);
  }

  return (
    <div className="flex flex-col max-h-[75vh]">
      <h1 className={`text-3xl font-bold text-center`}>Tạo bài viết</h1>
      <div className={`flex flex-col items-start`}>
        <p className={`text-xl font-bold`}>Tiêu đề bài viết</p>
        <input
          className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className={`flex items-center h-12 w-full justify-between`}>
        <p className={`text-xl font-bold text-center`}>
          Nội dung
        </p>
        <div className={`flex ml-2 mt-1 justify-end`}>
          <Button
            variant="outlined"
            startIcon={<EditNoteIcon />}
            // size="small"
            color="primary"
            onClick={handleClickOpen}>
            Edit
          </Button>
        </div>
      </div>
      <div className="viewer max-h-[500px] overflow-auto rounded-lg">
        <Viewer value={htmlValue} />
      </div>
      <div className={`flex items-center h-12 w-full justify-between`}>
        <Button variant="contained" color="primary">Cancel</Button>
        <Button variant="contained" color="primary">Save</Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
