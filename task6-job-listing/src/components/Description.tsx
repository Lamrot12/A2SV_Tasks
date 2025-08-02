import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface JobDescription {
  id: number;
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}

export const Description = () => {
  const [info, setInfo] = useState<JobDescription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch('/jobs.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load jobs.json');
        return res.json();
      })
      .then((data: { job_postings: JobDescription[] }) => {
        const foundJob = data.job_postings.find((j) => j.id === Number(id));
        setInfo(foundJob || null);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <div className="p-5">
      {error && <p className="text-red-500">{error}</p>}
      {info ? (
        <>
          <div className='flex'>
            <div className='pt-5 pl-5'>
              <h2 className="font-semibold text-lg">Description</h2>
              <p className="mb-4 text-sm">{info.description}</p>

              <h2 className="font-semibold text-lg mt-5">Responsibilities</h2>
              <ul className="list-none ml-6 mb-4">
                {info.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-center mb-2 text-sm">
                    <span className="material-icons text-green-400 w-2 h-2 mr-4">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="font-semibold text-lg mt-5">Ideal Candidate</h2>
              <p className='text-sm'><strong>Age:</strong> {info.ideal_candidate.age}</p>
              <p className='text-sm'><strong>Gender:</strong> {info.ideal_candidate.gender}</p>
              <ul className="list-disc ml-6 mb-4">
                {info.ideal_candidate.traits.map((trait, index) => (
                  <li className='text-sm' key={index}>{trait}</li>
                ))}
              </ul>

              <h2 className="font-semibold text-lg mt-5">When & Where</h2>
              <p className="mb-4 text-sm">
                <span className="material-icons inline-block w-4 h-4 mr-3 text-blue-400">location_on</span>
                {info.when_where}
              </p>
            </div>
            <div className='ml-10'>
              <h2 className="text-xl font-semibold">About</h2>
              
              <div className="flex items-center mb-2">
                <span className="material-icons w-4 h-4 text-blue-400">add_circle</span>
                <div className='ml-2'>
                  <strong className='text-sm text-gray-700'>Posted On </strong>
                  <p className='text-xs text-gray-500'>{info.about.posted_on}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <span className="material-icons w-4 h-4 text-blue-400">calendar_today</span>
                <div className='ml-2'>
                  <strong className='text-sm text-gray-700'>Deadline </strong>
                  <p className='text-xs text-gray-500'>{info.about.deadline}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <span className="material-icons w-4 h-4 text-blue-400">location_on</span>
                <div className='ml-2'>
                  <strong className='text-sm text-gray-700'>Location </strong>
                  <p className='text-xs text-gray-500'>{info.about.location}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <span className="material-icons w-4 h-4 text-blue-400">calendar_today</span>
                <div className='ml-2'>
                  <strong className='text-sm text-gray-700'>Start Date </strong>
                  <p className='text-xs text-gray-500'>{info.about.start_date}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-2">
                <span className="material-icons w-4 h-4 text-blue-400">calendar_today</span>
                <div className='ml-2'>
                  <strong className='text-sm text-gray-700'>End Date </strong>
                  <p className='text-xs text-gray-500'>{info.about.end_date}</p>
                </div>
              </div>

              <hr className="border-t border-gray-300 mt-5 mb-2" />
              <p><strong className='text-sm text-gray-700'>Categories </strong></p>
              <p>{info.about.categories.map((category, index) => (
                <span key={index} className={`border rounded-full p-1 mb-1 text-xs ${index % 2 === 0 ? 'border-green-500 text-green-500 mr-2' : 'border-yellow-500 text-yellow-500'}`}>
                  {category}
                </span>
              ))}</p>

              <hr className="border-t border-gray-300 mt-5 mb-2" />
              <p><strong className='text-sm text-gray-700'>Required Skills </strong></p>
              {info.about.required_skills.map((skill, index) => (
                <span
  className="inline-block text-xs border border-gray-200 text-blue-900 ml-[7px] mb-[10px] bg-gray-50 p-1 rounded"
  key={index}
>
  {skill}
</span>

              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};