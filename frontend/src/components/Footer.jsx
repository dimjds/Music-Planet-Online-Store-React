import React from 'react';
import { Link } from 'react-router-dom'; // Предполагается, что вы используете React Router для маршрутизации

const Footer = () => {
    return (
        <footer>
            <div className='ml-20 mt-20'>
                <h3 className='font-bold text-3xl'>Связаться с нами</h3>
                <p className='mt-3'>Email: music.planet@gmail.com</p>
                <p>Номер телефона: 022-24-93-72</p> <br />
                <Link to="/contact">
                    <a className="conatct-button mt-10">Остались вопросы?</a>
                </Link>
            </div>
            <div className="map-container">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.822997597211!2d-122.4056977847825!3d37.79084137975753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806a65b38c7f%3A0x31c974724a8d5095!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1613061606879!5m2!1sen!2sus"
                    width="900"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
            </div>
        </footer>
    );
};

export default Footer;