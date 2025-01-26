import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

interface StarProps {
  value: number;
}

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(FontAwesomeIcon)`
  color: #FFD700;
  margin-right: 5px;
`;

const StarComponent: React.FC<StarProps> = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <StarWrapper>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`full-${index}`} icon={solidStar} />
        ))}
      {halfStar && <Star icon={solidStar} style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`empty-${index}`} icon={regularStar} />
        ))}
    </StarWrapper>
  );
};

export default StarComponent;
