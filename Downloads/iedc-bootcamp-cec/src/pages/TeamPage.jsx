import React from 'react';
import { mockFaculty, mockExecom, mockAchievements } from '../components/Ui/data/mockdata';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/CardComponents';

const TeamPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Our Team</h1>
      
      {/* Faculty section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Faculty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFaculty.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4">
                <img src={member.image} alt="" className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" />
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center mb-4">{member.role}</CardDescription>
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 text-[var(--accent)] hover:underline"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Executive Committee section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Executive Committee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExecom.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4">
                <img src={member.image} alt="" className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" />
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center mb-4">{member.role}</CardDescription>
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 text-[var(--accent)] hover:underline"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fixed Achievements section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardContent className="p-4">
                <img 
                  src={achievement.image} 
                  alt="" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="mb-2">{achievement.name}</CardTitle>
                <CardDescription className="text-sm text-muted">
                  {achievement.description}
                </CardDescription>
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 text-[var(--accent)] hover:underline mt-4"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;