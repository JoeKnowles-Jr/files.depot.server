import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Video from './Video';
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from '../actions/videosAction';

const VideoGrid = ({ currentUser }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadVideos());
    }, [dispatch]);
    const { videos } = useSelector(state => state.videos);

    return (
        <VGrid>
            {videos && (videos.map((v) => {
                return (
                    <Link key={v._id} to={`/videoWatch/${v._id}`}>
                        <Video currentUser={currentUser} video={v} />
                    </Link>
                );
            }))}
        </VGrid>
    );
}

const VGrid = styled.div`
  padding: 1rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 0fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  a {
      text-decoration: none;
  }
`;

export default VideoGrid;