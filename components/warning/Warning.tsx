import  { useEffect, useState } from 'react';

interface WarningProps {
  message: string;
  onClose: () => void;
}

const Warning = ({ message, onClose }: WarningProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30);

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    <div className="absolute p-2 mt-12 ml-40 border border-red-500 bg-gradient-to-r from-yellow-200 to-red-200 rounded text-red-800 w-48 shadow-lg">
      {message}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200">
        <div
          className="bg-red-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Warning;
