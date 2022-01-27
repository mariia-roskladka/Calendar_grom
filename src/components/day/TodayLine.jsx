import React, { useEffect, useState } from 'react';

const TodayLine = () => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const [marginTop, setMarginTop] = useState({
    top: `${currentHour * 60 + currentMinute - 4}px`,
  });

  useEffect(() => {
    const onMarginTopInterval = setInterval(() => {
      setMarginTop({ top: `${currentHour * 60 + currentMinute - 4}px` });
    }, 60000);

    return () => {
      clearInterval(onMarginTopInterval);
    };
  }, []);

  return (
    <div className="current-minute-line " style={marginTop}>
      <i className="current-minute-line__circle"></i>
    </div>
  );
};

export default TodayLine;