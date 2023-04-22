import { useState } from "react";
import {
    Tabs,
    Tab,
    Box
} from "@mui/material";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default () => {
    const [index, setIndex] = useState(0);

    const tabs = [
        <SignUp />,
        <LogIn />
    ];

    return (
        <Box>
            <Tabs
                value={index}
                onChange={(_, newIndex) => setIndex(newIndex)}
                centered
                variant="fullWidth"
            >
                <Tab label="Crea una cuenta"></Tab>
                <Tab label="Inicia sesión"></Tab>
            </Tabs>

            {tabs[index]}
        </Box>
    );
};