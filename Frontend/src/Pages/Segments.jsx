import React, { useState, useEffect } from "react";

const fields = [
  "name",
  "phone",
  "email",
  "lastVisited",
  "totalSpent",
  "totalOrders",
];

const operators = [
  "equals",
  "not_equals",
  "contains",
  "not_contains",
  "greater_than",
  "less_than",
];

const Segments = () => {
  const [segmentName, setSegmentName] = useState("");
  const [rules, setRules] = useState([
    { field: "", operator: "", value: "", condition: "AND" },
  ]);

  const [matchingCount, setMatchingCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [segments, setSegments] = useState([]);

  // Fetch saved segments on mount
  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await fetch("http://localhost:4000/segment/all");
        const data = await res.json();
        setSegments(data.data || []);
      } catch (err) {
        console.error("Error fetching segments:", err);
      }
    };
    fetchSegments();
  }, []);

  // Live matching count update
  useEffect(() => {
    if (rules.some((r) => !r.field || !r.operator || !r.value)) {
      setMatchingCount(0);
      return;
    }

    const fetchCount = async () => {
      try {
        const res = await fetch("http://localhost:4000/segment/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rules }),
        });
        const data = await res.json();
        setMatchingCount(data.data.length || 0);
      } catch {
        setMatchingCount(0);
      }
    };

    fetchCount();
  }, [rules]);

  const updateRule = (i, key, value) => {
    const newRules = [...rules];
    newRules[i][key] = value;
    setRules(newRules);
  };

  const addCondition = () => {
    setRules([
      ...rules,
      { field: "", operator: "", value: "", condition: "AND" },
    ]);
  };

  const saveSegment = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:4000/segment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: segmentName, rules }),
      });

      if (res.ok) {
        const result = await res.json();
        setSegments((prev) => [...prev, result.data]);
        setSegmentName("");
        setRules([{ field: "", operator: "", value: "" }]);
        setMatchingCount(0);
        alert("Segment saved!");
        await fetch("http://localhost:4000/campaign/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: segmentName, rules }),
        });
      } else {
        const errText = await res.text();
        alert("Failed to save segment: " + errText);
      }
    } catch (err) {
      alert("Error saving segment.");
    }
    setSaving(false);
  };

  const canAddCondition = rules.every((r) => r.field && r.operator && r.value);

  return (
    <div className="flex">
      <aside className="w-[250px] hidden lg:block"></aside>
      <main className="flex-1 p-6 bg-gradient-to-b from-white to-blue-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600">Create Segment</h1>
          <p className="text-gray-600 mb-6">
            Build targeted customer segments with custom rules
          </p>

          {/* Segment Name */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-2">Segment Details</h2>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="e.g., High-Value Customers"
              className="w-full border border-gray-300 p-3 rounded-xl"
            />
          </div>

          {/* Rule Builder */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Rule Builder</h2>
            {rules.map((rule, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <select
                  value={rule.field}
                  onChange={(e) => updateRule(i, "field", e.target.value)}
                  className="border p-3 rounded-xl"
                >
                  <option value="">Select field</option>
                  {fields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <select
                  value={rule.operator}
                  onChange={(e) => updateRule(i, "operator", e.target.value)}
                  className="border p-3 rounded-xl"
                >
                  <option value="">Select operator</option>
                  {operators.map((op) => (
                    <option key={op} value={op}>
                      {op.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={rule.value}
                  onChange={(e) => updateRule(i, "value", e.target.value)}
                  placeholder="Enter value"
                  className="border p-3 rounded-xl"
                />
              </div>
            ))}
            <button
              onClick={addCondition}
              disabled={!canAddCondition}
              className="text-blue-600 font-semibold disabled:opacity-50"
            >
              + Add Condition
            </button>
          </div>

          {/* Live Preview & Save */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-300 p-6 rounded-2xl">
              <h3 className="text-green-700 font-semibold">👥 Live Preview</h3>
              <p className="text-sm text-gray-500 mb-2">
                Users matching your segment
              </p>
              <p className="text-4xl font-bold text-green-700">
                {matchingCount}
              </p>
            </div>
            <div className="bg-white border p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-2">Save Segment</h3>
              <button
                onClick={saveSegment}
                disabled={
                  saving ||
                  !segmentName ||
                  rules.some((r) => !r.field || !r.operator || !r.value === "")
                }
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Segment"}
              </button>
            </div>
          </div>

          {/* Segment List in Tabular Format */}
          <div className="bg-white shadow p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">📋 Segment List</h2>
            {segments.length === 0 ? (
              <p className="text-gray-500">No segments created yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Segment Name</th>
                      <th className="px-4 py-2 border">Rules</th>
                    </tr>
                  </thead>
                  <tbody>
                    {segments.map((segment, idx) => (
                      <tr key={segment._id || idx} className="border-t">
                        <td className="px-4 py-2 border font-medium">
                          {segment.name}
                        </td>
                        <td className="px-4 py-2 border">
                          <ul className="list-disc ml-4 space-y-1">
                            {segment.rules?.map((rule, i) => (
                              <li key={i}>
                                <strong>{rule.field}</strong>{" "}
                                {rule.operator.replace(/_/g, " ")}{" "}
                                <em>{rule.value}</em>
                              </li>
                            )) || "No rules defined"}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Segments;
