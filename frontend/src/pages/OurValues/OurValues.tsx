import ourValuesCardList from '../../data/ourValuesDetails.json';
import { OurValuesCardDetails } from "../../types/types";

const OurValues: React.FC = () => {
    return (
        <div>
            {ourValuesCardList.map((cardDetail: OurValuesCardDetails, index: number) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2>{cardDetail.title}</h2>
                    <p>{cardDetail.description}</p>
                </div>
            ))}
        </div>
    );
}

export default OurValues;