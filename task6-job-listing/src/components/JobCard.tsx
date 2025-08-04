import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  image: string;
  about: { location: string };
  categories: string[];
}

const JobCardList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/jobs.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load jobs.json');
        return res.json();
      })
      .then((data: { job_postings: Job[] }) => setJobs(data.job_postings))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!jobs.length) return <p>Loading jobs...</p>;

  return (
    <div className="container mx-auto p-4 grid gap-6 ">
      {jobs.map(job => (
        <Link to={`/description/${job.id}`} key={job.id} className="block">
          <div
            className="bg-white border border-gray-200 rounded-3xl p-6 shadow hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <img
                src={job.image}
                alt={`${job.title} logo`}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                <p className="text-gray-500">
                  {job.company} <span className="text-xs">— {job.about.location}</span>
                </p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{job.description}</p>
            <div className="mt-5 flex space-x-2">
              <span className="border border-green-300 text-green-300 px-3 py-1 rounded-full text-xs">
                In Person
              </span>
              <span className="border border-yellow-300 text-yellow-300 px-3 py-1 rounded-full text-xs">
                Education
              </span>
              <span className="border border-blue-700 text-blue-700 px-3 py-1 rounded-full text-xs">
                IT
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobCardList;
