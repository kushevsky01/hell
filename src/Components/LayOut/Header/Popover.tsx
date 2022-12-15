import {FC} from "react";
import styles from "../lauot.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {Button, InputBase, Popover, Tooltip} from "@mui/material";
import * as React from "react";
import {PinDrop} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const Searchm = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: '5%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapperm = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100ch',
        },
    },
}));

const Popovers: FC = () => {

    const [geolocationToSearch, setGeolocationToSearch] = React.useState<null | HTMLElement>(null);

    const handleGeolocationToSearchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setGeolocationToSearch(event.currentTarget);
    };

    const handleGeolocationToSearchClose = () => {
        setGeolocationToSearch(null);
    };

    const openSearhToGeo = Boolean(geolocationToSearch);

    const id = openSearhToGeo ? 'simple-popover' : undefined;

    return (<div>

            <Tooltip title="Location">
                <IconButton onClick={handleGeolocationToSearchOpen} sx={{p: 2}} edge="end">
                    <PinDrop sx={{fontSize: 35}}/>
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={openSearhToGeo}
                className={styles.popover_class}
                anchorEl={geolocationToSearch}
                onClose={handleGeolocationToSearchClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style:{
                        borderRadius: '25px 0 25px 25px',
                    }
                }}

            >
                <Typography
                    sx={{marginTop: '10%', lineHeight: '1.5'}}
                    textAlign='center'>
                    Уточните ваше метоположение и мы отобразим те мероприятия, которые находятся рядом с
                    вами.
                </Typography>

                <Searchm>
                    <Box sx={{display: 'flex', marginBottom: 3, marginRight:2}}>
                        <SearchIconWrapperm>
                            <SearchIcon/>
                        </SearchIconWrapperm>
                        <StyledInputBase
                            placeholder="Поиск местоположения..."
                            inputProps={{'aria-label': 'search'}}
                            sx={{width: '90%', border: 0.5}}
                        />
                        <Button className={styles.buttonSearch}>
                            Поиск
                        </Button>
                    </Box>
                </Searchm>
            </Popover>

        </div>
    )
}
export default Popovers;