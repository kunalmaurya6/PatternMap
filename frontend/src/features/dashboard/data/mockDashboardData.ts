import type {
  MetricItem,
  ProblemItem,
  StreakDay,
  QuoteItem,
  LearningInsightItem,
} from '../types';

export const mockMetrics: MetricItem[] = [
  {
    id: 'problems-solved',
    label: 'Problems Solved',
    value: '24',
    icon: 'check',
    color: 'green',
  },
  {
    id: 'day-streak',
    label: 'Day Streak',
    value: '7',
    icon: 'flame',
    color: 'orange',
  },
  {
    id: 'patterns-used',
    label: 'Patterns Used',
    value: '5',
    icon: 'chart',
    color: 'blue',
  },
  {
    id: 'total-practice',
    label: 'Total Practice',
    value: '18h',
    icon: 'clock',
    color: 'purple',
  },
];

export const mockRecentSolves: ProblemItem[] = [
  {
    id: 'p1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Map'],
    date: 'Oct 29',
    solved: true,
    pattern: 'Hash Map Lookup',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    approach: 'Store complement (target - current) in a hash table for O(n) single-pass lookup.',
    leetcodeNumber: 1,
  },
  {
    id: 'p2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    date: 'Oct 28',
    solved: true,
    pattern: 'LIFO Stack Matching',
    description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
    approach: 'Push expected closing bracket onto stack whenever opening bracket is encountered.',
    leetcodeNumber: 20,
  },
  {
    id: 'p3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    date: 'Oct 27',
    solved: true,
    pattern: 'Interval Overlap Merge',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    approach: 'Sort intervals by starting time, then merge adjacent ones when start <= previous end.',
    leetcodeNumber: 56,
  },
  {
    id: 'p4',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    tags: ['Dynamic Programming'],
    date: 'Oct 26',
    solved: true,
    pattern: 'Fibonacci DP',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    approach: 'dp[i] = dp[i-1] + dp[i-2], optimized with two state variables in O(1) space.',
    leetcodeNumber: 70,
  },
  {
    id: 'p5',
    title: 'Number of Islands',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS'],
    date: 'Oct 25',
    solved: true,
    pattern: 'Grid Connected Components (DFS)',
    description: 'Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
    approach: 'Iterate grid cells. When finding "1", increment island counter and recursively sink connected land with DFS.',
    leetcodeNumber: 200,
  },
];

export const mockStreakDays: StreakDay[] = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: true },
  { day: 'Thu', active: true },
  { day: 'Fri', active: true },
  { day: 'Sat', active: true },
  { day: 'Sun', active: false },
];

export const mockRecommendedList: ProblemItem[] = [
  {
    id: 'r1',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Map'],
    date: 'Today',
    solved: false,
    pattern: 'Hash Set Lookup',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    approach: 'Iterate through array while checking existence in a hash set.',
    leetcodeNumber: 217,
  },
  {
    id: 'r2',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    tags: ['Array', 'Sliding Window'],
    date: 'Today',
    solved: false,
    pattern: 'Single-Pass Min-Max Tracking',
    description: 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    approach: 'Track minimum price so far, calculate potential profit at each step.',
    leetcodeNumber: 121,
  },
  {
    id: 'r3',
    title: '3Sum',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers'],
    date: 'Today',
    solved: false,
    pattern: 'Sorted Two Pointers',
    description: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    approach: 'Sort array, fix first number, then use two pointers for remaining two elements.',
    leetcodeNumber: 15,
  },
  {
    id: 'r4',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    tags: ['Hash Map', 'Sorting'],
    date: 'Today',
    solved: false,
    pattern: 'Categorization by Frequency/Sorted Key',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    approach: 'Hash each string by sorted character key or character frequency tuple.',
    leetcodeNumber: 49,
  },
];

export const mockQuotes: QuoteItem[] = [
  {
    quote: 'Consistency beats intensity.',
    author: 'James Clear',
  },
  {
    quote: 'Small disciplines repeated with consistency every day lead to great achievements.',
    author: 'John C. Maxwell',
  },
  {
    quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Will Durant',
  },
  {
    quote: 'The master has failed more times than the beginner has even tried.',
    author: 'Stephen McCranie',
  },
];

export const mockLearningInsight: LearningInsightItem = {
  title: 'Learning Insight',
  content: "You've solved 3 array problems this week. Looks like you're getting comfortable with hash map techniques!",
};
