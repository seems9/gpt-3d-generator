import { useState } from "react";
import STLViewer from "./STLViewer";

export default function GPT3DGenerator() {
  const [prompt, setPrompt] = useState("");
  const [stlFile, setStlFile] = useState(null);

  const generate3DModel = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/generate-stl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) throw new Error("Failed to generate STL file");
  
      const data = await response.json();
      console.log("Generated STL file:", data.fileUrl);
      setStlFile(data.fileUrl);
    } catch (error) {
      console.error("Error generating STL:", error);
    }
  };
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Describe your 3D model..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2 border rounded"
      />
      <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={generate3DModel}>
        Generate STL
      </button>

      {stlFile && (
        <>
          <STLViewer stlFile={stlFile} />
          <a href={stlFile} download="model.stl">Download STL</a>
        </>
      )}
    </div>
  );
}
