import React from 'react';
import './about.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="name">Connor Miller</h1>
      <h2 className="title">Software Engineer</h2>
      
      <section className="summary">
        <h3>Professional Summary</h3>
        <p>Software Engineer with 4 years of experience in designing and maintaining efficient software systems for city departments and private corporations. Proficient in database management, front-end development, and application security, utilizing tools like SQL, .NET, React, and Typescript. Demonstrates a visionary approach to problem-solving and optimizing processes, consistently delivering high-quality solutions and improving system documentation.</p>
      </section>
      
      <section className="experience">
        <h3>Employment History</h3>
        <div className="job">
          <h4>Software Engineer</h4>
          <p className="company">City of Orem, UT</p>
          <p className="date">Mar 2022 - Present</p>
          <ul>
            <li>Design, develop, and maintain software systems for city departments, ensuring efficient solutions.</li>
            <li>Collaborate with departments to assess software needs, providing effective solutions.</li>
            <li>Maintain and integrate third-party software via REST APIs, ensuring seamless operations.</li>
            <li>Utilize SQL, .NET, React, and Typescript to develop and maintain client/server interfaces.</li>
            <li>Optimize processes and improve system documentation, leading to measurable improvements.</li>
          </ul>
        </div>
        <div className="job">
          <h4>Software Engineer I</h4>
          <p className="company">Call Corp, Lehi, UT</p>
          <p className="date">Jun 2021 - Feb 2022</p>
          <ul>
            <li>Collaborated with a 6-member agile team to prioritize feature requests, ensuring high-impact delivery.</li>
            <li>Developed RESTful APIs to fetch data from SQL and document databases for dynamic user interactions.</li>
            <li>Created a framework to integrate with multiple SMS providers, enhancing customer messaging capabilities.</li>
            <li>Utilized JavaScript, Vue.js, C#, CouchDB, MySQL, and Jenkins to deliver robust software solutions.</li>
          </ul>
        </div>
        <div className="job">
          <h4>Software Development Intern</h4>
          <p className="company">YouScience, LLC, American Fork, UT</p>
          <p className="date">Jun 2020 - Jun 2021</p>
          <ul>
            <li>Enhanced website and app performance, achieving measurable improvements in user engagement.</li>
            <li>Collaborated with sales and marketing teams to update and optimize website content.</li>
            <li>Utilized JavaScript, PHP, Phoenix Elixir, and Git to implement updates and track changes.</li>
            <li>Resolved technical issues, leading to increased site reliability and user satisfaction.</li>
          </ul>
        </div>
      </section>
      
      <section className="skills">
        <h3>Skills</h3>
        <ul>
          <li>Front End Development</li>
          <li>Database Management</li>
          <li>Client Relations</li>
          <li>Third Party Integrations</li>
          <li>Learning New Frameworks</li>
          <li>Code Refactoring</li>
        </ul>
      </section>
      
      <section className="education">
        <h3>Education</h3>
        <div className="degree">
          <h4>Bachelor's Degree in Computer Science</h4>
          <p className="school">Brigham Young University, Provo, UT</p>
          <p className="date">Aug 2019 - Dec 2021</p>
        </div>
      </section>
      
      <section className="languages">
        <h3>Languages</h3>
        <ul>
          <li>English (Native)</li>
          <li>Spanish (Proficient)</li>
        </ul>
      </section>
    </div>
  );
};

export default About;