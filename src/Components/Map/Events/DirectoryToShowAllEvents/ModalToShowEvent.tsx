import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IEvent} from "../../../Models/modelEvent";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {List, ListItem, ListItemAvatar, ListItemText, ListSubheader, TextField} from "@mui/material";
import moment from "moment";


const styleBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

type props = {
    eventToShow: IEvent,
    openPlacemark: boolean,
    handleClosePlacemark: () => void,
}

const ModalToShowEvent = ({eventToShow, openPlacemark, handleClosePlacemark}: props) => {

    return (
        <div>
            <Modal
                open={openPlacemark}
                onClose={handleClosePlacemark}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <Box sx={styleBox}>
                        <Box sx={{display: 'flex', flexGrow: 1}}>
                            <Box sx={{display: {md: 'flex'}}}>
                                <Card sx={{maxWidth: 445, width:445, maxHeight: 600, height: 600, overflow: 'auto'}}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                                K
                                            </Avatar>
                                        }
                                        action={
                                            <div>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteBorderIcon/>
                                                </IconButton>
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon/>
                                                </IconButton>

                                            </div>
                                        }
                                        title={eventToShow.title}
                                        subheader={moment(eventToShow.date).format('DD-MM-YYYY HH:mm ')}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image="https://upload.wikimedia.org/wikipedia/commons/7/72/Yandex_Maps_icon.svg"
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" color="text.secondary">
                                            Описание:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {eventToShow.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{width: 445, height: 600, maxHeight: 600}}>
                                <List
                                    sx={{maxWidth: 445, maxHeight: 530, overflow: 'auto'}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Комментарии:
                                        </ListSubheader>
                                    }>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Summer BBQ"
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    to Scott, Alex, Jennifer
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </List>
                                <Box sx={{width:440, display: 'flex', alignItems: 'flex-end', ml: 0.5,position:'fixed', bottom: 6}}>
                                    <TextField fullWidth id="input-with-sx" label="Комментировать" variant="filled"/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Modal>
        </div>
    )
}
export default ModalToShowEvent