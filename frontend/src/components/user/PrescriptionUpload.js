import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [prescription, setPrescription] = useState(null);
    const [prescriptionPreview, setPrescriptionPreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
                setPrescriptionPreview(reader.result);
                setPrescription(file);
            } else {
                toast.error("Unsupported file format! Please upload jpg, png, or pdf files.");
            }
        };

        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (prescription) {
            const formData = new FormData();
            formData.append('prescriptions', prescription);
            dispatch(register(formData));
        } else {
            toast.error("Please select a prescription file to upload.");
        }
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-3">Upload Prescription</h1>

                    <div className='form-group'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    {prescriptionPreview && (
                                        <img
                                            src={prescriptionPreview}
                                            className='rounded-circle'
                                            alt='Prescription Preview'
                                        />
                                    )}
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='prescription'
                                    onChange={onChange}
                                    className='custom-file-input'
                                    id='customFile'
                                    accept=".jpg, .jpeg, .png, .pdf" // Accept jpg, png, and pdf files
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose file (jpg, png, pdf)
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        UPLOAD
                    </button>
                </form>
            </div>
        </div>
    )
}

