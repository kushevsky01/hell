import {FC, PropsWithChildren} from "react";

import styles from './lauot.module.css'
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <Box sx={{
                width: '100%',
                height: '82vh'
            }}>
                {children}
            </Box>
            <Footer />
        </div>
    )
}
export default Layout;