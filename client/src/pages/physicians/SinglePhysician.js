import { useParams } from 'react-router-dom';
import { physicians } from '../../data';

const SinglePhysician = () => {
    const { physicianId } = useParams();
    const physician = physicians.find((item) => {
        const [firstName, ...otherNames] = item.name.split(' ');
        const lastName = otherNames.join(' ').replace(/\s/g, '-'); // Replace spaces with hyphens
        const fullName = `${firstName}-${lastName}`.toLowerCase();
        return fullName === physicianId;
    });

    if (!physician) {
        return <p>Physician not found</p>;
    }

    // Destructure the physician object
    const { bio, image, name } = physician;

    // Replace 'ACU' with 'Acupuncture' in the physician's name
    const displayName = name.replace('ACU', 'Acupuncture');

    const cacheKey = 'cached_yelp_reviews';

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const renderPracticeEmphasis = (emphasis) => {
        if (emphasis && emphasis.length > 0) {
            return (
                <div className='specialties-item'>
                    <h4>Practice Emphasis</h4>
                    <ul className='specialties-list'>
                        {emphasis.map((item, index) => (
                            <li key={index} className='specialties-list-item'>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    const getCachedReviews = () => {
        const cachedDataBeforeJson = localStorage.getItem(cacheKey);
        if (cachedDataBeforeJson) {
            const cachedDataOne = JSON.parse(cachedDataBeforeJson);
            const reviewsArray = JSON.parse(cachedDataOne.reviews); // Parse the reviews string into an array
            return reviewsArray.map((review, index) => {
                const filteredName = name
                    .split(/[,.]\s*/)
                    .filter(
                        (word) => !word.includes('.') && !word.includes(',')
                    )
                    .join(' ');

                const namesToSearch = filteredName.split(/\s+/);

                const regexPattern = namesToSearch
                    .map(
                        (name) => `\\b${name.replace('.', '\\.')}(?![\\w.,])\\b`
                    )
                    .join('|');

                const regex = new RegExp(regexPattern, 'i');

                const matchedNames = review.text.match(regex);

                if (matchedNames) {
                    if (review.author_name === "Pdub ..") {
                    } else {
                        return (
                            <div key={index} className='single-review-container'>
                                <div className='review-top-info'>
                                    <div
                                        className='user-icon'
                                        style={{
                                            backgroundImage: `url(${review.profile_photo_url})`,
                                        }}>
                                        {!review.profile_photo_url && (
                                            <i className='fas fa-user-circle'></i>
                                        )}
                                    </div>
                                    <div className='review-name-container'>
                                        <div className='user-name'>
                                            {review.author_name}{' '}
                                            <i className='fab fa-yelp'></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-info'>
                                    <i
                                        className='fa fa-quote-left'
                                        aria-hidden='true'></i>
                                    <i
                                        className='fa fa-quote-right'
                                        aria-hidden='true'></i>
                                    <p className='review-paragraph'>{review.text}</p>
                                </div>
                                <div className='google-link'>
                                    <a href={review.author_url} target="_blank" rel="noopener noreferrer" title="Facebook Review">
                                        <i style={{ color: 'white' }} className="fab fa-google fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        );
                    }
                }
            });
        }
        return null;
    };

    return (
        <>
            <div style={{ padding: '50px', margin: '0 auto', display: 'flex' }}>
                <div className='page-grid'>
                    <div className='physician-left'>
                        <div className='physician-image'>
                            <img src={image} alt={displayName} />
                        </div>
                    </div>
                    <div className='physician-right'>
                        <h5 className='physician-name'>{displayName}</h5>
                        {bio.map((item, index) => (
                            <div key={index}>
                                {index > 0 ? (
                                    <div className='popout-content'><p className='page-description'>{item}</p></div>
                                ) : (
                                    <p className='page-description'>{item}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='reviews-container'>
                {getCachedReviews()}
            </div>
        </>
    );
};

export default SinglePhysician;
