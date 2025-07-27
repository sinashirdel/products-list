import React from "react";

const Error = ({ message = "An error occurred", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
