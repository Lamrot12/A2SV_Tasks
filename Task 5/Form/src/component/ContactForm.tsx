import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <h2 className="form-title">Contact Us</h2>
      <div className="mb-3">
        <label htmlFor="name" className="label-form">Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          type="text"
          className="form-control"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="label-form">Email</label>
        <input
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            }
          })}
          type="text"
          className="form-control"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="label-form">Message</label>
        <textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          className="form-control"
        />
        {errors.message && <p className="error">{errors.message.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};

export default ContactForm;
