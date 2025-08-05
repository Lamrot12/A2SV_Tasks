import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import type { JobOpportunity } from '../types/job';

const JobCardList: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://akil-backend.onrender.com/opportunities/search')
      .then((res) => {
        console.log(res);
        
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setJobs(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!jobs.length) {
    return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>);
  }

  return (
    <div className="container mx-auto p-6 grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      <h1><strong className='text-xl'> opportunities</strong></h1>
      <p className='text-xs'>showing {jobs.length} results</p>
      {jobs.map((job) => (
        <Link to={`/description/${job.id}`} key={job.id} className="block">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 hover:scale-[1.01]">
            <div className="flex items-center mb-4">
              <img
                src={job.logoUrl || '/placeholder.jpg'}
                alt={`${job.title} logo`}
                className="w-16 h-16 rounded-full object-cover mr-4 border border-gray-300"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                <p className="text-gray-500 text-sm">
                  {job.orgName}
                  <span className="text-xs block mt-1">
                    {job.location?.join(', ') || 'Location not specified'}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{job.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {job.categories.map((cat, index) => (
                <span
                  key={index}
                  className="bg-blue-50 border border-blue-500 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {cat}
                </span>
              ))}
              <span
                className={`border px-3 py-1 rounded-full text-xs font-medium ${
                  job.opType === 'inPerson'
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-purple-500 text-purple-600 bg-purple-50'
                }`}
              >
                {job.opType === 'inPerson' ? 'In Person' : 'Remote'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobCardList;
