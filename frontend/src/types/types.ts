export interface Course {
  title: string;
  curriculum: string[];
  placement: string[];
  catagory: string;
}


export interface WhyChooseUsCardDetails {
  title: string;
  subtitle: string;
  detail: string;
  clipArt: string;
  backGroundColor: string;
  id:string;
}

export interface WhyChooseUs {
  cardDetails: WhyChooseUsCardDetails;
  flipedCard: string;
  setFlipedCard: React.Dispatch<React.SetStateAction<string>>;
}
export interface Faqs {
  question: string;
  answer: string;
}

export interface Instructor {
  name: string;
  designation: string;
  college: string;
  instagram: string;
  linkedin: string;
  profilePicture: string;
}
