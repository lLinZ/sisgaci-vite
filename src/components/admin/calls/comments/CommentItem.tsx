import { FC } from "react";
import { IComment } from "../../../../interfaces";
import { TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from "@mui/lab";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { TypographyCustom } from "../../../custom";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import { blue, pink } from "@mui/material/colors";
import PersonRounded from "@mui/icons-material/PersonRounded";

interface Props {
    comment: IComment;
}
export const CommentItem: FC<Props> = ({ comment }) => {
    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {moment(comment.created_at).format('DD-MM-YYYY HH:mm:ss')}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector />
                <Tooltip title={comment.author === 'SISGACI' ? 'Sistema Automatico' : 'Usuario'}>

                    <TimelineDot sx={{
                        background: comment.author === 'SISGACI' ? blue[500] : comment.user?.color
                    }}>
                        {comment.author === 'SISGACI' ? <SettingsRounded /> : <PersonRounded />}
                    </TimelineDot>
                </Tooltip>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <TypographyCustom fontSize={16} fontWeight={'bold'} variant="h6" component="span">
                    {comment.author}
                </TypographyCustom>
                <TypographyCustom variant="subtitle2" color='text.secondary' fontSize={12} component='span'>
                    {comment.author !== 'SISGACI' && ` (${comment.user?.phone})`}
                </TypographyCustom>
                <TypographyCustom fontSize={12}>{comment.description}</TypographyCustom>
            </TimelineContent>
        </TimelineItem>
    )
}
