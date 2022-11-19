import { useCallback, useState } from "react"
import axios from "axios";
import $ from 'jquery';

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useUpdate = () => {
    const { showMessage } = useMessage();

    const [loading, setLoading] = useState(false);

    const updateUser = useCallback((strFormSelector, profileImage = '', onClose, getUsers, operationMode) => {


        let objFormElement   = $(strFormSelector);
        let config = {
            headers: {
                'content-type':  'multipart/form-data',
            }
        };

        // formの中のnameを扱いやすくします
        const serializeObject = ((form) => {
            var object = {};
            var array = form.serializeArray();

            $.each(array, function() {
                if (object[this.name] !== undefined) {
                    if (!object[this.name].push) {
                        object[this.name] = [object[this.name]];
                    }
                    object[this.name].push(this.value || '');
                } else {
                    object[this.name] = this.value || '';
                }
            });
            return object;
        });
        const file = new FormData()
        let formAry = serializeObject(objFormElement);
        file.append("profile_image", profileImage);
        file.append("operation_mode", operationMode);
        Object.keys(formAry).map(key => file.append(key, formAry[key]));


        axios.post<User>(objFormElement.attr('action'),file,config
        ).then((res) => {
                showMessage({ title: "更新しました。", status: "success" });
                onClose();
                getUsers();
        })
        .catch(() => {
            showMessage({ title: "更新に失敗しました。", status: "error" })
            setLoading(false);
        });




        // let objFormElement   = $(strFormSelector);
        // const file = new FormData()
        // file.append("profile_image", profileImage);
        // file.append("operation_mode", operationMode);

        // const dataToSubmit = ((objFormElement) => {
        //     return objFormElement.serialize();
        // })
        //   $.ajaxSetup({ headers: { 'content-type':  'multipart/form-data', 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        //   $.ajax({
        //       url      : objFormElement.attr('action')
        //      ,type     : 'post'
        //      ,data     : file
        //      ,dataType : 'json'
        //      ,cache    : false
        //      ,processData: false
        //      ,success  : function(objResponseJSON) { showMessage({ title: "更新しました。", status: "success" }); }
        //      ,error    : function() {
        //         showMessage({ title: "更新に失敗しました。", status: "error" })
        //         setLoading(false);
        //      }
        //   });

    }, [showMessage]);
    return { updateUser, loading }
}
