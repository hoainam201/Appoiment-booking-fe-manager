import React from "react";
import StarIcon from "@mui/icons-material/Star";
import {Box} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearLoad(props) {

  return (
    <div className="flex justify-start items-center h-10 gap-1">
      <div className="flex ml-2 text-nowrap text-center items-center">
        {props.rating}{<StarIcon fontSize="small" color="info"/>}
      </div>
      <div className="w-40">
        <Box sx={{width: '100%'}}>
          <LinearProgress
            variant="determinate"
            style={{
              height: '10px',
              borderRadius: '10px',
            }}
            value={props.percent}/>
        </Box>
      </div>
      <div className="text-nowrap mr-2">{props.count} lượt</div>
    </div>
  )
}