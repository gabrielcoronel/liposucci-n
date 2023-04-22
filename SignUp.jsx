import { TextField, Button, IconButton, Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useMutation } from "react-query";
import encodeFile from "../../utilities/encode-file";

const signUp = (account) => {
    const url = "http://localhost:8080/authentication/signUp";

    return axios.post(url, account);
};

export default () => {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            picture: ""
        },
    });
    const mutation = useMutation(signUp);

    const handleSubmit = async (values) => {
        mutation.mutate(values);
        form.reset();
    }

    const handlePictureChange = async (event) => {
        const file = event.target.files[0];

        const string = await encodeFile(file);

        form.setFormField("picture", string);
    };

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

            <IconButton variant="contained">
                <PhotoCamera />
                <input type="file" hidden onChange={handlePictureChange} />
            </IconButton>

            <Button
                variant="text"
                onClick={form.onSubmit((values) => handleSubmit(values))}
            >
                Crear cuenta
            </Button>
        </Box>
    );
};