import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    modules: [
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 1,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "false",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "false",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 2,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "false",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "false",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "false",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 3,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 4,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 5,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        id: 6,
        lessons: [
          {
            title: "What is SQL?",
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 7,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 8,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 9,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 10,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 11,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 12,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 13,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 14,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 15,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 16,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 17,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 18,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 19,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 20,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 21,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 22,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 23,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
      {
        title: "Getting Started With SQL",
        lessons: [
          {
            title: "What is SQL?",
            id: 24,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 25,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
          {
            title: "What is SQL?",
            id: 26,
            description:
              "Gain a familirity with code academy platform by learning about what sql and how data alysit use this",
            topics: [
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
              {
                title: "Lesson",
                description: "Why learn sql?",
                isLocked: "true",
              },
            ],
          },
        ],
      },
    ],
  });
});

export default router;
