import type { APIRoute } from "astro";
import keys from "../util/keys";

function loadFromLocalStorage() {
    const sheets : string = localStorage.getItem(keys.localStorageKey) ?? '{ "error":"SheetNotFound"} ';

    console.log(sheets);
    console.log(JSON.parse(sheets))
    return JSON.parse(sheets);
}

export const  get : APIRoute = ({params, request}) => {
    const sheets = loadFromLocalStorage();
    return {
        body: JSON.stringify(sheets)
    }
}