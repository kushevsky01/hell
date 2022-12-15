import {useState} from "react";
import {IEvent} from "../../../Models/modelEvent";
import {AnyObject, Clusterer, Placemark} from "react-yandex-maps";
import ModalToCluster from "./ModalToCluster";
import ModalToShowEvent from "./ModalToShowEvent";

const MAX_ZOOM = 18;

type Props = {
    zoom: number,
    listEvents: IEvent[],
}

const ShowEvets = ({zoom, listEvents}: Props) => {

    const [arr, setArr] = useState<IEvent[]>([])
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [eventToShow, setEventToSHow] = useState<IEvent>({
        title: '',
        rating: 0,
        description: '',
        latitude: 0,
        longitude: 0,
        cityName: '',
        date: new Date(),
    });

    const [openPlacemark, setOpenPlacemark] = useState(false);
    const handleOpenPlacemark = (event:IEvent) => {
        setOpenPlacemark(true);
        setEventToSHow(event)
    }
    const handleClosePlacemark = () => {
        setOpenPlacemark(false);
        setEventToSHow({
            title: '',
            rating: 0,
            description: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            date: new Date(),
        })
    }

    const handleOpenModal = () => {
            setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setArr([])
    }

    const getEventsByCoordinates = async (lat: number, long: number) => {
        const response = await fetch('/events/' + lat + '/' + long);
        let events = await response.json()
        setArr(events)
        setLoading(false)
    }

    const openEventList = (e: AnyObject) => {
        try {
            let coordsEvents = e.get('target').properties.get('geoObjects')[0].geometry.getCoordinates();
            if (zoom === MAX_ZOOM && !openPlacemark) {
                handleOpenModal()
                setLoading(true)
                getEventsByCoordinates(coordsEvents[0], coordsEvents[1])
            }
        } catch (Error){
            setOpenPlacemark(true)
        }
    }

    return (
        <div>
            <Clusterer
                options={{
                    preset: "islands#invertedRedClusterIcons",
                    groupByCoordinates: false,
                    hasBalloon: false,
                }}
                onClick={(e: AnyObject) => {
                    (openEventList(e));
                }}
            >
                {listEvents.map((event) => (
                    <Placemark
                        key={event.id}
                        geometry={[event.latitude, event.longitude]}
                        options={{
                            preset: "islands#redDotIcon",
                            hasBalloon: false,
                        }}
                        onClick={() => {
                            handleOpenPlacemark(event)
                        }}
                    />
                ))}
            </Clusterer>
            <ModalToCluster
                handleOpenPlacemark={handleOpenPlacemark}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                arr={arr}
                loading={loading}
            />

            <ModalToShowEvent
                eventToShow={eventToShow}
                openPlacemark={openPlacemark}
                handleClosePlacemark={handleClosePlacemark}
            />
        </div>
    )
}

export default ShowEvets;