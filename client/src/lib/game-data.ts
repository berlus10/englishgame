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

export type Question = {
  id: number;
  text: string;
  correctColors: string[]; // Names of correct colors
  explanation: string;
};

export const EASY_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "For this gardening brand, the ideal color would be ______!",
    correctColors: ["Green", "Dark Green", "Brown", "Beige"],
    explanation: "Why? Green represents nature, dark green and beige evoke ecology and softness, brown recalls the earth and authenticity.",
  },
  {
    id: 2,
    text: "For this brand of women's cosmetics, the ideal color would be ______!",
    correctColors: ["Pink", "Light Purple", "Purple"],
    explanation: "These colors are soft, elegant, and naturally appeal to a female audience.",
  },
  {
    id: 3,
    text: "A brand selling luxury watches should NOT use the color ______!",
    correctColors: ["Golden", "Black", "Dark Blue", "Silver", "Navy", "Burgundy"], // Interpreted "Everything except Golden, Black, Dark colors" as identifying the dark/luxury colors is the goal? Wait, question is "should NOT use". 
    // Re-reading prompt: "A brand selling luxury watches should NOT use the color ______!"
    // Correct Answer = "Everything except Golden, Black, Dark colors"
    // This implies the player must pick a NON-luxury color to be "Right" about what NOT to use.
    // Let's list non-luxury colors as correct answers for "NOT use".
    // "Serious colors are required" -> so we should avoid fun/bright colors.
    // Correct answers (to avoid): Yellow, Orange, Neon Green, Neon Pink, Pink, Light Blue, Mint Green.
    // Actually, let's stick to the prompt's logic. If the user picks "Yellow", that is a color a luxury brand should NOT use. So Yellow is a correct answer to the question.
    explanation: "The world of luxury is very serious, so serious colors are required. Avoid bright, playful colors like Yellow or Neon.",
  },
  {
    id: 4,
    text: "For a sports company, the most logical color is ______!",
    correctColors: ["Blue", "Red", "Dark Blue", "Black"],
    explanation: "Blue = reliability, red = energy, dark blue = seriousness, black = power.",
  },
  {
    id: 5,
    text: "A children's store would definitely use ______!",
    correctColors: ["Yellow", "Orange", "Pink", "Light Purple"],
    explanation: "These colors are bright, cheerful, and attract children's attention.",
  },
  {
    id: 6,
    text: "This small organic café needs a color like ______!",
    correctColors: ["Dark Green", "Green", "Brown", "Beige"],
    explanation: "Dark green and green evoke organic and natural, while brown and beige are reminiscent of coffee and earth.",
  },
];

// Fix for Question 3 logic based on prompt text:
// "Bonne réponse = Everything except Golden, Black, Dark colors"
// This means any color EXCEPT those is the correct answer to "What should NOT be used".
const LUXURY_COLORS = ["Gold", "Black", "Dark Blue", "Navy", "Burgundy", "Silver", "Dark Green", "Dark Red"];
const NON_LUXURY_COLORS = COLORS.filter(c => !LUXURY_COLORS.includes(c.name)).map(c => c.name);

EASY_QUESTIONS[2].correctColors = NON_LUXURY_COLORS;
