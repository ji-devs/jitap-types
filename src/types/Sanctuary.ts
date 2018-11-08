import {Service} from "../types/Service";

const getServiceKeys = () => 
    Object.keys(Service).reduce((acc, val) => {
        const target = Service[val];
        if(target.Request != null) {
            acc.push(target.Request)
        }
        if(target.Response != null) {
            acc.push(target.Request)
        }

        return acc;
    }, []);

export module SanctuaryEnv {

    export const list = () => 
        [].concat(getServiceKeys());
}