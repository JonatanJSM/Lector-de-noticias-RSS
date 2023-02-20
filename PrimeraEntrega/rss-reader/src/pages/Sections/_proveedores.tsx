import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function _proveedores(){
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertError, setShowAlertError] = React.useState(false);
    const [showAlertSuccess , setShowAlertSuccess] = React.useState(false);
    type FormValues = {
        input: {
          urls: string;
        }[];
      };

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
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
          })
     
        // fetch('/api/newsEP', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }
        // }).then(async response=>{
        //   const data = await response.json();
        //   console.log(data);
        // })
    };

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
                                    <button type="button" onClick={() => remove(index)}>
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
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        {showAlertError && (
                            <Alert onClose={() => {setShowAlertError(false)}} variant="filled" severity="error">{`La url ${errorMessage} provocó un error`}</Alert>
                            )}
                        {showAlertSuccess && (
                            <Alert onClose={() => {setShowAlertSuccess(false)}} variant="filled" severity="success">Se guardaron los datos correctamente</Alert>
                            )}
                    </form>
                </div>
            </div>
        </div>
    )
}