import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Slider = styled.span`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    background-color: ${props => props.isOn ? '#04466A' : '#4D5153'};
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s;

    &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${props => props.isOn ? '#E5EAED' : '#B3B7B9'};
        transition: transform 0.3s;
        transform: ${props => props.isOn ? 'translateX(26px)' : 'translateX(0)'};
    }
`;

export const SwitchRentstate = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <SwitchContainer onClick={toggleSwitch}>
            <Slider isOn={isOn} />
        </SwitchContainer>
    );
};

export default SwitchRentstate;