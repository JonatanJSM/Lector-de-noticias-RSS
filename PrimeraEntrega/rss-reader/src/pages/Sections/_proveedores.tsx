import { useForm } from "react-hook-form";

export default function _proveedores(){
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
      } = useForm({
        defaultValues: {
            urls: ''
        }
      });

    const onSubmit = (data:any) => {
        console.log(data);
        
    };

    return(
        <div>
            <h1>Proveedores</h1>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6"> 
                    <form onSubmit={handleSubmit(onSubmit)} className='form-group' style={{margin:'auto'}}>
                        <div className="mb-3">
                            <label htmlFor="urls" className="form-label">URLs</label>
                            <input type="text" className="form-control" id="urls" {...register("urls", { required: true })} autoComplete='off'/>
                            {errors.urls && <span className="text-danger">This field is required</span>}
                            </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}