import { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, RecentlyPlayedList } from '../components';

const History = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    console.log("Calling API...");
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };

    catchErrors(fetchData());
  }, []);
  
    console.log(recentlyPlayed);

  return (
    <main>
      <SectionWrapper title="Recently played" breadcrumb={true}>

        {recentlyPlayed && recentlyPlayed.items && (
          <RecentlyPlayedList tracks={ recentlyPlayed.items } />
        )}
      </SectionWrapper>
    </main>
  );
};

export default History;
