import React, { useState } from "react";
import { BiPlay, BiTime, BiUser, BiStar, BiBook } from "react-icons/bi";
import { FaEthereum, FaBitcoin, FaCode } from "react-icons/fa";

/**
 * Tutorials Component
 * Web3 and blockchain learning resources
 */

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Web3",
    description: "Learn the basics of blockchain and decentralized applications",
    duration: "15 min",
    level: "Beginner",
    rating: 4.8,
    students: 1250,
    category: "Fundamentals",
    icon: <FaCode className="text-blue-500" />,
    lessons: [
      "What is Web3?",
      "Blockchain Basics",
      "Cryptocurrency Overview",
      "Setting up MetaMask"
    ]
  },
  {
    id: 2,
    title: "Ethereum Smart Contracts",
    description: "Build and deploy your first smart contract on Ethereum",
    duration: "45 min",
    level: "Intermediate",
    rating: 4.9,
    students: 890,
    category: "Development",
    icon: <FaEthereum className="text-blue-500" />,
    lessons: [
      "Solidity Basics",
      "Contract Structure",
      "Deployment Process",
      "Testing Contracts"
    ]
  },
  {
    id: 3,
    title: "DeFi Trading Strategies",
    description: "Master decentralized finance trading and yield farming",
    duration: "30 min",
    level: "Advanced",
    rating: 4.7,
    students: 567,
    category: "Trading",
    icon: <FaBitcoin className="text-orange-500" />,
    lessons: [
      "DeFi Protocols",
      "Liquidity Mining",
      "Risk Management",
      "Portfolio Strategies"
    ]
  }
];

const categories = ["All", "Fundamentals", "Development", "Trading", "Security"];

const TutorialCard = ({ tutorial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLevelStyle = (level) => {
    if (level === "Beginner") return "bg-green-600 text-green-100";
    if (level === "Intermediate") return "bg-yellow-600 text-yellow-100";
    return "bg-red-600 text-red-100";
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{tutorial.icon}</div>
          <div>
            <h3 className="text-white font-bold text-lg">{tutorial.title}</h3>
            <p className="text-gray-300 text-sm">{tutorial.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelStyle(tutorial.level)}`}>
          {tutorial.level}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{tutorial.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <BiTime />
            <span>{tutorial.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BiUser />
            <span>{tutorial.students}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BiStar className="text-yellow-400" />
            <span>{tutorial.rating}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">Lessons:</h4>
          <ul className="space-y-1">
            {tutorial.lessons.map((lesson, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-center">
                <BiPlay className="mr-2 text-blue-400" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <BiPlay className="mr-2" />
          Start Learning
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
};

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Web3 <span className="text-gradient">Tutorials</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Master blockchain technology and decentralized applications with our comprehensive tutorials
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tutorials..."
                  className="w-full bg-black bg-opacity-30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <BiBook className="text-3xl text-blue-400 mx-auto mb-2" />
            <h3 className="text-white text-xl font-bold">50+</h3>
            <p className="text-gray-300 text-sm">Tutorials</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <BiUser className="text-3xl text-green-400 mx-auto mb-2" />
            <h3 className="text-white text-xl font-bold">10K+</h3>
            <p className="text-gray-300 text-sm">Students</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <BiStar className="text-3xl text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white text-xl font-bold">4.8</h3>
            <p className="text-gray-300 text-sm">Avg Rating</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <BiTime className="text-3xl text-purple-400 mx-auto mb-2" />
            <h3 className="text-white text-xl font-bold">100+</h3>
            <p className="text-gray-300 text-sm">Hours Content</p>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>

        {/* Learning Path */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-2xl font-bold text-white mb-6">Recommended Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-white font-bold mb-2">Start with Basics</h3>
              <p className="text-gray-300 text-sm">Learn Web3 fundamentals and blockchain concepts</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-white font-bold mb-2">Build Projects</h3>
              <p className="text-gray-300 text-sm">Create smart contracts and dApps</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-white font-bold mb-2">Advanced Topics</h3>
              <p className="text-gray-300 text-sm">Master DeFi, NFTs, and advanced concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials; 