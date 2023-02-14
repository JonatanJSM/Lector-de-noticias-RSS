import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function _proveedores(){

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
            required: "Please append at least 1 item"
          }
    })

    const onSubmit = (data:any) => {

        // Si van a utilizar esto, hay que descomentar el que está en newsEP
        // console.log(data.cart[0].urls);
        // console.log(JSON.stringify(data));
        fetch('../api/newsEP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
                                        {...register(`input.${index}.urls`, { required: true })} className="form-control"
                                        />
                                    </label>
                                    <button type="button" onClick={() => remove(index)}>
                                        Delete
                                    </button>
                                    <br/>
                                    <br/>
                                    </section>
                                );
                                })}
                                {errors.input?.at && <p className="text-danger">This field is required</p>}
                            </div>
                            <p>{errors.input?.root?.message}</p>
                            <button className="btn btn-primary" 
                                type="button"
                                onClick={() => {
                                    append({
                                    urls: ""
                                    });
                                }}
                            >Append</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}