import { FC } from "react";
import { IComment } from "../../../../interfaces"
import { Timeline } from "@mui/lab";
import { CommentItem } from ".";
import { Box } from "@mui/material";
import { TypographyCustom } from "../../../custom";

interface Props {
    comments: IComment[];
}
export const CommentList: FC<Props> = ({ comments }) => {
    return (
        <Box sx={styles.mainContent}>
            <TypographyCustom variant='overline' _color='p'>Comentarios</TypographyCustom>
            <Timeline position={'right'}>
                {comments && comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
            </Timeline>
        </Box>

    )
}
const styles = {
    mainContent: {
        mt: 2,
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    }
}