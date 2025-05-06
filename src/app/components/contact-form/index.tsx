'use client';

import { HiArrowNarrowRight } from 'react-icons/hi';
import { Button } from '../button';
import { SectionTitle } from '../section-title';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import emailjs from '@emailjs/browser';

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { handleSubmit, register } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    try {
      emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      toast.success('E-mail enviado com sucesso!');
    } catch (error) {
      toast.error('Houve um problema ao enviar o e-mail');
    }
  };

  return (
    <section
      id='contact'
      className='py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950'
    >
      <div className='w-full max-w-[420px] mx-auto'>
        <SectionTitle
          subtitle='contato'
          title='Se interessou por mim? Entre em contato!'
          className='items-center text-center'
        />
        <motion.form
          className='mt-12 w-full flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
          {...fadeUpAnimation}
        >
          <input
            placeholder='Nome'
            type='text'
            className='w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            {...register('name')}
          />
          <input
            placeholder='E-mail'
            type='email'
            className='w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            {...register('email')}
          />
          <textarea
            placeholder='Mensagem'
            className='resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            maxLength={500}
            {...register('message')}
          />

          <Button className='w-max mx-auto mt-6 shadow-button'>
            Enviar mensagem
            <HiArrowNarrowRight size={18} />
          </Button>
        </motion.form>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </div>
    </section>
  );
}
