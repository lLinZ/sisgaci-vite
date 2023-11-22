import { useContext, useState } from 'react';

import { green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { Formik, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { ICall, Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import ListRounded from '@mui/icons-material/ListRounded';
import { CallForm } from '../../../components/admin/calls';

const initialValues: IValuesCall = {
    marital_status: '0',
    nationality: '0',
    zone: '',
    phone: '',
    first_name: '',
    middle_name: '',
    lastname: '',
    second_lastname: '',
    origin: '0',
    property: '',
    call_date: String(new Date()),
    call_purpose: '0',
    feedback: '',
    created_at: '',
    updated_at: ''
}
export type IValuesCall = Partial<ICall> & {
    marital_status: string;
    nationality: string;
    phone: string;
    first_name: string;
    lastname: string;
    middle_name?: string;
    second_lastname?: string;
    document?: string;
}

export const RegisterCall = () => {
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [birthday, setBirthday] = useState<string>('');
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Listar llamadas', path: '/admin/calls', color: green[500], icon: <ListRounded /> },
    ]
    const onSubmit = async (
        values: IValuesCall,
        resetForm: (nextState?: Partial<FormikState<IValuesCall>> | undefined) => void) => {
        let errors = [];
        if (!countryCode) {
            errors.push('Debe seleccionar un codigo de pais');
        };
        if (!values.phone) {
            errors.push('El campo Telefono es obligatorio');
        };
        if (!values.first_name) {
            errors.push('El campo primer nombre es obligatorio');
        };
        if (!values.lastname) {
            errors.push('El campo primer apellido es obligatorio');
        };
        if (!values.origin) {
            errors.push('El campo origen es obligatorio');
        };
        if (!values.zone) {
            errors.push('El campo zona es obligatorio');
        };
        if (!values.call_purpose) {
            errors.push('El campo motivo es obligatorio');
        };
        if (!values.feedback) {
            errors.push('El campo comentario es obligatorio');
        };
        if (errors.length > 0) {
            let errorString = '';
            errors.map((e: string) => errorString += `- ${e} </br>`);
            Swal.fire({
                title: 'Error',
                html: errorString,
                icon: 'error',
            });
            return;
        }
        const url = `${baseUrl}/call`;
        const body = new URLSearchParams();
        body.append('phone', countryCode
            ? `${countryCode}${String(values.phone).charAt(0) === '0' ? String(values.phone).slice(1) : String(values.phone)}`
            : '');
        body.append('first_name', String(values.first_name));
        body.append('middle_name', String(values.middle_name));
        body.append('lastname', String(values.lastname));
        body.append('second_lastname', String(values.second_lastname));
        body.append('document', String(values.document));
        body.append('origin', String(values.origin));
        body.append('zone', String(values.zone));
        body.append('call_purpose', String(values.call_purpose));
        body.append('feedback', String(values.feedback));
        body.append('birthday', String(birthday));
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha registrado la llamada',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    resetForm();
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectarse con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar llamada'} description={'Registra una nueva llamada en el sistema'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validateOnMount={false}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <CallForm {...{ values, errors, touched, handleChange, handleSubmit, setBirthday, setCountryCode }} />
                )}
            </Formik>
        </Layout >
    )
}