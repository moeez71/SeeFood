import React,{ useState } from 'react';
import StarRating from 'react-native-star-rating';
import Theme from '../constants/Theme';

function StarRatings() {

    const[starCount, setStarCount] = useState(5);

    return (
        <StarRating
        disabled={false}
        maxStars={5}
        starSize={32}
        buttonStyle={{ margin: 12}}
        fullStarColor={Theme.COLORS.PRIMARY}
        rating={starCount}
        selectedStar={(rating) => setStarCount(rating)}
      />
    );
}

export default StarRatings;