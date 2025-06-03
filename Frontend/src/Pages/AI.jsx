import { FaMagic } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";

const AI = () => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!description.trim()) return alert("Please enter campaign description!");

    setLoading(true);
    setError(null);
    setResult("");

    try {
      const response = await axios.post("http://localhost:4000/ai/generate", {
        description,
      });

      setResult(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-[250px] min-h-screen bg-gradient-to-br from-[#f9f6ff] to-[#f2f9ff] p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
          <FaMagic className="text-purple-500" />
          AI Message Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Let AI help you craft compelling campaign messages that convert
        </p>
      </div>

      <div className="bg-white max-w-3xl p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Describe Your Campaign</h2>
        <p className="text-gray-500 mb-4">
          Tell us about your campaign goals, target audience, and key message to
          get personalized suggestions
        </p>

        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Campaign Description
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Example: Summer sale campaign for premium skincare products targeting women aged 25-40. Focus on natural ingredients and 20% discount. Tone should be friendly and luxurious."
          className="w-full p-4 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          onClick={handleGenerate}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          <FaMagic />
          {loading ? "Generating..." : "Generate Suggestions"}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {result && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-300 whitespace-pre-line">
            <h3 className="font-semibold mb-2 text-purple-700">
              AI Suggestions:
            </h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AI;
