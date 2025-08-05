import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { JobOpportunity } from '../types/job';
import axios from 'axios';

export const Description = () => {
  const [info, setInfo] = useState<JobOpportunity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`https://akil-backend.onrender.com/opportunities/${id}`)
      .then((res) => {
        console.log(res);
        
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setInfo(data || null);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
if (!info) {
    return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>);
  }
  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-sm text-gray-700">{info.description}</p>

          <h2 className="text-xl font-bold mt-6 mb-3">Responsibilities</h2>
          <ul>
          {info.responsibilities
          .split('.')
          .filter(item => item.trim() !== '') 
          .map((item, index) => (
            <li key={index} className="flex items-center mb-2 text-sm">
              <span className="material-icons text-green-400 text-base mr-2" aria-hidden="true">
                check_circle
              </span>
              {item.trim()}
            </li>
        ))}
         </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">Requirements</h2>
          <p className="text-sm text-gray-700">{info.requirements}</p>

          <h2 className="text-xl font-bold mt-6 mb-3">Ideal Candidate</h2>
          <p className="text-sm text-gray-700">{info.idealCandidate}</p>

          <h2 className="text-xl font-bold mt-6 mb-3">When & Where</h2>
          <p className="text-sm text-gray-700">
            <span className="material-icons align-middle text-blue-400 mr-2">location_on</span>
            {info.whenAndWhere}
          </p>
        </div>
        <div className="w-full md:w-80">
          <h2 className="text-lg font-semibold mb-4">Opportunity Details</h2>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">business</span>
            <div>
              <strong className="text-sm text-gray-700 block">Organization</strong>
              <p className="text-xs text-gray-600">{info.orgName}</p>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">calendar_today</span>
            <div>
              <strong className="text-sm text-gray-700 block">Posted On</strong>
              <p className="text-xs text-gray-600">{new Date(info.datePosted).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">event</span>
            <div>
              <strong className="text-sm text-gray-700 block">Deadline</strong>
              <p className="text-xs text-gray-600">{new Date(info.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">play_arrow</span>
            <div>
              <strong className="text-sm text-gray-700 block">Start Date</strong>
              <p className="text-xs text-gray-600">{new Date(info.startDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">stop</span>
            <div>
              <strong className="text-sm text-gray-700 block">End Date</strong>
              <p className="text-xs text-gray-600">{new Date(info.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start mb-3">
            <span className="material-icons text-blue-500 mr-2">place</span>
            <div>
              <strong className="text-sm text-gray-700 block">Location</strong>
              <p className="text-xs text-gray-600">
                {Array.isArray(info.location) ? info.location.join(', ') : info.location}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <strong className="text-sm text-gray-700 block mb-1">Categories</strong>
            <div className="flex flex-wrap gap-2">
              {info.categories?.map((cat, index) => (
                <span
                  key={index}
                  className="border border-yellow-500 text-yellow-600 text-xs px-2 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mt-6 mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {info.requiredSkills?.map((skill, index) => (
              <span
                key={index}
                className="text-xs border border-gray-300 px-2 py-1 rounded bg-gray-50 text-blue-900"
              >
                {skill}
              </span>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
