import { Link } from 'react-router-dom';
import { aboutObj } from '../../data';
const About = () => {
    return (
        <div className='page-container'>
            <div className='about-content'>
                {aboutObj.map((item, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} className='about-info'>
                            <h2>{item.nameOne}</h2>
                            <p>
                                {item.descriptionOne}
                            </p>
                            {/* <div className='about-image-container'>
                                <img
                                    src={item.imageOne}
                                    alt={item.nameOne}
                                    className='about-image'
                                />
                            </div> */}
                            <div>

                                {item.descriptionTwo.map((itemTwo, index) => {
                                    return (
                                        <p key={index} className="popout-content">
                                            {itemTwo}
                                        </p>
                                    );
                                })}

                                {/* <div className='about-image-container'>
                                    <img
                                        src={item.imageTwo}
                                        alt={item.descriptionTwo}
                                        className='about-image'
                                    />
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default About;
