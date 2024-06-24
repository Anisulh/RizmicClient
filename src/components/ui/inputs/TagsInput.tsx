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
        className="flex gap-1 text-sm font-medium text-gray-700 md:text-base dark:text-white"
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
        className="block w-full rounded-lg border-gray-300 text-sm text-raisinblack placeholder-gray-400 shadow-sm focus:border-raisinblack focus:ring-raisinblack md:text-base dark:border-gray-600 dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
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
              <XMarkIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsInput;
