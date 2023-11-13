import { Dispatch, useState, FormEvent } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { Loading, NoContentFound } from ".";
import { ucfirst } from "../../../helpers/functions";
import { TextFieldWithIconCustom } from "../../custom";

interface Props {
    records: any;
    setRecords: Dispatch<any>;
    title: string;
}
export const BusquedaYResultado = (props: Props) => {
    const [search, setSearch] = useState<string>('');
    const [originalValues] = useState<any[]>(props.records);

    function buscarObjeto(objetos: any[], busqueda: string) {
        return objetos.filter((objeto: any) => {
            for (let key in objeto) {
                if (
                    typeof objeto[key] === 'string' &&
                    (objeto[key].includes(busqueda) || objeto[key].includes(busqueda.toLowerCase()) || objeto[key].includes(ucfirst(busqueda.toLowerCase())) || objeto[key].includes(busqueda.toUpperCase()))
                ) {
                    return true;
                }
            }
            return false;
        });
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        const result: any[] = buscarObjeto(originalValues, search);
        if (result.length > 0) {
            setSearch('');
            props.setRecords(result);
        } else {
            Swal.fire({
                title: 'Oops...',
                text: 'No se encontraron resultados',
                icon: 'warning',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const handleReset = () => {
        setSearch('');
        props.setRecords(originalValues);
    };

    return (
        <>
            {props.records === 'loading' && <Loading />}
            {props.records !== 'loading' && props.records && (
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexFlow: 'column wrap',
                        width: '100%',
                    }}
                >
                    <form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
                        <TextFieldWithIconCustom
                            label={`Filtrar ${props.title}`}
                            value={search}
                            InputProps={{
                                startAdornment: (
                                    <IconButton onClick={handleReset}>
                                        <RestartAltRounded />
                                    </IconButton>
                                ),
                                endAdornment: (
                                    <IconButton type="submit">
                                        <SearchRounded sx={{ color: 'rgba(100,100,100)' }} />
                                    </IconButton>
                                ),
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                        ></TextFieldWithIconCustom>
                    </form>
                    {!props.records && (
                        <NoContentFound
                            title="No se encontraron pagos"
                            text="No hay pagos a tu nombre hasta el momento..."
                        />
                    )}
                </Box>
            )}
        </>
    );
}
