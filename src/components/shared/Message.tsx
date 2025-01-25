import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 40vh;
`;

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <MessageWrapper>
      {message}
    </MessageWrapper>
  );
};

export default Message;
