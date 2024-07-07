import { useEffect, useState } from 'react';
interface AlertProps {
    type:String;
    message:String;
    onClose():void
}
const AlertBox = ({ type, message, onClose }:AlertProps) => {
  const [visible, setVisible] = useState<Boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (visible) {
      const interval = setInterval(():void => {
        setProgress((prev:number):number => Math.min(prev + 100 / 50, 100));
      }, 100);

      const timer = setTimeout(():void => {
        setVisible(false);
        onClose();
        clearInterval(interval);
      }, 5000);

      return ():void => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [visible, onClose]);

  const getAlertStyles = (type:String):String => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  return (
    visible && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`flex flex-col justify-between border-l-4 ${getAlertStyles(type)} transition-all duration-150 ease-in-out rounded-md shadow-md w-72`}>
            <div className="flex justify-between items-center p-2">
              <span>{message}</span>
              <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
            </div>
            <div className="relative w-full h-1 bg-gray-300">
              <div
                className="absolute top-0 left-0 bg-gray-600 h-full"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
              ></div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default AlertBox;
