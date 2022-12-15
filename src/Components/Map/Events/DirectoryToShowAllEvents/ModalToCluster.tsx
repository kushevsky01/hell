import {CircularProgress, ListItem, ListItemText, ListSubheader, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from './ShowEvents.module.css';
import {IEvent} from "../../../Models/modelEvent";
import Divider from "@mui/material/Divider";
import moment from "moment";

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '450px',
    backgroundColor: '#fdfff5',
    overflowY: 'auto',
    border: 0,
};

type Props = {
    openModal: boolean;
    handleCloseModal: () => void,
    arr: IEvent[],
    loading: boolean
    handleOpenPlacemark: (e:IEvent) => void,
}

const ModalToCluster = ({openModal, handleCloseModal, arr, loading, handleOpenPlacemark}: Props) => {

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ListSubheader>
                        <Typography variant='h1' sx={{
                            textAlign: 'left',
                            fontSize: 40,
                            borderBottom: 2,
                            marginBottom: 1
                        }}>
                            Мероприятия
                        </Typography>
                    </ListSubheader>
                    {loading && <CircularProgress className={styles.loading}
                                                  sx={{color: 'grey.500', animationDuration: '550ms'}}/>}
                    {arr.map((event) => (
                        <div>
                            <ListItem button key={event.id} onClick={() => handleOpenPlacemark(event)}>
                                <ListItemText primary={event.title} secondary={moment(event.date).format('DD-MM-YYYY')}/>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </Box>
            </Modal>
        </div>
    )
}
export default ModalToCluster