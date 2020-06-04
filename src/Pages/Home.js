/**
 * HomePage
 * @flow
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import Helmet from 'react-helmet';
import Color from 'color';
import { Section } from '../components';
// import Hero from '../../Home/Hero';
// import Tile from '../../Home/Tile';
// import { VideoListWithData } from '../../Video';
import { WeeklyListWithData } from '../Weekly';
import { VideoListWithData } from '../Video';
// import { BulletinListWithData } from '../../Bulletin';
// import community from './community.png';
// import education from './education.png';
// import group from './group.png';
// import ministry from './ministry.png';
// import mission from './mission.png';
// import welcome from './welcome.png';
// import covid19 from './covid-19.jpg';
// import onlineOffering from './online-offering.jpg';
// import team from './team.png';
// import vision from './vision.png';
// import '@zendeskgarden/react-tabs/dist/styles.css';

const HeaderLink = styled(Link)`
  display: inline-block;
  height: 100%;
  color: #3c3c3c;
  line-height: 2;
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  padding: 0;

  &:last-child {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 769px) {
    padding: 0.5rem 1.5rem;
  }
`;

const ScheduleWrapper = styled.div`
  padding: 2rem;
`;

// const BannerText = styled.div`
//   margin: 0.1rem 0;
//   font-size: 1.2rem;

//   @media screen and (min-width: 769px) {
//     font-size: 1.4rem;
//   }
// `;

const YoutubeLink = styled.a`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 250px;
  padding: 0.425rem 2rem;
  background-color: ${(props) => (props.disabled ? '#CECECE' : '#2196f3')};
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #ffffff;
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      Color(props.disabled ? '#CECECE' : '#a0a0a0')
        .lighten(0.5)
        .string()};
    color: #3c3c3c;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    width: 165px;
  }
`;

const Button = styled.button`
  margin-top: 15px;
  width: 250px;
  padding: 0.425rem 2rem;
  background-color: ${(props) => (props.disabled ? '#CECECE' : '#2196f3')};
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #ffffff;
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      Color(props.disabled ? '#CECECE' : '#a0a0a0')
        .lighten(0.5)
        .string()};
    color: #3c3c3c;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    width: 165px;
  }
`;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: center;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: ${(props) => props.justifyContent || 'space-around'};
  align-items: center;
  margin-bottom: ${(props) => props.margin || '10px'};
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  height: auto;
  background-color: white;
  object-fit: contain;

  @media screen and (min-width: 769px) {
    width: 65%;
    max-width: 70vw;
    max-height: 99vw;
  }

  @media screen and (max-width: 375px) {
    height: 75%;
    margin: auto;
  }
`;

const Popup = styled.img`
  display: flex;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  /* object-fit: contain; */

  /* @media screen and (min-width: 769px) {
    width: 100%;
    max-width: 70vw;
    max-height: 99vw;
  } */
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: auto;
  left: 0;

  @media screen and (min-width: 769px) {
    width: 100%;
    max-width: 70vw;
    max-height: 99vw;
    bottom: 0;
    left: 0;
  }

  /* @media screen and (max-width: 375px) {
    width: 100%;
    height: 4%;
    bottom: 1px;
    top: 96%;
  } */
`;

const PopupLink = styled.a`
  display: flex;
  justify-content: center;
  font-size: 0.7rem;
  text-decoration: none;
  padding: 0.425rem 2rem;
  width: 200px;
  border: none !important;
  outline: 0;
  background-color: transparent;

  @media screen and (min-width: 769px) {
    width: 240px;
    font-size: 0.7rem;
  }
`;

export default class HomePage extends Component {
  state = {
    open: false,
    offering: false,
  };

  render() {
    const { props } = this;
    const { open, offering } = this.state;

    return (
      <article>
        <Section>
          <ContentWrapper>
            <VideoListWithData
              category={'SUNDAY'}
              header={<HeaderLink to="/videos/sunday">{'주일말씀'}</HeaderLink>}
              location={props.location}
              first={3}
              moreLink={'/videos/sunday'}
              fetchPolicy={'cache-and-network'}
            />
          </ContentWrapper>

          <ContentWrapper>
            <WeeklyListWithData
              header={<HeaderLink to="/weekly">{'주보'}</HeaderLink>}
              location={props.location}
              history={props.history}
              first={3}
              moreLink={'/weekly'}
              fetchPolicy={'cache-and-network'}
            />
          </ContentWrapper>

          {/*          
        
      
    <ContentWrapper>
              <BulletinListWithData
                header={<HeaderLink to="/album">{'행사앨범'}</HeaderLink>}
                location={props.location}
                first={3}
                moreLink={'/album'}
                fetchPolicy={'cache-and-network'}
              />
 </ContentWrapper> */}
        </Section>
      </article>
    );
  }

  // Open popup when first visit
  // componentDidMount() {
  //   // save data in session storage for modal to open only once after first time visiting
  //   let visited = sessionStorage['alreadyVisited'];

  //   if (visited) {
  //     this.setState({ open: false });
  //   } else {
  //     sessionStorage['alreadyVisited'] = true;
  //     this.setState({ open: true });
  //   }

  //   // remove data from session storage when page refreshes so that user can see pop up once again.
  //   window.onbeforeunload = e => {
  //     e.preventDefault();
  //     sessionStorage.removeItem('alreadyVisited');
  //   };
  // }
}
