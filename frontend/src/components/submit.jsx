import { useState } from "react";
import { useStore } from "../store/store";

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (err) {
      console.error("Error submitting pipeline:", err);
      setResult({ error: "❌ Failed to submit pipeline to backend." });
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="px-5 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow-md 
                   hover:bg-indigo-600 hover:shadow-lg active:scale-95 transition-all"
      >
        Submit
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)} // Close when clicking background
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Pipeline Analysis
            </h2>

            {result?.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Nodes:</strong> {result?.num_nodes}
                </p>
                <p>
                  <strong>Edges:</strong> {result?.num_edges}
                </p>
                <p>
                  <strong>Is Directed Acyclic Graph:</strong>{" "}
                  {result?.is_dag ? "✅ Yes" : "❌ No"}
                </p>
              </div>
            )}

            {/* Footer Close */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
