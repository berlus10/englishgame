export type ColorOption = {
  name: string;
  hex: string;
};

export const COLORS: ColorOption[] = [
  { name: "Red", hex: "#FF0000" },
  { name: "Dark Red", hex: "#8B0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Dark Blue", hex: "#00008B" },
  { name: "Light Blue", hex: "#ADD8E6" },
  { name: "Green", hex: "#008000" },
  { name: "Dark Green", hex: "#006400" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "Light Purple", hex: "#E0B0FF" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Grey", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Neon Green", hex: "#39FF14" },
  { name: "Neon Pink", hex: "#FF10F0" },
  { name: "Olive", hex: "#6B8E23" },
  { name: "Mint Green", hex: "#98FF98" },
  { name: "Teal", hex: "#008080" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Navy", hex: "#000080" },
  { name: "Sand", hex: "#C2B280" },
];

export type QuestionType = "single" | "double";

export type Question = {
  id: number;
  level: "easy" | "medium" | "difficult";
  text: string;
  type: QuestionType;
  correctColors: string[]; // For single: list of valid colors. For double: flattened list of valid colors (logic handled in component)
  validPairs?: string[][]; // For double: Specific valid pairs
  explanation: string;
  points: number;
};

export const EASY_QUESTIONS: Question[] = [
  {
    id: 1,
    level: "easy",
    type: "single",
    points: 1,
    text: "For this gardening brand, the ideal color would be ______!",
    correctColors: ["Green", "Dark Green", "Brown", "Beige"],
    explanation: "Why? Green represents nature, dark green and beige evoke ecology and softness, brown recalls the earth and authenticity.",
  },
  {
    id: 2,
    level: "easy",
    type: "single",
    points: 1,
    text: "For this brand of women's cosmetics, the ideal color would be ______!",
    correctColors: ["Pink", "Light Purple", "Purple"],
    explanation: "These colors are soft, elegant, and naturally appeal to a female audience.",
  },
  {
    id: 3,
    level: "easy",
    type: "single",
    points: 1,
    text: "A brand selling luxury watches should NOT use the color ______!",
    correctColors: ["Yellow", "Orange", "Neon Green", "Neon Pink", "Mint Green"], // Interpreted as non-serious/non-luxury colors
    explanation: "The world of luxury is very serious, so serious colors are required.",
  },
  {
    id: 4,
    level: "easy",
    type: "single",
    points: 1,
    text: "For a sports company, the most logical color is ______!",
    correctColors: ["Blue", "Red", "Dark Blue", "Black"],
    explanation: "Blue = reliability, red = energy, dark blue = seriousness, black = power.",
  },
  {
    id: 5,
    level: "easy",
    type: "single",
    points: 1,
    text: "A children's store would definitely use ______!",
    correctColors: ["Yellow", "Orange", "Pink", "Light Purple"],
    explanation: "These colors are bright, cheerful, and attract children's attention.",
  },
  {
    id: 6,
    level: "easy",
    type: "single",
    points: 1,
    text: "This small organic café needs a color like ______!",
    correctColors: ["Dark Green", "Green", "Brown", "Beige"],
    explanation: "Dark green and green evoke organic and natural, while brown and beige are reminiscent of coffee and earth.",
  },
];

export const MEDIUM_QUESTIONS: Question[] = [
  {
    id: 7,
    level: "medium",
    type: "single",
    points: 2,
    text: "For this cozy coffee, the ideal color would be ______!",
    correctColors: ["Brown", "Beige", "Dark Red"],
    explanation: "These colors create a warm and welcoming atmosphere.",
  },
  {
    id: 8,
    level: "medium",
    type: "single",
    points: 2,
    text: "This brand of educational games for children should be ______ in color!",
    correctColors: ["Yellow", "Orange", "Light Purple"],
    explanation: "Cheerful and stimulating colors that attract children's attention.",
  },
  {
    id: 9,
    level: "medium",
    type: "single",
    points: 2,
    text: "A brand of high-tech electronic products would choose ______!",
    correctColors: ["Purple", "Light Purple", "Dark Blue"],
    explanation: "These colors give an impression of modernity, technology, and seriousness.",
  },
];

export const DIFFICULT_QUESTIONS: Question[] = [
  {
    id: 10,
    level: "difficult",
    type: "double",
    points: 3,
    text: "A nightclub with a techno atmosphere would need to use _______ and _______!",
    correctColors: ["Neon Pink", "Neon Green", "Black"], // Any combination of these
    validPairs: [
        ["Neon Pink", "Neon Green"],
        ["Neon Pink", "Black"],
        ["Neon Green", "Black"],
        ["Neon Green", "Neon Pink"],
        ["Black", "Neon Pink"],
        ["Black", "Neon Green"]
    ],
    explanation: "Neon colours reflect the energy and light of techno parties, while black adds a chic, urban touch.",
  },
  {
    id: 11,
    level: "difficult",
    type: "double",
    points: 3,
    text: "A trampoline park brand should use the colours ________ and ________!",
    correctColors: [],
    validPairs: [
        ["Orange", "Blue"],
        ["Blue", "Orange"],
        ["Yellow", "Green"],
        ["Green", "Yellow"],
        ["Neon Pink", "Light Blue"],
        ["Light Blue", "Neon Pink"]
    ],
    explanation: "These combinations are dynamic, cheerful and evoke movement, energy and fun, perfect for a trampoline park.",
  },
  {
    id: 12,
    level: "difficult",
    type: "double",
    points: 3,
    text: "A digital school like MyDigitalSchool must use ______ and ______!",
    correctColors: [],
    validPairs: [
        ["Blue", "White"],
        ["White", "Blue"],
        ["Light Blue", "White"],
        ["White", "Light Blue"]
    ],
    explanation: "Blue inspires confidence and seriousness, while light blue conveys modernity and technology, ideal for a digital school.",
  },
  {
    id: 13,
    level: "difficult",
    type: "double",
    points: 3,
    text: "A video game company that makes horror games must use the colours _________ and _________!",
    correctColors: [],
    validPairs: [
        ["Black", "Red"],
        ["Red", "Black"],
        ["Dark Red", "Purple"],
        ["Purple", "Dark Red"],
        ["Black", "Dark Blue"],
        ["Dark Blue", "Black"]
    ],
    explanation: "Black creates a dark and disturbing atmosphere, red or dark red evokes danger and tension, purple or dark blue adds a mysterious touch.",
  },
];

export const ALL_QUESTIONS = [...EASY_QUESTIONS, ...MEDIUM_QUESTIONS, ...DIFFICULT_QUESTIONS];
