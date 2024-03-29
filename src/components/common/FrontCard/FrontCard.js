import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Wrapper } from './style';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

const Title = styled.h3`
  color: #000;
  font-weight: 300;
  font-size: 25px;
`;

const Description = styled.p`
  color: #727272;
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 19px;

  margin-top: 11px;
`;

const ActionButton = styled.button`
  font-weight: 400;
  margin-right: 5px;
  margin-left: 0 !important;
  background: #202020 !important;
  border-radius: 4px;
  padding: 16px 24px 17px;
  border: none;
  outline: 0;
  color: #fff !important;
  font-size: 16px;
  vertical-align: top;
  letter-spacing: normal !important;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    box-shadow: 0 6px 7px 0 rgba(0, 0, 0, 0.15), 0 0 5px 0 rgba(0, 0, 0, 0.1);
    opacity: 1;
    transform: translateY(-2px) !important;
    transition: 0.35s !important;
  }
`;
const Card = styled.div`
  height: 100%;
  border-radius: 6px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  color: #202020;

  box-shadow: 0 0 1px rgba(48, 48, 48, 0.54);
  transform: translate3d(0, 0, 0);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.2, 1);

  background: #fff;

  :hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
`;

const Bookimg = styled(Img)`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const Tile = styled(BackgroundImage)`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  ::before {
    -webkit-transition: ease 2000ms background-position;
    -moz-transition: ease 2000ms background-position;
    -ms-transition: ease 2000ms background-position;
    -o-transition: ease 2000ms background-position;
    transition: ease 2000ms background-position !important;
  }
  ::after {
    -webkit-transition: ease 2000ms background-position;
    -moz-transition: ease 2000ms background-position;
    -ms-transition: ease 2000ms background-position;
    -o-transition: ease 2000ms background-position;
    transition: ease 2000ms background-position !important;
  }
  :hover::before {
    background-position: 50% 100% !important;
  }
  :hover::after {
    background-position: 50% 100% !important;
  }
`;
const Content = styled.div`
  padding: 10% 10% 5% 10%;
`;

const FrontCard = ({ title, url, image, subtitle }) => (
  <Wrapper>
    <Card>
      <Tile
        Tag="section"
        //   className={className}
        fluid={image}
        backgroundColor={`#040e18`}
      >
        <Title>{title}</Title>
        <Description> {subtitle}</Description>
      </Tile>
      {/* <Bookimg fluid={image} alt={title} /> */}
      <Content>
        <ActionButton>
          <Link to={url} style={{ color: '#fff', textDecoration: 'none' }}>
            Readc
          </Link>
        </ActionButton>
      </Content>
    </Card>
  </Wrapper>
);

export default FrontCard;
