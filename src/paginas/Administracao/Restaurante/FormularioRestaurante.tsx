import { TextField, Button } from '@mui/material'; 
import { useState } from 'react';
import axios from 'axios';

const FormularioRestaurante = () => {
    
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmiterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/v2/restaurantes/", {
            nome: nomeRestaurante
        })
            .then(() => {
            alert('Restaurante cadastrado com sucesso!')
        })
    }

    return (
        <form onSubmit={aoSubmiterForm}>
            <TextField
                value={nomeRestaurante}
                onChange={(e) => {
                setNomeRestaurante(e.target.value);
                }}
                label="Nome do Restaurante"
                variant="standard" />
            <Button type="submit" variant="outlined">Cadastrar</Button>
        </form>
    )
}
export default FormularioRestaurante;