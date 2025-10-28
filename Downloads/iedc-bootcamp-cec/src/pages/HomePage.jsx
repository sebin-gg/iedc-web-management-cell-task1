import React from 'react';
import { mockEvents, mockAchievements, mockTestimonials } from '../components/Ui/data/mockdata';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/CardComponents';
import { Button } from '../components/Ui/ButtonComponents';

const HomePage = ({ setView }) => {
  return (
    <div className="p-6 container-max">
      <header className="site-hero">
        <div>
          <h1 className="text-3xl font-bold">Welcome to IEDC BOOTCAMP CEC</h1>
          <p className="mt-2 text-lg">Empowering the next generation of entrepreneurs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setView('events')}>View Events</Button>
          <Button variant="outline" onClick={() => setView('team')}>Meet the Team</Button>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {mockEvents.map(event => (
            <Card key={event.id}>
              <CardHeader as="div">
                <img src={event.image} alt={event.title} />
              </CardHeader>
              <CardContent>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="mt-1 text-gray-500">{event.date}</CardDescription>
                <p className="mt-2">{event.description}</p>
              </CardContent>
              <CardFooter>
                <span className="text-muted">{event.date}</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setView('events')}>Register</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {mockAchievements.map(achievement => (
            <Card key={achievement.id}>
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription>{achievement.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{achievement.description}</p>
              </CardContent>
              <CardFooter>
                <img src={achievement.image} alt={achievement.name} className="w-full rounded-lg" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {mockTestimonials.map(testimonial => (
            <Card key={testimonial.id}>
              <CardContent>
                <p className="italic">"{testimonial.quote}"</p>
                <CardDescription className="mt-2">{testimonial.name} - {testimonial.role}</CardDescription>
              </CardContent>
              <CardFooter>
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;