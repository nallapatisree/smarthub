const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing users
    await User.deleteMany({});
    console.log("🗑️  Cleared existing users");

    // Create test users
    const testUsers = [
      {
        name: "Demo Student",
        email: "student@smartlearn.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: "Computer Science",
        cgpa: 8.5,
        skills: ["JavaScript", "React", "Node.js", "MongoDB"]
      },
      {
        name: "Admin User",
        email: "admin@smartlearn.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        department: "Administration",
        cgpa: 0
      },
      {
        name: "Recruiter User",
        email: "recruiter@smartlearn.com",
        password: await bcrypt.hash("recruiter123", 10),
        role: "recruiter",
        department: "HR",
        cgpa: 0
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log("✅ Created test users:");
    createdUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`);
    });

    // Create test placements
    const Placement = require("./models/Placement");
    await Placement.deleteMany({});
    console.log("🗑️  Cleared existing placements");

    const testPlacements = [
      {
        companyName: "Google",
        eligibility: "CGPA >= 7.5, B.Tech CSE/IT",
        description: "Software Engineer role working on cloud infrastructure and distributed systems",
        location: "Bangalore",
        salary: "₹25-35 LPA",
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        open: true,
        appliedStudents: [],
        shortlistedStudents: []
      },
      {
        companyName: "Microsoft",
        eligibility: "CGPA >= 7.0, B.Tech CSE/IT",
        description: "Software Development Engineer role in Azure platform team",
        location: "Hyderabad",
        salary: "₹22-32 LPA",
        date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        open: true,
        appliedStudents: [],
        shortlistedStudents: []
      },
      {
        companyName: "Amazon",
        eligibility: "CGPA >= 7.2, B.Tech CSE/IT",
        description: "SDE role in AWS team handling cloud services",
        location: "Bangalore",
        salary: "₹24-34 LPA",
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        open: true,
        appliedStudents: [],
        shortlistedStudents: []
      },
      {
        companyName: "TCS",
        eligibility: "CGPA >= 6.0",
        description: "Associate Software Engineer role in various domains",
        location: "Multiple Cities",
        salary: "₹6-8 LPA",
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        open: true,
        appliedStudents: [],
        shortlistedStudents: []
      },
      {
        companyName: "Goldman Sachs",
        eligibility: "CGPA >= 8.0",
        description: "Summer Analyst role in Financial Technology",
        location: "New York",
        salary: "₹40-50 LPA",
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        open: true,
        appliedStudents: [],
        shortlistedStudents: []
      }
    ];

    const createdPlacements = await Placement.insertMany(testPlacements);
    console.log("✅ Created test placements:");
    createdPlacements.forEach(placement => {
      console.log(`   - ${placement.companyName} (${placement.location})`);
    });

    // Create coding challenges
    const CodingQuestion = require("./models/CodingQuestion");
    await CodingQuestion.deleteMany({});
    console.log("🗑️  Cleared existing coding challenges");

    const codingChallenges = [
      {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
        difficulty: "easy",
        topic: "Array",
        examples: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: nums[0] + nums[1] == 9, so we return [0, 1].",
        constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
        testCases: [
          { input: "[2,7,11,15], 9", output: "[0,1]" },
          { input: "[3,2,4], 6", output: "[1,2]" },
          { input: "[3,3], 6", output: "[0,1]" }
        ],
        hints: ["A really brute force way would be to search for all possible pairs of numbers but that would be too slow.", "Better approach is to use a hash table."],
        tags: ["Array", "Hash Table"]
      },
      {
        title: "Reverse Integer",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
        difficulty: "medium",
        topic: "Math",
        examples: "Input: x = 123\nOutput: 321\n\nInput: x = -123\nOutput: -321\n\nInput: x = 120\nOutput: 21",
        constraints: "-2^31 <= x <= 2^31 - 1",
        testCases: [
          { input: "123", output: "321" },
          { input: "-123", output: "-321" },
          { input: "120", output: "21" }
        ],
        hints: ["Consider the case where the reversed integer overflows."],
        tags: ["Math"]
      },
      {
        title: "Palindrome Number",
        description: "Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward.",
        difficulty: "easy",
        topic: "Math",
        examples: "Input: x = 121\nOutput: true\n\nInput: x = -121\nOutput: false\n\nInput: x = 10\nOutput: false",
        constraints: "-2^31 <= x <= 2^31 - 1",
        testCases: [
          { input: "121", output: "true" },
          { input: "-121", output: "false" },
          { input: "10", output: "false" }
        ],
        hints: ["Beware of overflow when you reverse the integer."],
        tags: ["Math"]
      },
      {
        title: "Longest Common Prefix",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
        difficulty: "easy",
        topic: "String",
        examples: "Input: strs = [\"flower\",\"flow\",\"flight\"]\nOutput: \"fl\"\n\nInput: strs = [\"dog\",\"racecar\",\"car\"]\nOutput: \"\"\nExplanation: There is no common prefix among the input strings.",
        constraints: "1 <= strs.length <= 200\n0 <= strs[i].length <= 200",
        testCases: [
          { input: "[\"flower\",\"flow\",\"flight\"]", output: "\"fl\"" },
          { input: "[\"dog\",\"racecar\",\"car\"]", output: "\"\"" },
          { input: "[\"a\"]", output: "\"a\"" }
        ],
        hints: ["Iterate through each character position and compare characters."],
        tags: ["String"]
      },
      {
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: (1) Open brackets must be closed by the same type of brackets. (2) Open brackets must be closed in the correct order.",
        difficulty: "easy",
        topic: "Stack",
        examples: "Input: s = \"()\"\nOutput: true\n\nInput: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
        constraints: "1 <= s.length <= 10^4, s consists of parentheses only",
        testCases: [
          { input: "\"()\"", output: "true" },
          { input: "\"()[]{}\"", output: "true" },
          { input: "\"(]\"", output: "false" }
        ],
        hints: ["An interesting property about a valid parentheses string is that a closing bracket is matched with the most recent unmatched opening bracket. This is why stack is the perfect data structure."],
        tags: ["Stack", "String"]
      },
      {
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists.",
        difficulty: "easy",
        topic: "Linked List",
        examples: "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
        constraints: "The number of nodes in both lists is in the range [0, 50]",
        testCases: [
          { input: "[1,2,4], [1,3,4]", output: "[1,1,2,3,4,4]" },
          { input: "[], []", output: "[]" },
          { input: "[], [0]", output: "[0]" }
        ],
        hints: ["Compare the values of the two heads and append the smaller one to the result list."],
        tags: ["Linked List"]
      },
      {
        title: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. You must write an algorithm with O(log n) runtime complexity.",
        difficulty: "medium",
        topic: "Searching",
        examples: "Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4",
        constraints: "1 <= nums.length <= 10^4, -10^4 < nums[i], target < 10^4",
        testCases: [
          { input: "[-1,0,3,5,9,12], 9", output: "4" },
          { input: "[-1,0,3,5,9,12], 13", output: "-1" }
        ],
        hints: ["Since the array is sorted, you can eliminate half of the array with each comparison."],
        tags: ["Searching", "Binary Search"]
      },
      {
        title: "First Missing Positive",
        description: "Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
        difficulty: "hard",
        topic: "Array",
        examples: "Input: nums = [1,2,0]\nOutput: 3\n\nInput: nums = [3,4,-1,1]\nOutput: 2\n\nInput: nums = [7,8,9,11,12]\nOutput: 1",
        constraints: "1 <= nums.length <= 10^5, -2^31 <= nums[i] <= 2^31 - 1",
        testCases: [
          { input: "[1,2,0]", output: "3" },
          { input: "[3,4,-1,1]", output: "2" },
          { input: "[7,8,9,11,12]", output: "1" }
        ],
        hints: ["Think about how you can use the array itself as a hash table."],
        tags: ["Array", "Hash Table"]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "medium",
        topic: "String",
        examples: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
        constraints: "0 <= s.length <= 5 * 10^4",
        testCases: [
          { input: "\"abcabcbb\"", output: "3" },
          { input: "\"bbbbb\"", output: "1" },
          { input: "\"pwwkew\"", output: "3" }
        ],
        hints: ["Use a sliding window approach with a hash table."],
        tags: ["String", "Sliding Window", "Hash Table"]
      },
      {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. You must write an algorithm that runs in O(log(m + n)) time.",
        difficulty: "hard",
        topic: "Array",
        examples: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.",
        constraints: "nums1.length == m, nums2.length == n",
        testCases: [
          { input: "[1,3], [2]", output: "2.0" },
          { input: "[1,2], [3,4]", output: "2.5" }
        ],
        hints: ["Binary search can be used to solve this problem efficiently."],
        tags: ["Array", "Binary Search"]
      }
    ];

    const createdChallenges = await CodingQuestion.insertMany(codingChallenges);
    console.log("✅ Created coding challenges:");
    createdChallenges.forEach(challenge => {
      console.log(`   - ${challenge.title} (${challenge.difficulty})`);
    });

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nTest Credentials:");
    console.log("================");
    console.log("Student:");
    console.log("  Email: student@smartlearn.com");
    console.log("  Password: student123");
    console.log("\nAdmin:");
    console.log("  Email: admin@smartlearn.com");
    console.log("  Password: admin123");
    console.log("\nRecruiter:");
    console.log("  Email: recruiter@smartlearn.com");
    console.log("  Password: recruiter123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
