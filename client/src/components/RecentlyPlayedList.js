import { formatDuration } from '../utils';
import { StyledTrackList } from '../styles';

const RecentlyPlayedList = ({ tracks }) => (
  <>
    {tracks && tracks.length ? (
      <StyledTrackList>
        {tracks.map((item, i) => (
          <li className="track__item" key={i}>
            <div className="track__item__num">{i + 1}</div>
            
            <div className="track__item__title-group">
              {item.track.album.images.length && item.track.album.images[2] && (
                <div className="track__item__img">
                  <img src={item.track.album.images[2].url} alt={item.track.name} />
                </div>
              )}
              <div className="track__item__name-artist">
                <div className="track__item__name overflow-ellipsis">
                  {item.track.name}
                </div>
                <div className="track__item__artist overflow-ellipsis">
                  {item.track.artists.map((artist, i) => (
                    <span key={i}>
                      {artist.name}{i !== item.track.artists.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="track__item__album overflow-ellipsis">
              {item.track.album.name}
            </div>
            <div className="track__item__duration">
              {formatDuration(item.track.duration_ms)}
            </div>
          </li>
        ))}
      </StyledTrackList>
    ) : (
      <p className="empty-notice">No tracks available</p>
    )}
  </>
);

export default RecentlyPlayedList;
