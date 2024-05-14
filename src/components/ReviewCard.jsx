import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import {FormattedDate} from "react-intl";

const ReviewCard = (props) => {
  return (
    <div className="outline outline-1 outline-gray-200 rounded-md my-2">
      <div className="flex flex-col ml-3">
        <div className="flex gap-3 my-1">
          <div className="font-bold">{props.review?.name}</div>
          <Rating name="read-only" value={props.review?.rating} readOnly/>
          <div className="text-sm">
            <FormattedDate value={props.review?.created_at}
                           year="numeric"
                           month="long"
                           day="numeric"
                           hour="numeric"
                           minute="numeric"
            />
          </div>
        </div>
        <div>{props.review?.comment}</div>
        <hr/>
        <div className="flex my-1">
          <Button
            size="small"
          >
            Phản hồi
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;