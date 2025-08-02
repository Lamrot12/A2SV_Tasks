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
    <div className="container mx-auto p-4 grid gap-6 md:grid-cols-2">
      {jobs.map(job => (
        <Link to={`/description/${job.id}`} key={job.id}>
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center">
              <img
                src={job.image}
                alt={`${job.title} logo`}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">
                  {job.company} <span className="text-sm">— {job.about.location}</span>
                </p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{job.description}</p>
            <div className="mt-4 space-x-2">
              {job.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="inline-block border border-green-400 text-green-400 px-3 py-1 rounded-full text-xs"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobCardList;
