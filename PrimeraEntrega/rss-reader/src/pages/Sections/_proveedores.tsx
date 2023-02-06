// https://react-hook-form.com/get-started
// https://react-hook-form.com/api/usefieldarray
// https://nextjs.org/docs/guides/building-forms
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function _proveedores(){
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     getValues,
    //   } = useForm({
    //     defaultValues: {
    //         urls: ""
    //     }
    // });

    type FormValues = {
        cart: {
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
          cart: [{ urls: ""}]
        }
    });

    const {fields, append, remove} = useFieldArray({
        name:'cart',
        control,
        rules: {
            required: "Please append at least 1 item"
          }
    })

    // const [inputsURL, setInputsURL] = React.useState([
	// 	{
	// 		id: uuidv4(),
	// 	},
	// ]);

    // const addInputURL = () => {
	// 	//Todo generate random id

	// 	let _inputsURL = [...inputsURL]
	// 	_inputsURL.push({
	// 		id: uuidv4(),
	// 	})
	// 	setInputsURL(_inputsURL);
	// }

    const onSubmit = (data:any) => {
        console.log(data.cart[0].urls);
        console.log(JSON.stringify(data));
        fetch('../api/CRUD/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
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
                                        {...register(`cart.${index}.urls`, { required: true })} className="form-control"
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
                            {/* {inputsURL.map((urll) =>(
                                <input type="text" className="form-control"  {...register("urls", { required: true })} autoComplete='off' key={urll.id}/>
                            ))}
                            {errors.urls && <span className="text-danger">This field is required</span>} */}
                                {errors.cart?.at && <p className="text-danger">This field is required</p>}
                            </div>
                            <p>{errors.cart?.root?.message}</p>
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