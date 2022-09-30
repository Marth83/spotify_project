import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import {
  getTopArtists,
} from '../spotify';
import {
  SectionWrapper,
  ArtistsGrid
} from '../components';

const TopArtists = () => {

    const [topArtists, setTopArtists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const userTopArtists = await getTopArtists();
          setTopArtists(userTopArtists.data);
        };
    
        catchErrors(fetchData());
      }, []);


    return(         
        <>
            {topArtists && (
            <main>
              <SectionWrapper title="Top artists this month" seeAllLink="/topArtists">
                <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
              </SectionWrapper>
            </main>
          )}
        </>
    );
}
export default TopArtists;