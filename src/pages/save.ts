import type { APIRoute } from "astro";
import keys from "../util/keys";

function saveToLocalStorage(data : Object){
    const dataString : string = JSON.stringify(data);
    window.localStorage.setItem(keys.localStorageKey, dataString);
}

export const get: APIRoute = () => {
    return {
        body : "This is meant for saving, please use post"
    };
}

export const post : APIRoute = async ({request}) => {
    if(request.headers.get('Content-Type') === 'application/json'){
        const body = await request.json();
        let message = "Saved data successfully";
        let status = 200;
        try {
            saveToLocalStorage(body);
        }catch(err){
            message = "Something went wrong with saving the data";
            status = 500;
        }
        return new Response(JSON.stringify({
            message
        }), {
            status
        })
    }
    return new Response(null, {status: 400});
}