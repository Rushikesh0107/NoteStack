import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div
        className='w-full'
        >
            <div
            className='flex justify-around p-10'
            >
                <button
                className='ont-semibold text-sm bg-black text-white p-2 rounded-lg'
                onClick={() => navigate("/notes")}
                >
                    notes
                </button>

                <button
                className='ont-semibold text-sm bg-black text-white p-2 rounded-lg'
                onClick={() => navigate("/pyq")}
                >
                    pyq
                </button>

                <button
                className='ont-semibold text-sm bg-green-500 text-white p-2 rounded-lg'
                onClick={() => navigate("/pyq")}
                >
                    upload notes
                </button>
            </div>


        </div>
    );
}

export default Home;
