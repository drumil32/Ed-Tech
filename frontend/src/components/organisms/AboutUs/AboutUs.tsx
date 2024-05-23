import React from 'react';
import instructorListData from '../../../data/teamInfo.json';
import { Instructor } from '../../../types/types';
import Card from '../../molecule/FeaturesCard/Card';

const AboutUs: React.FC = () => {
    return (
        <div>
            <p>The Team</p>
            <p>Fueled with passion for learning</p>
            {
                instructorListData.map((personInfo: Instructor) => (
                    <div>
                        <p>
                            {personInfo.name}
                        </p>
                        <p>
                            {personInfo.designation}
                        </p>
                        <p>
                            {personInfo.college}
                        </p>
                        <p>
                            {personInfo.profilePicture}{personInfo.instagram}{personInfo.linkedin}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default AboutUs;