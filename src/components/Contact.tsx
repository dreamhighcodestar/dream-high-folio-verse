
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-black/0 to-blue-900/10">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          <span className="text-blue-500">#</span> Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-gray-300 text-lg">
              I'm currently available for freelance work and interesting project collaborations. 
              Feel free to reach out if you have a project in mind or just want to connect!
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <a href="mailto:ivanfinan@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    ivanfinan@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Phone</h3>
                  <a href="tel:+380668488255" className="text-gray-400 hover:text-blue-400 transition-colors">
                    +380 66 848 82 55
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Location</h3>
                  <p className="text-gray-400">
                    Nikopol, Ukraine
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="p-5 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/20 backdrop-blur-sm border border-blue-900/20">
                <h3 className="text-lg font-semibold text-white mb-3">References</h3>
                <div className="text-gray-400">
                  <p>Phone: +380 63 870 93 35</p>
                  <p>Email: asdfadsxduasd@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-900/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Send me a message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-blue-950/30 border-blue-900/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-blue-950/30 border-blue-900/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm text-gray-400">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="Subject" 
                    className="bg-blue-950/30 border-blue-900/30 text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message" 
                    rows={5} 
                    className="bg-blue-950/30 border-blue-900/30 text-white placeholder:text-gray-500 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
