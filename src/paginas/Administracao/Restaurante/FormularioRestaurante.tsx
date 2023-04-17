import { TextField, Button } from '@mui/material'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
    
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
            .then(res => setNomeRestaurante(res.data.nome))
      }
    }, [params])
    

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmiterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (params.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                alert('Restaurante atualizado com sucesso!')
            })
        } else {
            axios.post("http://localhost:8000/api/v2/restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
        }

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