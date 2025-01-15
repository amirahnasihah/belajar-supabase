"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function Page() {
  const [concepts, setConcepts] = useState<any[]>([]);
  const [newConcept, setNewConcept] = useState({
    title: "",
    description: "",
    code_example: "",
    use_case: "",
    category: "authentication",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchConcepts();
  }, []);

  const fetchConcepts = async () => {
    const { data, error } = await supabase
      .from("supabase_concepts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching concepts:", error);
    } else {
      setConcepts(data || []);
    }
  };

  const addConcept = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newConcept.title.trim()) return;

    const { error } = await supabase
      .from("supabase_concepts")
      .insert([newConcept]);

    if (error) {
      console.error("Error adding concept:", error);
    } else {
      setNewConcept({
        title: "",
        description: "",
        code_example: "",
        use_case: "",
        category: "authentication",
      });
      fetchConcepts();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Learning Journal</h1>

      {/* Add Concept Form */}
      <form onSubmit={addConcept} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            value={newConcept.title}
            onChange={(e) =>
              setNewConcept({ ...newConcept, title: e.target.value })
            }
            placeholder="Concept Title (e.g., Real-time Subscriptions)"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <textarea
            value={newConcept.description}
            onChange={(e) =>
              setNewConcept({ ...newConcept, description: e.target.value })
            }
            placeholder="Explain the concept..."
            className="border p-2 w-full rounded"
            rows={3}
          />
        </div>
        <div>
          <textarea
            value={newConcept.code_example}
            onChange={(e) =>
              setNewConcept({ ...newConcept, code_example: e.target.value })
            }
            placeholder="Add code example..."
            className="border p-2 w-full rounded font-mono text-sm"
            rows={4}
          />
        </div>
        <div>
          <input
            type="text"
            value={newConcept.use_case}
            onChange={(e) =>
              setNewConcept({ ...newConcept, use_case: e.target.value })
            }
            placeholder="Practical use case"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <select
            value={newConcept.category}
            onChange={(e) =>
              setNewConcept({ ...newConcept, category: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="authentication">Authentication</option>
            <option value="database">Database</option>
            <option value="storage">Storage</option>
            <option value="realtime">Realtime</option>
            <option value="edge-functions">Edge Functions</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded w-full hover:bg-emerald-700"
        >
          Save Concept
        </button>
      </form>

      {/* Concepts List */}
      <div className="space-y-4">
        {concepts.map((concept) => (
          <div key={concept.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{concept.title}</h2>
            <p className="text-gray-600 mt-2">{concept.description}</p>
            {concept.code_example && (
              <pre className="bg-gray-50 p-3 rounded mt-2 overflow-x-auto">
                <code className="text-sm">{concept.code_example}</code>
              </pre>
            )}
            <div className="mt-2">
              <span className="font-medium">Use Case: </span>
              {concept.use_case}
            </div>
            <div className="mt-2">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                {concept.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
