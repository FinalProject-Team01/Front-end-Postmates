/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ProductInfo';
import { IconImage } from '../Layout/MainBanner';
import xIcon from '../../Assets/xicon.png';
import { Counter } from '../../Style/BasicCounter';
import {
  ADD_TO_CART,
  ADD_INSTRUCTION_TO_CART,
} from '../../Modules/CartReducer';

const fadeIn = keyframes`
from{
  opacity: 0;
}
to{
  opacity:1;
}
`;

const fadeOut = keyframes`
from{
  opacity: 1;
}
to{
  opacity:0;
}
`;

const slideUp = keyframes`
from{
  transform: translateY(200px)
}
to{
  transform: translateY(0px)
}
`;

const slideDown = keyframes`
from{
  transform: translateY(0px)
}
to{
  transform: translateY(200px)
}
`;

const OpacityBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(0%);
  transition: transform 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  background: rgba(0, 0, 0, 0.1);

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 524px;
  height: 512px;
  padding-left: 1.5rem;
  background: #fff;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.33;
    color: #8f95a3;
  }

  animation-duration: 0.15s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const ItemPopup = ({ item, visible, onCancel }) => {
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  const [addInstruction, setAddInstruction] = useState('');

  const onClick = () => {
    /** @todo: add count support */
    dispatch({
      type: ADD_TO_CART,
      payload: { ...item, count: 1, instruction: addInstruction },
    });
    onCancel();
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setAddInstruction(e.target.value);
  };

  const { name, description, img_url, base_price, options } = item;

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }
    // visible 값이 바뀔 때마다 localvisible 동기화
    setLocalVisible(visible);
  }, [localVisible, visible]);

  const prices = options.map((option) => option);
  if (!animate && !localVisible) return null;
  return (
    <OpacityBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <IconImage cursor src={xIcon} onClick={onCancel} />
        <h1>{name}</h1>
        <p>{description}</p>
        <text>${base_price}</text>
        <p>옵션</p>
        <hr />
        <h2>SPECIAL INSTRUCTIONS</h2>
        <textarea
          placeholder="Add Instructions..."
          value={addInstruction}
          onChange={onChange}
        />
        <hr />
        <ButtonGroup>
          <Counter />
          <Button onClick={onClick}>Add To Cart</Button>
        </ButtonGroup>
      </DialogBlock>
    </OpacityBackground>
  );
};

export default ItemPopup;