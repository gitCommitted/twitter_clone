import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div id='mid'>
            <h3>About i-tweet</h3>
            <p className='intro'>
            i-tweet is a twitter clone. It is a full-stack web application with a RESTful API backend using React, Redux, JavaScript, CSS, HTML, Python and more. 
            </p>
                <Link onClick={() => window.open('https://github.com/gitCommitted/twitter_clone/wiki')} className='repo'>
                Click here to checkout the i-tweet wiki on github 
                </Link>
            <p className='aboutList'>
                Features:
                <ul>
                    <li className='alist'>Create an account, login, logout, and login with a Demo account.</li>
                    <li className='alist'>Create, edit, and delete tweets.</li>
                    <li className='alist'>Create, edit, and delete replies.</li>
                    <li className='alist'>Like and unlike tweets.</li>
                    <li className='alist'>View feed, profile, and other users' profiles.</li>
                    <li className='alist'>Upload images for a profile picture when signing up</li>
                    <li className='alist'>Upload images when creating and editing a tweet</li>
                </ul>
            </p>
            <p className='aboutList'>
                Technologies used:
                <ul>
                    <li className='alist'>Docker</li>
                    <li className='alist'>React</li>
                    <li className='alist'>Redux</li>
                    <li className='alist'>Python</li>
                    <li className='alist'>Flask</li>
                    <li className='alist'>SQLAlchemy</li>
                    <li className='alist'>PostgreSQL</li>
                    <li className='alist'>AWS S3</li>
                    <li className='alist'>HTML</li>
                    <li className='alist'>CSS</li>
                    <li className='alist'>JavaScript</li>
                </ul>
            </p>
            <p >
                <Link onClick={() => window.open('https://github.com/gitCommitted/twitter_clone')} className='repo2'>
                Click here to checkout the i-tweet repo on github 
                </Link>
            </p>
        </div>
    );
}

export default About;