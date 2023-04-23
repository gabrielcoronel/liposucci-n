import {
    Typography,
    List,
    Card,
    CardMedia,
    CardAction,
    IconButton,
    CircularProgress
} from "@mui/material";
import { Delete, Cart } from "@mui/icons-material";
import axios from "axios";
import { useQuery, useMutation } from "react-query";


const comprar = (id) => {
    const promise = axios.post("http://localhost:8080/api/sneakersComprar", {
        id
    });

    return promise;
};

const borrar = (id) => {
    const promise = axios.delete("http://localhost:8080/api/sneakersEliminar", {
        id
    });

    return promise;
};

const apiArticulos = async () => {
    const response = await axios.get("http://localhost:8080/api/games");
    const data = response.data;

    return data;
};

const ArticuloComponente = ({ articulo }) => {
    const id = articulo._id;
    const { imagen, modelo, colorway, talla } = articulo;
    const borrarMutation = useMutation(borrar);
    const comprarMutation = useMutation(comprar);

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={imagen}
            />

            <CardContent>
                <Typography variante="h5">
                    {modelo} {colorway} ({talla}US)
                </Typography>

                <Typography variante="subtitle">
                    {precio}$
                </Typography>
            </CardContent>

            <CardAction>
                <IconButton
                    variant="outlined"
                    onClick={() => comprarMutation.mutate(id)}
                >
                    <Cart />
                </IconButton>

                <IconButton
                    variant="outlined"
                    onClick={() => borrarMutation.mutate(id)}
                >
                    <Delete />
                </IconButton>
            </CardAction>
        </Card>
    );
};

const ListaArticulos = () => {
    const query = useQuery("allItems", apiArticulos);

    if (query.isLoading) {
        return <CircularProgress />;
    }

    const articulosHtml = query.data
        .map((articulo, i) => <ArticuloComponente key={i} game={articulo} />)

    return (
        <List>
            {articulosHtml}
        </List>
    );
};

export default ListaArticulos;