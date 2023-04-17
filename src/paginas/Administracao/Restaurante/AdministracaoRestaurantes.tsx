import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';


const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/v2/restaurantes/")
            .then(res => setRestaurantes(res.data)
            ).catch(err => {
            console.log(err)
        })
    }, [])
    
    const excluir = (restauranteEx: IRestaurante ) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteEx.id}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteEx.id)
                setRestaurantes([...listaRestaurantes])
        })
}

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => 
                    <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}/`}>editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>Excluir</Button>    
                        </TableCell>
                    </TableRow>
                    )}    
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AdministracaoRestaurantes