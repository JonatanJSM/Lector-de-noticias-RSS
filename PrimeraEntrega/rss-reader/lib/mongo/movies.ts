//@ts-ignore
// import clientPromise from "." ;
import clientPromise from ".";
let client:any
let db:any
let movies:any

export async function getMovies(){
    console.log('getMovies');
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("library");
    try {
        const result = await db.collection('magazines').find({}).toArray();
        console.log('result',result);
        
        return {movies: result}
    } catch (error) {
        return {error: 'Failed to fetch movies'}
    }
}