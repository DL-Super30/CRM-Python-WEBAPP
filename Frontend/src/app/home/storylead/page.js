// export default function lead(){
//     const data =[
//         {
//            createdOn:'16-08-24',
//            leadStatus:'cold lead',
//            name:'Anil Kumar',
//            phone:'95504515130',
//            stack:'lifeSkills',
//            class:'BLR Class Room'
//         },
//         {
//             createdOn:'17-08-24',
//             leadStatus:'cold lead',
//             name:'Anil Kumar',
//             phone:'9587451263',
//             stack:'FullStack-Python',
//             class:'Online'
//          },
//          {
//             createdOn:'18-08-24',
//             leadStatus:'cold lead',
//             name:'Anil Kumar',
//             phone:'95504515130',
//             stack:'lifeSkills',
//             class:'BLR Class Room'
//         },
//     ];
//     return(
//      <main>
//         <div className="constainer-lg border shadow-lg mt-5 p-5">
//             <div className="flex flex-col lg:flex-row lg:justify-between">
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
//                 <button className="text-2xl">456</button>
//                 <select className="text-2xl text-blue-400 border rounded">
//                     <option value={""} className="text-lg text-black ">All Leads</option>
//                     <option value={"hari"} className="text-lg text-black">Hari</option>
//                     <option value={"Krishna"} className="text-lg text-black">Krishna</option>
//                     <option value={"Jayanth"} className="text-lg text-black">Jayanth</option>
//                 </select>
//                 </div>
//                 <div className="flex flex-col lg:flex-row gap-2">
//                    <select className=" hover:bg-blue-500 hover:text-white border rounded p-1">
//                     <option className="">Create Lead</option>
//                     <option className="">Create Lead</option>
//                    </select>
//                    <select className=" lg:hover:bg-blue-500 lg:hover:text-white  rounded p-1">
//                     <option className="">Create Lead</option>
//                     <option className="">Create Lead</option>
//                    </select>
//                 </div>
//             </div>
//             <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
//                 <input type="text" placeholder="Search...." className="border rounded p-1 w-3/12 mt-2"/>
//                 <p className="flex gap-5 border rounded ">
//                     <button className="hover:bg-blue-500 hover:text-white text-xl border-none rounded p-2 ">Table</button>
//                     <button className="hover:bg-blue-500 hover:text-white text-xl  border-none rounded p-2 ">Kanban</button>
//                 </p>
//             </div>

//             <div className="overflow-x-auto pt-5">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-400">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"><input type="checkbox"/>Created on</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Lead Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Stack</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">classMode</th>

//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//         {data.map(dataAt=>(
//             <tr>
//             <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox"/>{dataAt.createdOn}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{dataAt.leadStatus}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{dataAt.name}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{dataAt.phone}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-orange-500 text-black">{dataAt.stack}</span>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-rose-500 text-black">{dataAt.class}</span>
//             </td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>

//   </div>
//   </main>
//   )
// }
"use client"
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../../../component/navbar';

export default function Lead() {
  const [showForm, setShowForm] = useState(false);


  const data = [
    {
      createdOn: '16-08-24',
      leadStatus: 'cold lead',
      name: 'Anil Kumar',
      phone: '95504515130',
      stack: 'lifeSkills',
      class: 'BLR Class Room'
    },
    {
      createdOn: '17-08-24',
      leadStatus: 'cold lead',
      name: 'Anil Kumar',
      phone: '9587451263',
      stack: 'FullStack-Python',
      class: 'Online'
    },
    {
      createdOn: '18-08-24',
      leadStatus: 'cold lead',
      name: 'Anil Kumar',
      phone: '95504515130',
      stack: 'lifeSkills',
      class: 'BLR Class Room'
    },
  ];

  const handleCreateLeadClick = () => {
    setShowForm(!showForm);
  };
  const handleCloseFormClick = () => {
    setShowForm(false);
  };


  return (
    <main>
      <Navbar Navbar={Navbar}/>
      <div className="container-lg border shadow-lg mt-5 p-5">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
            <button className="text-4xl text-blue-400  "><i class="fa-regular fa-id-card"></i></button>
            <select className="text-2xl text-blue-400 border rounded">
              <option value="" className="text-lg text-black">All Leads</option>
              <option value="hari" className="text-lg text-black">Hari</option>
              <option value="Krishna" className="text-lg text-black">Krishna</option>
              <option value="Jayanth" className="text-lg text-black">Jayanth</option>
            </select>

          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <button
              className="hover:bg-blue-500 hover:text-white border rounded p-2"
              onClick={handleCreateLeadClick}
            >
              Create Lead
            </button>

            <select className="lg:hover:bg-blue-500 lg:hover:text-white rounded p-1">
              <option>Create Lead</option>
              <option>Create Lead</option>
            </select>
          </div>

        </div>
        <div>
          <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Search...."
              className="border rounded p-1 w-3/12 mt-2"
            />
            <p className="flex gap-5 border rounded-xl">
              <button className="hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2"><i class="fa-solid fa-table"></i> Table</button>
              <button className="hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2"><i class="fa-solid fa-chart-simple"></i> Kanban</button>
            </p>
          </div>
        </div>

        {/* Conditionally Render Form */}
        {showForm && (
          <div className="mt-5 p-5 border rounded bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lead Status</label>
                  <select
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CC</label>
                  <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">leadSource</label>
                  <select
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stack</label>
                  <select
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee Quoted</label>
                  <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Mode</label>
                  <select
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Batch Timing</label>
                  <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next nextFollowUp</label>
                  <input type="date" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">description</label>
                  <textarea className=" block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" rows="1"></textarea>
                </div>
              </div>
              <div className="flex  gap-4 mt-4">
                <button type="button" className=" text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">Create</button>
                <button type="button" className=" text-black px-8 py-1  border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">Cancel</button>
                <button type="button" className=" text-black px-8 py-1  border border-red-500 rounded-full hover:bg-red-600 hover:text-white" onClick={handleCloseFormClick} >Close</button>

              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto pt-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  <input type="checkbox" /> Created on
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Lead Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Stack</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Class Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((dataAt, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" /> {dataAt.createdOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataAt.leadStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataAt.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataAt.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-orange-500 text-black">{dataAt.stack}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-rose-500 text-black">{dataAt.class}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container mx-auto p-4">

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-green-200">
              Not Contacted
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-blue-200">
              Attempted
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-orange-200">
              Opportunity
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-sky-200">
              Cold Lead
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
          </div>


          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              No leads Found
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              <div className="bg-white border rounded text-start p-2 text-xs">
                <p>Harikrishna</p>
                <p>Details..<span>1</span></p>
                <p>Additional Info</p>
                <p>Additional Info</p>
                <p>Additional Info</p>
                <p>Additional Info</p>
              </div>
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              No leads Found
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              <div className='pb-2'>
                <div className="bg-white border rounded text-start p-2  text-xs">
                  <p>Harikrishna</p>
                  <p>Details..<span>1</span></p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                </div>
              </div>
              <div className='pb-2'>
                <div className="bg-white border rounded text-start p-2  text-xs">
                  <p>Harikrishna</p>
                  <p>Details..<span>1</span></p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
