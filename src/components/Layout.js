import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { css, keyframes } from 'styled-components';
import debounce from 'lodash/debounce';

const slideDown = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const ExternalLink = styled.a`
  color: #01c5ff;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 325px) {
    font-size: 1rem;
  }
`;

const keyframeAnimation = css`
  ${slideDown} 0.25s ease-in-out 1
`;

const HeaderWrapper = styled.div`
  position: ${(props) => (props.fixed ? 'fixed' : 'relative')};
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  animation: ${(props) => (props.fixed ? keyframeAnimation : 'none')};
`;

const Logo = styled.img`
  width: 75px;
  height: 50px;
  margin-bottom: 0;

  @media screen and (min-width: 640px) {
    width: 120px;
    height: 80px;
  }
`;

const HeaderInner = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem;
  height: 6rem;

  display: flex;
  align-items: center;
`;

const NavWrapper = styled.div`
  flex: 1;
`;

const MainNav = styled.nav`
  padding: 0 0 0 1.45rem;
  text-align: right;
`;

const SubNavContainer = styled.div`
  text-align: right;
`;

const SubNav = styled.nav`
  display: inline-block;
  padding: 0 0rem;
  text-align: right;

  & + &::before {
    content: '|';
    margin: 0 0.25rem;
    color: #cecece;

    @media screen and (min-width: 640px) {
      margin: 0 0.5rem;
    }
  }
`;

const StyledNavItem = styled(Link)`
  display: inline-block;
  padding: 0.2rem 0;
  text-decoration: none;
  color: ${(props) => (props.external ? '#01c5ff' : '#3c3c3c')};

  & + & {
    margin-left: 1rem;
  }

  &:first-child {
    display: none;
  }

  @media screen and (min-width: 640px) {
    &:first-child {
      display: inline-block;
    }
  }
`;

const Body = styled.div`
  overflow: auto;
`;

const Header = (props) => (
  <HeaderWrapper fixed={props.fixed}>
    <HeaderInner>
      <NavWrapper>
        <MainNav>
          <StyledNavItem to="/">{'Home'}</StyledNavItem>
          <StyledNavItem to="/about">{'교회소개'}</StyledNavItem>
          <StyledNavItem to="/map">{'오시는 길'}</StyledNavItem>
          <StyledNavItem to="/contact">{'Contact'}</StyledNavItem>
        </MainNav>

        <SubNavContainer>
          <SubNav>
            <ExternalLink
              href="https://facebook.com/joyfulccchurch"
              target="_blank"
            >
              {'Facebook'}
            </ExternalLink>
          </SubNav>
          <SubNav>
            <ExternalLink
              href="https://www.facebook.com/jccc.km.youngadults"
              target="_blank"
            >
              {'청년부 Facebook'}
            </ExternalLink>
          </SubNav>
        </SubNavContainer>

        <SubNavContainer>
          <SubNav>
            <ExternalLink href="https://www.jcccem.org" target="_blank">
              {'EM Website'}
            </ExternalLink>
          </SubNav>
          <SubNav>
            <ExternalLink
              href="https://www.facebook.com/jcccenglishministry"
              target="_blank"
            >
              {'EM Facebook'}
            </ExternalLink>
          </SubNav>
        </SubNavContainer>
      </NavWrapper>
    </HeaderInner>
  </HeaderWrapper>
);

const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
`;

const Copyright = styled.div`
  font-weight: 100;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.25rem;
`;

const Footer = () => (
  <FooterWrapper>
    <Copyright>
      {`Copyright ©${new Date().getFullYear()} Joyful Christian Community Church. All rights reserved.`}
    </Copyright>
  </FooterWrapper>
);

class TemplateWrapper extends React.Component {
  state = {
    showFixedNav: false,
  };

  render() {
    const { children } = this.props;
    const { showFixedNav } = this.state;

    return (
      <Body>
        <Helmet>
          <meta
            name="keywords"
            content={[
              '기쁜우리교회',
              '교회',
              '목양',
              '성경',
              '사역',
              '새가족',
              '선교',
              '주일',
              '말씀',
              '설교',
              '집회',
              'SBS',
              'Joyful Christian Community Church',
              'joyful',
              'joyfulccc',
              'jccc',
              'church',
              'sermon',
              'mission',
              'glendale',
            ].join(', ')}
          />
          <script
            type="application/ld+json"
            dangerouselySetInnerHTML={{
              __html: `{
                "@context": "http://schema.org",
                "@graph": [
                  {
                    "@type": "Place",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Glendale",
                      "addressRegion": "CA",
                      "postalCode": "91205",
                      "streetAddress": "333 E Colorado St, "
                    },
                    "name": "Joyful Cristian Community Church"
                  }
                ]
              }`,
            }}
          />
        </Helmet>

        <Header />

        {children}

        <Footer />

        {showFixedNav && <Header fixed />}
      </Body>
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debouncedHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedHandleScroll);
  }

  handleScroll = (e) => {
    const scrollTop = document.documentElement.scrollTop;
    const headerHeight =
      parseFloat(getComputedStyle(document.documentElement).fontSize, 10) * 6;

    if (!this.state.showFixedNav && scrollTop > headerHeight) {
      this.setState({
        showFixedNav: true,
      });
    } else if (scrollTop < headerHeight) {
      this.setState({
        showFixedNav: false,
      });
    }
  };

  debouncedHandleScroll = debounce(this.handleScroll, 300);
}

export default TemplateWrapper;
