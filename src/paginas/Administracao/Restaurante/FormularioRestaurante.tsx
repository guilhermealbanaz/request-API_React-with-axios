import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material'; 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';
import { Link as RouterLink } from 'react-router-dom';

const FormularioRestaurante = () => {
    
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
            .then(res => setNomeRestaurante(res.data.nome))
      }
    }, [params])
    

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmiterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                alert('Restaurante atualizado com sucesso!')
            })
        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
        }

    }

    return (
        <>

            <Box>
                <Container maxWidth='lg' sx={{mt: 1}}>
                    <Paper sx={{p: 2}}>
                    <Box sx={{display:'flex', flexDirection: "column", alignItems:"center", flexGrow: 1}}>
                        <Typography component='h1' variant='h6' >Formulário de Restaurantes</Typography>
                            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmiterForm} >
                                <TextField
                                value={nomeRestaurante}
                                onChange={(e) => {
                                setNomeRestaurante(e.target.value);
                                }}
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                                />
                                <Button sx={{ marginTop: 1}} type="submit" fullWidth variant="outlined">Cadastrar</Button>
                            </Box>
                        </Box>   
                    </Paper>
                </Container>
            </Box>

                                 
        </>
    )
}
export default FormularioRestaurante;