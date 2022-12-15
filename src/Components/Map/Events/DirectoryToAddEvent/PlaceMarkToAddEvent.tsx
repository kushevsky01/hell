import styles from "../../Map.module.css";
import React, {useState} from "react";
import {Placemark} from "react-yandex-maps";
import {Popover} from "@mui/material";
import Typography from "@mui/material/Typography";
import '../../style_suggest.css'
import {IEvent} from "../../../Models/modelEvent";
import ModalToAddEvent from "./ModalToAddEvent";
import {IErrorToAdd} from "../../../Models/modelErrorsToAddEvent";

type props = {
    openAdd: boolean,
    inputValue: string,
    adressToAdd: any,
    handleClose: () => void,
    cityName: any,
    addressCoord: any,
    getEvents: () => void
}
const PlaceMarkToAddEvent = ({
                                 addressCoord,
                                 openAdd,
                                 inputValue,
                                 adressToAdd,
                                 handleClose,
                                 cityName,
                                 getEvents
                             }: props) => {

    const [error, setError] = useState<IErrorToAdd>({
        titleMessage: '',
        dateMessage: '',
    })

    const changeErrorTitle = () => {
        setError({
            ...error,
            titleMessage: 'Введите название мероприятия'
        })
    }

    const changeErrorDate = () => {
        setError({
            ...error,
            dateMessage: 'Некорректная дата'
        })
    }

    const Errors = () => {
        let haveErrors = false
        if (eventToAdd.title.length === 0) {
            changeErrorTitle()
            haveErrors = true
        }
        if (!(error.dateMessage.length === 0)) {
            haveErrors = true
        }
        return haveErrors
    }
    const [eventToAdd, setEventToAdd] = useState<IEvent>({
        title: '',
        rating: 0,
        description: '',
        date: new Date(),
        latitude: 0,
        longitude: 0,
        cityName: ''
    })

    const changeDateEvent = (value: any) => {
        setEventToAdd({
            ...eventToAdd,
            date: value
        })
    }
    const changEventToDefault = () => {
        setEventToAdd({
            title: '',
            rating: 0,
            description: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            date: new Date(),
        })
    }
    const handleChange = (event: any) => {
        const value = event.target.value;
        let name = event.target.name;
        setEventToAdd({
            ...eventToAdd,
            [name]: value
        });
        if (!(eventToAdd.title.length === 0)) {
            setError({
                ...error,
                titleMessage: ''
            })
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        let lat: any;
        let lon: any;
        let city: any;
        lat = Object.getOwnPropertyDescriptor(adressToAdd, "0")
        lon = Object.getOwnPropertyDescriptor(adressToAdd, "1")
        city = Object.getOwnPropertyDescriptor(cityName, "0")
        eventToAdd.latitude = lat.value
        eventToAdd.longitude = lon.value
        eventToAdd.cityName = city.value

        if (!Errors()) {
            await fetch('/events', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventToAdd),
            })
            changEventToDefault();
            handleCloseModal();
            handleClose();
            setError({
                titleMessage: '',
                dateMessage: ''
            })
        }
        getEvents();
    }

    const [add, setAdd] = useState(false);
    const handleClickAdd = () => {
        setAdd(true);
    };
    const handleCloseAdd = () => {
        setAdd(false);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        handleCloseAdd();
        changEventToDefault();
        setError({
            titleMessage: '',
            dateMessage: ''
        })
    }

    return (
        <div>
            {openAdd &&
                (
                    addressCoord &&
                    <div>
                        <div>
                            <Placemark
                                onClick={handleClickAdd}
                                geometry={addressCoord}
                            />
                            <Popover
                                open={add}
                                onClose={handleCloseAdd}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                sx={{textAlign: 'center'}}
                            >
                                <Typography sx={{p: 2}}>Добавить мероприятие по адресу
                                    :<br/> {inputValue} ?</Typography>
                                <button className={styles.buttonAdd} onClick={handleOpenModal}> добавить</button>
                            </Popover>
                            <ModalToAddEvent
                                handleCloseModal={handleCloseModal}
                                openModal={openModal}
                                handleSubmit={handleSubmit}
                                eventToAdd={eventToAdd}
                                handleChange={handleChange}
                                changeDateEvent={changeDateEvent}
                                error={error}
                                changeErrorDate={changeErrorDate}
                            />
                        </div>
                    </div>
                )}
        </div>
    )
}
export default PlaceMarkToAddEvent;