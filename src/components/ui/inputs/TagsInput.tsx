import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  setTags,
  placeholder = "Add a tag",
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input) {
      event.preventDefault();
      if (!tags.includes(input.trim())) {
        // Avoid duplicate tags
        setTags([...tags, input.trim()]);
        setInput("");
      }
    } else if (event.key === "Backspace" && !input) {
      removeTag(tags.length - 1);
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="my-2 w-full">
      <label
        className="text-sm md:text-base font-medium text-gray-700 dark:text-white flex gap-1"
        htmlFor="tags"
      >
        Tags:
      </label>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className="rounded-lg block w-full text-raisinblack border-gray-300 shadow-sm focus:ring-raisinblack focus:border-raisinblack text-sm md:text-base dark:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <ul className="px-2">
        {tags.map((tag, index) => (
          <li className="flex items-center gap-1" key={index}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-red-500"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsInput;
