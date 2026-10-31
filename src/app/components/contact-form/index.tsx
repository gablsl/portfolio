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
import { Dictionary } from '@/app/i18n/dictionaries';

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type ContactFormProps = {
  dict: Dictionary;
};

export function ContactForm({ dict }: ContactFormProps) {
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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
      );

      toast.success(dict.contact.success);
    } catch (error) {
      toast.error(dict.contact.error);
    }
  };

  return (
    <section
      id='contact'
      className='py-16 px-6 md:py-32 flex items-center justify-center bg-zinc-950'
    >
      <div className='w-full max-w-[420px] mx-auto'>
        <SectionTitle
          subtitle={dict.contact.subtitle}
          title={dict.contact.title}
          className='items-center text-center'
        />
        <motion.form
          className='mt-12 w-full flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
          {...fadeUpAnimation}
        >
          <input
            placeholder={dict.contact.name}
            type='text'
            className='w-full h-14 bg-zinc-900 rounded-lg placeholder:text-zinc-500 text-zinc-100 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            {...register('name')}
          />
          <input
            placeholder={dict.contact.email}
            type='email'
            className='w-full h-14 bg-zinc-900 rounded-lg placeholder:text-zinc-500 text-zinc-100 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            {...register('email')}
          />
          <textarea
            placeholder={dict.contact.message}
            className='resize-none w-full h-[138px] bg-zinc-900 rounded-lg placeholder:text-zinc-500 text-zinc-100 p-4 focus:outline-none focus:ring-2 ring-emerald-600'
            maxLength={500}
            {...register('message')}
          />

          <Button className='w-max mx-auto mt-6 shadow-button'>
            {dict.contact.send}
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
