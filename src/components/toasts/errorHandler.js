import { toast } from "react-toastify";


export default function errorHandler(error) {
    toast.error(error);
    return;
}