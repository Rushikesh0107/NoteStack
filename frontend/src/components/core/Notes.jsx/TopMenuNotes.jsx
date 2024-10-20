import React, { useState, useEffect } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { getDepartments } from '../../../services/operations/departmentApi';
import { getSubject } from '../../../services/operations/subjectApi';
import { getNotes } from '../../../services/operations/notesApi';

function TopMenuNotes() {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [department, setDepartment] = useState('Department');
  const [departmentId, setDepartmentId] = useState('');
  const [semester, setSemester] = useState('Semester');
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('Subject');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useDispatch(); // Corrected variable name
  const { departments } = useSelector(state => state.department); 
  const {subjects} = useSelector(state => state.subject);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getDepartments()); // Fetch departments from API
  }, []);

  console.log(departments);

  const semestersList = [
    { semester: "1" },
    { semester: "2" },
    { semester: "3" },
    { semester: "4" },
    { semester: "5" },
    { semester: "6" },
    { semester: "7" },
    { semester: "8" },
  ];

  const handleDepartmentClick = () => {
    setIsDepartmentOpen(prev => !prev);
  };

  const handleSemesterClick = () => {
    setIsSemesterOpen(prev => !prev);
  }

  const handleSubjectClick = () => {
    setIsSubjectOpen(prev => !prev);
  }

  const handleDepartmentSelect = (departmentId, departmentName) => {
    setDepartment(departmentName);
    setDepartmentId(departmentId);
    setIsDepartmentOpen(false);
  };

  const handleSemesterSelect = (semester) => {
    setSemester(semester);
    dispatch(getSubject(departmentId, semester));
    setIsSemesterOpen(false);
  }

  const handleSubjectSelect = (subjectId, subjectName) => {
    setSubjectId(subjectId);
    setSubjectName(subjectName);
    dispatch(getNotes(subjectId));
    setIsSubjectOpen(false);
  }

  return (
    <>
      {isMobile ? (
        <>
          <div>
            <button>Filter</button>
          </div>
        </>
      ) : (
        <div className="flex justify-around gap-10 pl-10 pr-10 pb-5">
          {/* Department Dropdown */}
          <div className="relative flex items-center w-[340px] rounded-lg">
            <button
              className="bg-gray-300 p-4 w-full flex items-center justify-between font-bold rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-gray-400"
              onClick={handleDepartmentClick}
            >
              {department}
              {isDepartmentOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>

            {isDepartmentOpen && (
              <div className="bg-gray-300 absolute top-20 flex flex-col rounded-lg p-2 w-full">
                {departments.map((item) => (
                  <div
                    key={item._id}
                    className="w-full hover:bg-gray-400 p-4 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                    onClick={() => handleDepartmentSelect(item._id, item.departmentName)}
                  >
                    <span className="font-semibold text-sm">
                      {item.departmentName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Semester Dropdown */}
          <div className="relative flex flex-col items-center w-[340px] rounded-lg">
            <button
              className="bg-gray-300 p-4 w-full flex items-center justify-between font-bold rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-gray-400"
              onClick={handleSemesterClick}
            >
              {semester}
              {isSemesterOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>

            {isSemesterOpen && (
              <div className="bg-gray-300 absolute top-20 flex flex-col rounded-lg p-2 w-full">
                {semestersList.map((item, i) => (
                  <div
                    key={i}
                    className="w-full hover:bg-gray-400 p-4 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                    onClick={() => handleSemesterSelect(item.semester)}
                  >
                    <button className="font-semibold text-sm">
                      {item.semester}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject Dropdown */}
          <div className="relative flex flex-col items-center w-[340px] rounded-lg">
            <button
              className="bg-gray-300 p-4 w-full flex items-center justify-between font-bold rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-gray-400"
              onClick={handleSubjectClick}
            >
              {subjectName}
              {isSubjectOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>

            {isSubjectOpen && (
              <div className="bg-gray-300 absolute top-20 flex flex-col rounded-lg p-2 w-full">
                {subjects.map((item, i) => (
                  <div
                    key={i}
                    className="w-full hover:bg-gray-400 p-4 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                    onClick={() => handleSubjectSelect(item._id, item.name)}
                  >
                    <button className="font-semibold text-sm">
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TopMenuNotes;
