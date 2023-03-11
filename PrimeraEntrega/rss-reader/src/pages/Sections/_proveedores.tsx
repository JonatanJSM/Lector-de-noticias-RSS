import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import { useState } from 'react';
import {WebNews} from 'public/interface/WebNews';
import CircularProgress from '@mui/material/CircularProgress';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function _proveedores(){
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertError, setShowAlertError] = React.useState(false);
    const [showAlertDeleted, setShowAlertDeleted] = React.useState(false);
    const [showAlertSuccess , setShowAlertSuccess] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    type FormValues = {
        input: {
          urls: string;
        }[];
      };

    useEffect(()=>{
        fetch('api/newsEP',{method: 'GET',headers: {
            'Content-Type': 'application/json',
          }})
          .then(async response=>{
            const data = await response.json();
            setValue('input',data.response.map((item:WebNews)=>{return {urls:item.urlWebPage}}));
            })
    },[])

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
        getValues,
        control
      } = useForm<FormValues>({
        defaultValues: {
          input: [{ urls: ""}]
        }
    });

    const {fields, append, remove} = useFieldArray({
        name:'input',
        control,
        rules: {
            required: "Por favor, agregue al menos un input"
            // validate: (url) =>{
            //     // const urlRegex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
            //     // const url = "https://www.example.com";
            //     // console.log(urlRegex.test(url)); // outputs: true
            // }
          }
        
    })

    const onSubmit = (data:any) => {
        setIsLoading(true);
        fetch('../api/newsEP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async response => {
            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.response);
                setShowAlertError(true);
            }else{
                setShowAlertSuccess(true);
            }
            setIsLoading(false);
          })
    };

    function deleteProvider(index:number){
        confirmAlert({
            title: 'Eliminar URL',
            message: '¿Eliminar URL?',
            buttons: [
              {
                label: 'Sí',
                onClick: () => eliminar(index)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          })        
        
    }

    function eliminar(index:number){
        
        console.log("pase");
                    fetch('../api/newsEP', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(getValues('input')[index])
                }).then(async response => {
                    if (!response.ok) {
                        console.log("paaaase");
                        const data = await response.json();
                        setErrorMessage(data.response);
                        setShowAlertError(true);
                    }else{
                        console.log("paseee");
                        setShowAlertDeleted(true);
                        remove(index);
                    }
                  })
    }

    return(
        <div>
            <h1>Proveedores</h1>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6"> 
                    <form onSubmit={handleSubmit(onSubmit)} className='form-group' style={{margin:'auto'}}>
                        <div className="mb-3">
                            <label htmlFor="urls" className="form-label">URLs</label>
                            {fields.map((field, index) => {
                                return (
                                    <section key={field.id}>
                                    <label>
                                        <input
                                        {...register(`input.${index}.urls`, { required: true, pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ })} className="form-control"
                                        />
                                    </label>
                                    <button className="btn btn-danger" style={{marginLeft:'5pt'}} type="button" onClick={() => {deleteProvider(index); }}>
                                        Eliminar
                                    </button>
                                    <br/>
                                    <br/>
                                    </section>
                                );
                                })}
                                {errors.input?.at && <p className="text-danger">Este campo es requerido o incompleto</p>}
                            </div>
                            <p>{errors.input?.root?.message}</p>
                            <button className="btn btn-primary" 
                                type="button"
                                onClick={() => {
                                    append({
                                    urls: ""
                                    });
                                }}
                            >Agregar</button> &nbsp;
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>Actualizar</button>
                            {isLoading && <span style={{marginLeft:'5pt'}}> <CircularProgress color="secondary" size='2rem' style={{paddingTop:'1pt'}}/> </span>}
                        {showAlertError && (
                            <Alert onClose={() => {setShowAlertError(false)}} variant="filled" severity="error" style={{marginTop:'5pt'}}>{`La url ${errorMessage} provocó un error`}</Alert>
                            )}
                        {showAlertSuccess && (
                            <Alert onClose={() => {setShowAlertSuccess(false)}} variant="filled" severity="success" style={{marginTop:'5pt'}}>Se guardaron los datos correctamente</Alert>
                            )}
                        {showAlertDeleted && (
                            <Alert onClose={() => {setShowAlertDeleted(false)}} variant="filled" severity="warning" style={{marginTop:'5pt'}}>Se eliminaron los datos correctamente</Alert>
                            )}
                    </form>
                </div>
            </div>
        </div>
    )
}