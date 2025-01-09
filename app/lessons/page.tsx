"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function Page() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    rule_name: "",
    example: "",
    difficulty_level: "beginner",
  });
  const supabase = createClient();

  // Fetch lessons
  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    const { data, error } = await supabase
      .from("tajweed_lessons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching lessons:", error);
    } else {
      setLessons(data || []);
    }
  };

  const addLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLesson.title.trim()) return;

    const { error } = await supabase
      .from("tajweed_lessons")
      .insert([newLesson]);

    if (error) {
      console.error("Error adding lesson:", error);
    } else {
      setNewLesson({
        title: "",
        description: "",
        rule_name: "",
        example: "",
        difficulty_level: "beginner",
      });
      fetchLessons();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tajweed Lessons</h1>

      {/* Add Lesson Form */}
      <form onSubmit={addLesson} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            value={newLesson.title}
            onChange={(e) =>
              setNewLesson({ ...newLesson, title: e.target.value })
            }
            placeholder="Lesson Title"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <textarea
            value={newLesson.description}
            onChange={(e) =>
              setNewLesson({ ...newLesson, description: e.target.value })
            }
            placeholder="Lesson Description"
            className="border p-2 w-full rounded"
            rows={3}
          />
        </div>
        <div>
          <input
            type="text"
            value={newLesson.rule_name}
            onChange={(e) =>
              setNewLesson({ ...newLesson, rule_name: e.target.value })
            }
            placeholder="Rule Name"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <input
            type="text"
            value={newLesson.example}
            onChange={(e) =>
              setNewLesson({ ...newLesson, example: e.target.value })
            }
            placeholder="Example"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <select
            value={newLesson.difficulty_level}
            onChange={(e) =>
              setNewLesson({ ...newLesson, difficulty_level: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Lesson
        </button>
      </form>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="text-gray-600 mt-2">{lesson.description}</p>
            <div className="mt-2">
              <span className="font-medium">Rule: </span>
              {lesson.rule_name}
            </div>
            <div className="mt-2">
              <span className="font-medium">Example: </span>
              {lesson.example}
            </div>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {lesson.difficulty_level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
