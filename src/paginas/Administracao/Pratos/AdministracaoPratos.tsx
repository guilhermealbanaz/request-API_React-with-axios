import { useEffect, useState } from 'react';
import IPrato from "../../../interfaces/IPrato";
import { Link } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import http from '../../../http';


const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);
    
    useEffect(() => {
        http.get("pratos/")
            .then(res => setPratos(res.data)
            ).catch(err => {
            console.log(err)
        })
    }, [])
    
    const excluir = (pratoEx: IPrato ) => {
        http.delete(`pratos/${pratoEx.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoEx.id)
                setPratos([...listaPratos])
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
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato => 
                    <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            <a href={prato.imagem} target='_blank' rel='noreferrer'>ver imagem</a>
                        </TableCell>
                        <TableCell>
                                <Link to={`/admin/pratos/${prato.id}/`}>editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' color='error' onClick={() => excluir(prato)}>Excluir</Button>    
                        </TableCell>
                    </TableRow>
                    )}    
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AdministracaoPratos