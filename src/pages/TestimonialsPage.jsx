import React from 'react';
import { mockTestimonials } from '../components/Ui/data/mockdata';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/CardComponents';

const TestimonialsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-gray-100">
            <CardHeader>
              <CardTitle>{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="italic">{testimonial.quote}</p>
            </CardContent>
            <CardFooter>
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;