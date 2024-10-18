import React from 'react'

const Contact = () => {
  return (
    <section className='pt-5'>
      <div className='px-4 mx-auto max-w-screen-md '>
        <h2 className='heading text-center'>Contact us</h2>
        <p className='text_para text-center'>
          Do you have technical issue? Do you want to send a Feedback about us? Let us know
        </p>
        <form action='#' className='space-y-8 pt-4'>
          <div>
            <label htmlFor='email' className='form_label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='form_input mt-1'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label htmlFor='subject' className='form_label'>
              Subject
            </label>
            <input
              type='text'
              id='subject'
              className='form_input mt-1'
              placeholder='Lets us know how we can help you?'
            />
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form_label'>
              Your message
            </label>
            <textarea
              rows = '6'
              type='text'
              id='message'
              className='form_input mt-1'
              placeholder='Leave a comment...'
            
            />
          </div>
          <button type='submit' className='btn rounded sm:w-fit'>Submit</button>
        </form>

      </div>
    </section>
  )
}

export default Contact