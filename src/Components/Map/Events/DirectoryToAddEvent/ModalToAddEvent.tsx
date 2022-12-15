import {Button, FormControl, Modal, TextField} from "@mui/material";

import {IEvent} from "../../../Models/modelEvent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../../Map.module.css";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {IErrorToAdd} from "../../../Models/modelErrorsToAddEvent";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '450px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type props = {
    handleSubmit: (event: any) => void,
    eventToAdd: IEvent,
    handleChange: (e: any) => void,
    handleCloseModal: () => void,
    openModal: boolean,
    changeDateEvent: (e: any) => void,
    error: IErrorToAdd,
    changeErrorDate: () => void,
}

const ModalToAddEvent = ({
                             openModal,
                             handleCloseModal,
                             handleSubmit,
                             handleChange,
                             eventToAdd,
                             changeDateEvent,
                             error,
                             changeErrorDate,
                         }: props) => {

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{textAlign: 'center'}}
        >
            <Box sx={style}>
                <Typography variant='h1' sx={{
                    textAlign: 'left',
                    fontSize: 40,
                    borderBottom: 2,
                    marginBottom: 4
                }}>
                    Создание мероприятия
                </Typography>
                <form onSubmit={handleSubmit}>

                    <Box sx={{display: 'flex', flexGrow: 1}}>
                        <Box sx={{width: '70%', display: {md: 'flex'}}}>
                            <FormControl className={styles.formControll} sx={{marginBottom: 3}}>
                                <TextField
                                    id="title"
                                    type="text"
                                    name="title"
                                    error={!(error.titleMessage.length === 0)}
                                    helperText={error.titleMessage}
                                    value={eventToAdd.title}
                                    onChange={handleChange}
                                    label="Название мероприятия"
                                    autoComplete="title"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{flexGrow: 1}}/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}
                                                      adapterLocale='ru'>
                                    <DateTimePicker
                                        label="Дата мероприятия"
                                        value={eventToAdd.date}
                                        onChange={(newValue) => changeDateEvent(newValue)}
                                        disablePast={true}
                                        components={{
                                            OpenPickerIcon: CalendarMonthIcon
                                        }}
                                        onError={(reason) => {
                                            if (reason) {
                                                changeErrorDate()
                                            } else {
                                                error.dateMessage = ''
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!(error.dateMessage.length === 0)}
                                                helperText={error.dateMessage}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                    </Box>


                    <FormControl className={styles.formControll}>
                        <TextField
                            id="description"
                            label="Описание"
                            multiline
                            fullWidth
                            rows={8}
                            type="text"
                            name="description"
                            value={eventToAdd.description}
                            onChange={handleChange}
                            sx={{marginBottom: 3}}
                        />
                    </FormControl>
                    <Button className={styles.buttonAdd}
                            sx={{fontSize: 20}}
                            type="submit"
                            onClick={
                                handleSubmit
                            }
                    > Сохранить </Button>
                </form>
            </Box>
        </Modal>
    )
}
export default ModalToAddEvent