import React from 'react';
import styled from 'styled-components';
import { deleteVideo } from '../Repository';
import nofileimg from '../img/file_broken.png';
import LikeDislike from './LikeDislike';

const getThumbUrl = (thumbfile) => {
    if (!thumbfile) { return null; }
    return 'http://api.joeknowles.com/apps/vm/content/thumbs/' + thumbfile;
};

// const getVideoUrl = (videofile) => {
//     return 'http://api.joeknowles.com/apps/vm/content/videos/' + videofile;
// };

const Video = ({ update, currentUser, video }) => {
    const [v, setV] = React.useState(video);
    const [u, setU] = React.useState(currentUser);

    React.useEffect(() => {
        if (video) {
            setV(video);
        }
    }, [v]);

    React.useEffect(() => {
        if (currentUser) {
            setU(currentUser);
        }
    }, [u]);

    const performDelete = async (e) => {
        e.preventDefault();
        await deleteVideo(v._id);
        window.location.reload();
    };

    const isAdmin = (u) ? u.role === 'Admin' : false;
    const uid = (u) ? u._id : null;

    const thumb = getThumbUrl(v.thumbfile);

    return (
        <SVideo>
            <Thumb>
                <img src={thumb || nofileimg} alt='thumbnail' />
                {v.duration && <TimeDisplay>{v.duration}</TimeDisplay>}
                {isAdmin && <DeleteButton onClick={performDelete}>X</DeleteButton>}
            </Thumb>

            <VideoTitle>
                <h3>{v.title || "No title"}</h3>
                <ViewsDates>
                    <section className='vd-left'>{v.views || 0} views</section>
                    <section className='vd-right'>
                        <LikeDislike update={update} user={u} setUser={setU} video={v} setVideo={setV}/>
                    </section>
                </ViewsDates>
            </VideoTitle>
        </SVideo>
    );
};

const VideoTitle = styled.section`
    position: relative;
    height: 45%;
    padding: 0.35rem 0 0 0.2rem;
    background-color: #666;
    align-items: left;
    color: white;
    h3 {
        margin: 0;
        padding: 0;
    }
`;

const Thumb = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    height: 55%;
    img {
        width: 100%;
        height: 100%;
    }

`;

export const SVideo = styled.div`
    overflow: hidden;
    margin: 0;
    padding: 0;
    border-radius: 1rem;
    box-shadow: 5px 5px #090;
    background-color: #333;
    border: 1px solid blue;
    width: 220px;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: top;
    flex-direction: column;
`;

const ViewsDates = styled.section`
    width: 100%;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 2%;
    left: 5%;
    .vd-left {
        width: 30%;
    }
    .vd-right {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 50%;
        padding-right: 1rem;
    }
`;

const TimeDisplay = styled.span`
    z-index: 3;
    top: 75%;
    right: 1%;
    position: absolute;
    background-color: #282828;
    color: #ccc;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
`;

const DeleteButton = styled.span`
    position: absolute;
    background-color: #999;
    padding: 0.25rem;
    top: 2%;
    right: 2%;
    border-radius: 1rem;
    cursor: pointer;
`;

export default Video;