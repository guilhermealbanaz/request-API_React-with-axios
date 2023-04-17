import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IPrato from '../../../interfaces/IPrato';
import ITag from '../../../interfaces/ITag';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioPrato = () => {
    

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const params = useParams()

    useEffect(() => {
        http.get<{ tags: ITag[]}>('tags/')
        .then(res => setTags(res.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(res => setRestaurantes(res.data))
        
        if (params.id) {
            http.get(`pratos/${params.id}/`)
                .then(res => {
                    
                    setNomePrato(res.data.nome)
                    setTag(res.data.tag)
                    setDescricao(res.data.descricao)
                    setRestaurante(res.data.restaurante)
                    setImagem(res.data.imagem)
            })
        }
    },[params])

    const selecionar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImagem(e.target.files[0]);
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const formData = new FormData();
    
            formData.append('nome', nomePrato)
            formData.append('descricao', descricao)
            formData.append('tag', tag)
            formData.append('restaurante', restaurante)
            
            if (imagem) {
                formData.append('imagem', imagem)
        }
        
        if (params.id) {
            http.request({
                url: `pratos/${params.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    window.location.href = 'http://localhost:3000/restaurantes'
                })
                .catch(err => console.log(err))
        } else {
            
    
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    window.location.href = 'http://localhost:3000/restaurantes'
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <>
            <Box sx={{display:'flex', flexDirection: "column", alignItems:"center", flexGrow: 1}}>
                <Typography component='h1' variant='h6' >Formulário de Pratos</Typography>
                    <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                        <TextField
                            value={nomePrato}
                            onChange={(e) => {
                            setNomePrato(e.target.value);
                            }}
                            label="Nome do Prato"
                            variant="standard"
                            fullWidth
                        required
                        margin='dense'
                            />
                        <TextField
                            value={descricao}
                            onChange={(e) => {
                            setDescricao(e.target.value);
                            }}
                            label="Descrição do Prato"
                            variant="standard"
                            fullWidth
                            required
                        />
                    
                            <FormControl margin='dense' fullWidth>
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select labelId='select-tag' value={tag} onChange={e => setTag(e.target.value)}>
                                {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                        {tag.value}        
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                    
                            <FormControl margin='dense' fullWidth>
                                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                <Select labelId='select-restaurante' value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                                {restaurantes.map(rest => <MenuItem key={rest.id} value={rest.id}>
                                        {rest.nome}        
                                    </MenuItem>)}
                                </Select>
                    </FormControl>
                    
                    <input type="file" onChange={selecionar} />

                    <Button sx={{ marginTop: 1}} type="submit" fullWidth variant="outlined">Cadastrar</Button>
                </Box>
            </Box>
        </>
    )
}
export default FormularioPrato;