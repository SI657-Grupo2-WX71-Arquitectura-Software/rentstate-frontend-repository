import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastManager = {
    success: (message) => {
        toast.success(message, {
            position: 'bottom-right',
            autoClose: 2000,
        });
    },
    error: (message) => {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 2000,
        });
    },
    info: (message) => {
        toast.info(message, {
            position: 'bottom-right',
            autoClose: 2000,
        });
    },
    warning: (message) => {
        toast.warning(message, {
            position: 'bottom-right',
            autoClose: 2000,
        });
    },
};


export default ToastManager;