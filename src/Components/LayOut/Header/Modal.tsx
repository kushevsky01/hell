import {FC} from "react";
import styles from "../lauot.module.css";
import Box from "@mui/material/Box";
import {Button, InputBase, Modal, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {styled} from "@mui/material/styles";

const Searcha = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrappera = styled('div')(({theme}) => ({
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
            width: '100%',
        },
    },
}));

const Modals: FC = () => {

    const [search, setSearch] = React.useState(false);

    const handleSearchOpen = () => setSearch(true);

    const handleSearchClose = () => setSearch(false);

    return (
        <div>
            <Tooltip title='Search'>
                <IconButton onClick={handleSearchOpen} sx={{p: 2}}>
                    <SearchIcon sx={{fontSize: 35}}/>
                </IconButton>

            </Tooltip>
            <Modal
                open={search}
                onClose={handleSearchClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}>
                    <Searcha>
                        <Box sx={{display: 'flex', borderRadius:'3px'}}>
                            <SearchIconWrappera style={{color: "black"}}>
                                <SearchIcon style={{color: "black"}}/>
                            </SearchIconWrappera>
                            <StyledInputBase
                                placeholder="Search..."
                                inputProps={{'aria-label': 'search'}}
                                sx={{width: '100%'}}
                            />
                            <Button className={styles.buttonSearch1}>
                                Поиск
                            </Button>
                        </Box>
                    </Searcha>
                </Box>
            </Modal>

        </div>
    )
}
export default Modals;