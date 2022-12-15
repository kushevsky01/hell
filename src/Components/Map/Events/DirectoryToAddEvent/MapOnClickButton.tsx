import styles from "../../Map.module.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import React, {useState} from "react";
import {Alert} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlaceMarkToAddEvent from "./PlaceMarkToAddEvent";

type Props = {
    adressToAdd: any,
    inputValue: string,
    openAdd: boolean,
    handleClose: () => void,
    handleOpen: () => void,
    cityName: any,
    addressCoord: any,
    getEvents: () => void,
}
const MapOnClickButton = ({
                              adressToAdd,
                              addressCoord,
                              inputValue,
                              openAdd,
                              handleOpen,
                              handleClose,
                              cityName,
                              getEvents
                          }: Props) => {

    const [snakBar, setSnakBar] = useState(false);

    const handleOpenSnakBar = () => {
        setSnakBar(true)
    }

    const handleCloseSnakBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakBar(false);
    }
    return (
        <div>
            <IconButton
                className={styles.button}
            >
                {openAdd ? <CloseIcon sx={{color: 'white', fontSize: 40}} onClick={handleClose}/> :
                    <AddIcon sx={{color: 'white', fontSize: 40}} onClick={() => {
                        handleOpen();
                        handleOpenSnakBar();
                    }}/>}
                <Snackbar
                    open={snakBar}
                    autoHideDuration={5000}
                    onClose={handleCloseSnakBar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }
                    }
                >
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="inherit" sx={{color: 'white'}}/>}
                        sx={{width: '100%', color: 'white', backgroundColor: '#ED2324'}}>
                        Для добавления мероприятия сначала поставьте маркер на карте, для этого прото нажмите на
                        ее облать
                    </Alert>
                </Snackbar>
            </IconButton>
            <PlaceMarkToAddEvent
                adressToAdd={adressToAdd}
                addressCoord={addressCoord}
                inputValue={inputValue}
                openAdd={openAdd}
                handleClose={handleClose}
                cityName={cityName}
                getEvents={getEvents}
            />
        </div>
    )
}
export default MapOnClickButton