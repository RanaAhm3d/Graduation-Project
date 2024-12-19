import React from 'react';

const RoleCard = ({ title, image, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-r ${
        isSelected ? 'from-[#021826] to-[#06507F] shadow-2xl scale-110' : 'from-[#073856] to-[#073856]'
      } p-6 rounded-lg shadow-lg text-center flex flex-col justify-between `}
    >
      <img src={image} alt={`${title} icon`} className="mx-auto w-24 h-24 md:w-[200px] md:h-[200px] mb-4" />
      <h3 className={`text-lg font-semibold  ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
    </div>
  );
};

export default RoleCard;
