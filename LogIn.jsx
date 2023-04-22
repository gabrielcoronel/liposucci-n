import { TextField, Button, Box } from "@mui/material";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useMutation } from "react-query";

const logIn = async (credentials) => {
    const url = "http://localhost:8080/authentication/logIn";
    const response = await axios.post(url, credentials);
    const data = response.data;

    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);

    return data;
};

export default () => {
    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        }
    });

    const mutation = useMutation(logIn);

    const handleSubmit = async (values) => {
        mutation.mutate(values);
        form.reset();
    }

    return (
        <Box sx={formLayout}>
            <TextField
                label="Nombre de usuario"
                type="text"
                {...form.getInputProps("username")}
            />

            <TextField
                label="Contraseña"
                type="password"
                {...form.getInputProps("password")}
            />

            <Button
                variant="text"
                onClick={form.onSubmit((values) => handleSubmit(values))}
            >
                Iniciar sesión
            </Button>
        </Box>
    );
};