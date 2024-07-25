import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    modules: [
      {
        name: "Module 0: Fundamental Guiding Principles",
        topics: [
          {
            name: "Quick Reads",
            description:
              "Learn why the fundamental principles have become the most important thing to learn first in this new age of AI.",
            subtopics: [
              {
                name: "Article",
                description: "Why should everyone learn to code?",
                link: "https://www.pureblueocean.com/my-product/skills-vs-behaviours/",
                isLocked: false,
              },
              {
                name: "Article",
                description: "How to break complex problems?",
                link: "https://www.pureblueocean.com/my-product/skills-vs-behaviours/",
                isLocked: false,
              },
              {
                name: "Article",
                description: "How to win every argument?",
                link: "https://www.pureblueocean.com/my-product/skills-vs-behaviours/",
                isLocked: false,
              },
              {
                name: "Article",
                description: "What's more important - Right skillset or right attitude?",
                link: "https://www.pureblueocean.com/my-product/skills-vs-behaviours/",
                isLocked: false,
              },
            ],
          }
        ],
      },
      {
        name: "Module 1: Tech Fundamentals and Logical Reasoning",
        topics: [
          {
            name: "Build familiarity with basic tools",
            description:
              "Know the necessary basic tools which are an absolute must for all coders.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Mental Models & Critical thinking exercises",
            description:
              "Understand bias in thinking and explore new ways of thinking about real-world problems.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Basic puzzles and logical reasoning",
            description:
              "This section will cover puzzles and LR exercises that will sharpen your reasoning skills.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 2: Intro to Programming and Data Structures",
        topics: [
          {
            name: "Introduction to Java/C++",
            description:
              "Learn the syntax and core concepts of programming with languages like Java/C++, laying a strong foundation for coding.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Basics of Data Structures",
            description:
              "Understand and implement fundamental data structures such as arrays, linked lists, and stacks to efficiently store and manage data.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Recursion and Backtracking",
            description:
              "Master recursive algorithms and backtracking techniques to solve complex problems by breaking them down into simpler sub-problems.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 3: Advanced-Data Structures and Algorithms",
        topics: [
          {
            name: "Trees and Graphs",
            description:
              "Explore advanced data structures like binary trees, AVL trees, and graph algorithms to manage hierarchical and networked data.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Dynamic Programming",
            description:
              "Learn dynamic programming to solve optimization problems by breaking them into overlapping subproblems and storing solutions.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Searching and Sorting",
            description:
              "Dive deep into various searching and sorting algorithms, such as binary search and quicksort, to improve data retrieval and organization.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 4: Building Blocks of Web",
        topics: [
          {
            name: "HTML, CSS and Javascript",
            description:
              "Master the core technologies of web development to create and style web pages, and add interactivity with JavaScript.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Responsive Design",
            description:
              "Learn to create responsive websites that adapt to different screen sizes and devices using CSS frameworks and media queries.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Web Development Project",
            description:
              "Apply your knowledge in a hands-on web development project, building a functional and visually appealing website from scratch.",
            subtopics: [
              {
                name: "Project",
                description: "Project details to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 5: Master React",
        topics: [
          {
            name: "React Basics",
            description:
              "Become proficient in React for building interactive user interfaces with reusable components and a virtual DOM.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "State Management",
            description:
              "Learn state management with tools like React Router and Context API to manage application state and navigation efficiently.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Personal Portfolio Creation",
            description:
              "Create your own personalized portfolio using React to showcase your projects and skills to potential employers.",
            subtopics: [
              {
                name: "Project",
                description: "Project details to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 6: Backend Fundamentals",
        topics: [
          {
            name: "API Development",
            description:
              "Understand the basics of Internet and API architecture to build robust and scalable backend services.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Databases",
            description:
              "Dive into SQL and NoSQL databases to store, retrieve, and manage data effectively in your applications.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Redux Saga",
            description:
              "Integrate advanced React packages like Redux Saga to handle side effects and manage complex state in your applications.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 7: Backend Integration and Final Project",
        topics: [
          {
            name: "Database Indexing and Deployment",
            description:
              "Learn about database indexing, deployment strategies, and cybersecurity to ensure your applications are efficient and secure.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "Caching and Authentication",
            description:
              "Understand caching techniques and authentication mechanisms to improve performance and security of your web applications.",
            subtopics: [
              {
                name: "Lesson",
                description: "New lessons and articles to be added once the program begins",

                isLocked: true,
              }
            ],
          },
          {
            name: "The Final Project",
            description:
              "Build and deploy your first full-stack website, applying all the concepts and skills learned throughout the course.",
            subtopics: [
              {
                name: "Project",
                description: "Project details to be added once the program begins",

                isLocked: true,
              }
            ],
          },
        ],
      },
      {
        name: "Module 8: Job Readiness Preparation",
        topics: [
          {
            name: "Resume Building",
            description:
              "Two rounds of resume building exercise starting with basic walkthrough of skills & experience to final refinement of the resume.",
            subtopics: [
              {
                name: "Exercise",
                description: "Resume Building I",

                isLocked: true,
              },
              {
                name: "Exercise",
                description: "Resume Building I",

                isLocked: true,
              }
            ],
          },
          {
            name: "Mock Interviews",
            description:
              "At least 4 mock interview rounds covering general HRQ interview rounds and technical interview rounds",
            subtopics: [
              {
                name: "Exercise",
                description: "General HRQs Prep - Mock Interviews I",

                isLocked: true,
              },
              {
                name: "Exercise",
                description: "General HRQs Prep - Mock Interviews I",

                isLocked: true,
              },
              {
                name: "Exercise",
                description: "General HRQs Prep - Mock Interviews I",

                isLocked: true,
              }
            ],
          },
        ],
      },
    ],
  });
});

export default router;
