import React, {createRef, useEffect, useState} from "react";
import {
    AnyObject,
    GeolocationControl,
    Map,
    YMaps, YMapsApi, ZoomControl
} from "react-yandex-maps";

import 'dayjs/locale/ru';
import styles from './Map.module.css'
import './style_suggest.css'
import MapOnClickButton from "./Events/DirectoryToAddEvent/MapOnClickButton"
import ShowEvets from "./Events/DirectoryToShowAllEvents/ShowEvets";
import {IEvent} from "../Models/modelEvent";

const mapState = {
    center: [59.220501, 39.891523],
    zoom: 14,
    controls: []
};

const ProjectMap = () => {
    const inputRef = createRef<HTMLInputElement>();
    const [addressCoord, setAddressCoord] = useState();
    const [adressToAdd, setAdressToAdd] = useState()
    const [inputValue, setInputValue] = useState("");
    const [savedYmaps, setSavedYmaps] = useState<YMapsApi>();
    const [isHideYandexInput, setIsHideYandexInput] = useState(false);
    const [centerCoord, setCenterCoord] = useState()
    const [cityName, setCityName] = useState()
    const [zoom, setZoom] = useState(10)
    const [listEvents, setListEvents] = useState<IEvent[]>([])

    useEffect(() => {
        getEvents()
    }, [setListEvents])

    const getEvents = async () => {
        const response = await fetch('/events');
        let events = await response.json()
        setListEvents(events)
    }

    const changeCenterCoordinat = (value: any) => {
        setCenterCoord(value)
    }

    const [openAdd, setOpenAdd] = React.useState(false);

    const handleOpen = () =>
        setOpenAdd(true)

    const handleClose = () => {
        setOpenAdd(false);
        addressCoord && changeCenterCoordinat(addressCoord);
        changeAddressCoord(undefined)
        changeInputValue("")
    }

    const changeInputValue = (e: string) => {
        setInputValue(e)
    }

    const changeAddressCoord = (value: any) => {
        setAddressCoord(value);
    }
    const changeInputVisible = (value: boolean) => {
        setIsHideYandexInput(value)
    }

    const onClickAddress = (e: any, ymaps: YMapsApi) => {
        const name = e.get("item").value;
        changeInputValue(name);
        ymaps.geocode(name).then((result: AnyObject) => {
            const coord = result.geoObjects.get(0).geometry.getCoordinates();
            setAdressToAdd(coord)
            changeAddressCoord(coord)
        });
    };

    const onYmapsLoad = (ymaps: YMapsApi) => {
        setSavedYmaps(ymaps);
        const suggestView = new ymaps.SuggestView(inputRef.current);
        suggestView.events.add("select", (e: any) => {
            return onClickAddress(e, ymaps);
        });
    };
    const onClickToMap = async (e: any) => {
        const coords = e.get("coords");
        changeAddressCoord(coords)
        if (savedYmaps === undefined) {
            throw Error();
        }
        const result = await savedYmaps.geocode(coords);
        const firstGeoObject = result.geoObjects.get(0);
        setCityName(firstGeoObject.getLocalities())
        const coord = await savedYmaps.geocode(firstGeoObject.getAddressLine())
        setAdressToAdd(coord.geoObjects.get(0).geometry.getCoordinates())
        changeInputValue(firstGeoObject.getAddressLine());
        changeInputVisible(true);
    };

    return (
        <div>
            <YMaps
                query={{
                    load: "package.search",
                    apikey: "3087b00a-99a1-4ee4-b2a3-a4fbb65258e3"
                }}
                style={styles}
            >
                <Map
                    modules={['geocode', "clusterer.addon.balloon"]}
                    state={
                        (addressCoord ? {...mapState, center: addressCoord} : (centerCoord ? {
                            ...mapState,
                            center: centerCoord
                        } : mapState))
                    }
                    options={{
                        yandexMapDisablePoiInteractivity: true,
                        maxAnimationZoomDifference: 20,
                        maxZoom: 18,
                        minZoom: 7,
                        suppressObsoleteBrowserNotifier: true,
                    }
                    }
                    onLoad={onYmapsLoad}
                    width="100%"
                    height='82vh'
                    onClick={openAdd && onClickToMap}
                    zoom={zoom}
                    onBoundsChange={(event: any) => setZoom(event.originalEvent.newZoom)}
                >
                    <div
                        className={
                            isHideYandexInput
                                ? "input__wrapper_hide-dropdown"
                                : "input__wrapper_show-dropdown"
                        }
                    >
                        <input
                            className={styles.input}
                            style={{visibility: openAdd ? "visible" : "hidden"}}
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => changeInputValue(e.target.value)}
                            placeholder="Место на карте"
                            onFocus={() => changeInputVisible(false)}
                        />
                    </div>

                    <MapOnClickButton
                        adressToAdd={adressToAdd}
                        addressCoord={addressCoord}
                        inputValue={inputValue}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                        openAdd={openAdd}
                        cityName={cityName}
                        getEvents={getEvents}
                    />
                    <ShowEvets
                        zoom={zoom}
                        listEvents={listEvents}
                    />
                    <GeolocationControl
                        options={{
                            position: {
                                right: "10px",
                                top: "350px",
                            }
                        }}
                    >
                    </GeolocationControl>
                    <ZoomControl options={{
                        position: {
                            right: "10px",
                            top: "100px"
                        }
                    }}/>
                </Map>
            </YMaps>
        </div>
    )
}

export default ProjectMap;