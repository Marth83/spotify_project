import { Link, useParams } from "react-router-dom"

const Playlist = () => {
    const { id } = useParams();
    return(
        <>
            <h2>Playlist nb {id}</h2>
            <Link to="/" className="btn">Back home</Link>
        </>
        
        );
}

export default Playlist;