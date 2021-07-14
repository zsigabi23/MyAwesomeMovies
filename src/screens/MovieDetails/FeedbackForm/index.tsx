import * as React from 'react';
import * as S from './style';

export interface FeedbackFormInput  {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

interface FeedbackFormErrors {
    name: boolean;
    surname: boolean;
    email: boolean;
    phone: boolean;
}

interface FeedbackFormProps {
    onSubmit(data: FeedbackFormInput): void;
}

interface FeedbackFormState {
    errors: FeedbackFormErrors;
    data: FeedbackFormInput
}

const FeedbackForm = ({
    onSubmit
}: FeedbackFormProps) => {
    const [state, updateState] = React.useState<FeedbackFormState>({
        data: {
            email: "",
            name: "",
            phone: "",
            surname: ""
        },
        errors: {
            email: false,
            name: false,
            phone: false,
            surname: false,
        }
    });

    const setState = (newState: Partial<FeedbackFormState>) => {
        updateState({
            ...state,
            ...newState
        })
    }

    const onChange = (name: string, value: string, error: boolean) => {
        console.log(name, value, error);
        setState({
            data: {
                ...state.data,
                [name]: value
            },
            errors: {
                ...state.errors,
                [name]: error
            }
        })
    }

    const hasErrors = Object.keys(state.errors).some((key) => {
        // @ts-ignore
        const error = !!state.errors[key];
        return error;
    });

    return (
        <S.Form>
            <FeedbackFormField isValid={(value) => {
                return value.length > 1 && value.length < 255;
            }} onChange={onChange} hint="First Name *" type="text" value={state.data.name} error={state.errors.name} name="name" />
            <FeedbackFormField isValid={(value) => {
                return value.length > 1 && value.length < 255;
            }} onChange={onChange} hint="Surname *" type="text" value={state.data.surname} error={state.errors.surname} name="surname" />
            <FeedbackFormField isValid={(value) => true} onChange={onChange} hint="Email Address *" type="email" value={state.data.email} error={state.errors.email} name="email" />
            <FeedbackFormField isValid={(value) => {
                return value.length === 10;
            }} onChange={onChange} hint="Phone Number *" type="number" value={state.data.phone} error={state.errors.phone} name="phone" />
            <S.Button disabled={hasErrors} onClick={() => onSubmit(state.data)}>Get Movie</S.Button>
        </S.Form>
    )
}

type FeedbackFormFieldType = "text" | "email" | "number"

interface FeedbackFormFieldProps {
    hint?: string;
    type: FeedbackFormFieldType;
    value: string;
    name: string;
    isValid(value: string): boolean;
    error: boolean;
    onChange(name: string, value: string, error: boolean): void;
}

const FeedbackFormField = ({
    hint,
    type,
    value,
    name,
    error,
    isValid,
    onChange: onTextFieldChange
}: FeedbackFormFieldProps) => {
    const [text, setText] = React.useState<string>(() => value);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setText(value);
        if (onTextFieldChange) {
            onTextFieldChange(name, value, !isValid(value))
        }
    }
    return (
        <S.Field error={error} placeholder={hint} type={type} value={text} name={name} onChange={onChange} />
    )
}

export default FeedbackForm;