import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { FormData, FormErrors } from '../types';
import './CardForm.css';

interface CardFormProps {
    formData: FormData;
    onFormChange: (data: FormData) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function CardForm({ formData, onFormChange, onSubmit, onCancel }: CardFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});


    const validateCardNumber = (value: string): string | undefined => {
        if (!value) return 'El número de tarjeta es requerido';
        if (!/^\d+$/.test(value)) return 'El número de tarjeta debe contener solo dígitos';
        if (value.length !== 16) return 'El número de tarjeta debe contener 16 dígitos';
        return undefined;
    };

    const validateExpirationDate = (value: string): string | undefined => {
        if (!value) return 'La fecha de vencimiento es requerida';

        const regex = /^(\d{2})\/(\d{2})$/;
        const match = value.match(regex);

        if (!match) return 'Formato inválido. Use MM/YY';

        const month = parseInt(match[1], 10);
        const year = parseInt(match[2], 10);

        if (month < 1 || month > 12) return 'Mes inválido (01-12)';

        const currentYear = new Date().getFullYear() % 100;
        const maxYear = currentYear + 5;

        if (year < 22 || year > maxYear) return `Año inválido (22-${maxYear})`;

        return undefined;
    };

    const validateCardholderName = (value: string): string | undefined => {
        if (!value) return 'El nombre del titular es requerido';

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) {
            return 'El nombre solo puede contener letras';
        }
        if (value.length > 20) return 'El nombre debe tener máximo 20 caracteres';
        return undefined;
    };

    const validateCVV = (value: string): string | undefined => {
        if (!value) return 'El CVV es requerido';
        if (!/^\d{3,4}$/.test(value)) return 'El CVV debe contener 3 o 4 dígitos';
        return undefined;
    };

    const handleChange = (field: keyof FormData, value: string) => {
        let processedValue = value;


        if (field === 'cardNumber') {

            processedValue = value.replace(/\D/g, '').slice(0, 16);
        } else if (field === 'expirationDate') {

            let cleaned = value.replace(/\D/g, '');
            if (cleaned.length >= 2) {
                cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
            }
            processedValue = cleaned.slice(0, 5);
        } else if (field === 'cardholderName') {

            processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').slice(0, 20);
        } else if (field === 'cvv') {

            processedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        const newFormData = { ...formData, [field]: processedValue };
        onFormChange(newFormData);


        if (touched[field]) {
            validateField(field, processedValue);
        }
    };

    const validateField = (field: keyof FormData, value: string) => {
        let error: string | undefined;

        switch (field) {
            case 'cardNumber':
                error = validateCardNumber(value);
                break;
            case 'expirationDate':
                error = validateExpirationDate(value);
                break;
            case 'cardholderName':
                error = validateCardholderName(value);
                break;
            case 'cvv':
                error = validateCVV(value);
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error;
    };

    const handleBlur = (field: keyof FormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const handleSubmit = () => {

        const cardNumberError = validateCardNumber(formData.cardNumber);
        const expirationDateError = validateExpirationDate(formData.expirationDate);
        const cardholderNameError = validateCardholderName(formData.cardholderName);
        const cvvError = validateCVV(formData.cvv);

        const newErrors: FormErrors = {
            cardNumber: cardNumberError,
            expirationDate: expirationDateError,
            cardholderName: cardholderNameError,
            cvv: cvvError,
        };

        setErrors(newErrors);
        setTouched({
            cardNumber: true,
            expirationDate: true,
            cardholderName: true,
            cvv: true,
        });


        const isValid = !cardNumberError && !expirationDateError && !cardholderNameError && !cvvError;

        if (isValid) {
            onSubmit();

            setErrors({});
            setTouched({});
        }
    };

    const handleCancel = () => {
        onCancel();
        setErrors({});
        setTouched({});
    };

    return (
        <div className="card-form">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="cardNumber">Número de Tarjeta</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('cardNumber', e.target.value)}
                        onBlur={() => handleBlur('cardNumber')}
                        className={errors.cardNumber && touched.cardNumber ? 'error' : ''}
                        placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && touched.cardNumber && (
                        <span className="error-message">{errors.cardNumber}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="expirationDate">Fecha Vencimiento</label>
                    <input
                        type="text"
                        id="expirationDate"
                        value={formData.expirationDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('expirationDate', e.target.value)}
                        onBlur={() => handleBlur('expirationDate')}
                        className={errors.expirationDate && touched.expirationDate ? 'error' : ''}
                        placeholder="MM/YY"
                    />
                    {errors.expirationDate && touched.expirationDate && (
                        <span className="error-message">{errors.expirationDate}</span>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="cardholderName">Nombre Titular</label>
                    <input
                        type="text"
                        id="cardholderName"
                        value={formData.cardholderName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('cardholderName', e.target.value)}
                        onBlur={() => handleBlur('cardholderName')}
                        className={errors.cardholderName && touched.cardholderName ? 'error' : ''}
                        placeholder="NOMBRE APELLIDO"
                    />
                    {errors.cardholderName && touched.cardholderName && (
                        <span className="error-message">{errors.cardholderName}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('cvv', e.target.value)}
                        onBlur={() => handleBlur('cvv')}
                        className={`cvv-input ${errors.cvv && touched.cvv ? 'error' : ''}`}
                        placeholder="123"
                    />
                    {errors.cvv && touched.cvv && (
                        <span className="error-message">{errors.cvv}</span>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-primary" onClick={handleSubmit}>
                    Agregar Tarjeta
                </button>
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
