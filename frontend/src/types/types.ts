// types.ts
export interface Course {
  title: string;
  duration: string;
  seatsLeft: number;
  description: string;
  curriculum: string[];
  placement: string[];
  brochureLink: string;
  learnMoreLink: string;
  catagory: string;
}

export interface WhyChooseUs {
  title: string;
  description: string;
  detail: string;
}

export interface Faqs {
  question: string;
  answer: string;
}