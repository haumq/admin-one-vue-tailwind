import axios from 'axios'
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

axios.interceptors.request.use(config => {
    mainStore.apiLoading = true;
    return config;
});
axios.interceptors.response.use(
        response => {
            mainStore.apiLoading = false;
            return Promise.resolve(response);
        },
        error => {
            mainStore.apiLoading = false;
            return Promise.reject(error);
        }
    );