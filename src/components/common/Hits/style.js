import styled from 'styled-components';

export const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  .faq {
    border-bottom: 2px solid #000000;
  }

  .faq-title {
    border: none;
    background: none;
    padding: 0;
    outline: none;
    width: 100%;
    text-align: left;
    cursor: pointer;

    font-family: Times;
    40px;
    font-weight: bold;
    padding: 24px;
    padding-right: 72px;
    padding-left: 16px;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border-left: 2px solid #000000;
      border-bottom: 2px solid #000000;
      position: absolute;
      top: 34px;
      right: 36px;
      transform: rotate(-45deg);
      transition: transform 0.3s ease-in-out;
    }

    &.active {
      &::after {
        transform: rotate(135deg);
      }
    }
  }

  .faq-content {
    padding: 0 72px 32px 16px;
    line-height: 26px;
    10px;
    color: #000000;
  }
`;
