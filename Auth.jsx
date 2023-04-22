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

    const layout = {
        width: "40%",
        paddingBottom: "1.5rem",
        border: "1px silver solid"
    };

    const tabs = [
        <SignUp
            setIsLoading={setIsLoading}
            setRequestError={setRequestError}
            setValidationError={setValidationError}
        />,
        <LogIn
            setIsLoading={setIsLoading}
            setRequestError={setRequestError}
            setValidationError={setValidationError}
        />
    ];

    return (
        <Box sx={layout}>
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