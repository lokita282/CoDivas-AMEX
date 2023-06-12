import { toast } from "react-toastify";


export default function successHandler(message) {
    toast.success(message);
    return;
}