import React from 'react';

const Tag = ({ value, onDelete }) => {
    return (
        <div className="flex items-center bg-gray-300 rounded-full px-3 py-2 mx-0 my-2">
            <span className="mr-2 font-bold">{value}</span>
            <button
                onClick={onDelete}
                className="flex justify-center items-center w-6 h-6 pb-1 rounded-full bg-black text-white font-large focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};

export default Tag;