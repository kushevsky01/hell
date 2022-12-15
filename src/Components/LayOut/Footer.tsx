import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CopyrightOutlined, Mail} from "@mui/icons-material";
import Box from "@mui/material/Box";
import * as React from "react";

export default function Footer() {

    return <footer>
        <Container sx={{borderTop: 2, position: 'static'}}>
            <Box sx={{display: 'flex', flexGrow: 1}}>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <CopyrightOutlined sx={{mt: 1, mr: 0.5}}/>
                </Box>
                <Box>
                    <Typography
                        noWrap
                        component="div"
                        style={{color: "black"}}
                        sx={{display: {fontSize: 15}, mt: 1}}>
                        2022, Сервис поиска мероприятий. Все права защищены
                    </Typography>
                </Box>

                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Typography sx={{textAlign: 'button', mt: 1}}>
                        Сязаться с нами:
                    </Typography>
                </Box>
                <Box>
                    <Mail sx={{ml: 0.5}}/>

                </Box>

            </Box>

        </Container>

    </footer>
}