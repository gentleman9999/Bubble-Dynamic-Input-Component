import React, { useState } from 'react';
import Tag from './Tag';

const DynamicInput = () => {
  const [tags, setTags] = useState([
    { type: "tag", value: "HTML" },
    { type: "tag", value: "CSS" },
    { type: "input", value: "CI/CD Pipeline" },
    { type: "tag", value: "PHP" },
    { type: "input", value: "SEO specialist" },
    { type: "tag", value: "NodeJs" },
	{ type: "tag", value: "Jquery" }
  ]);
  const [availableTags, setAvailableTags] = useState([
    { type: "tag", value: "VueJs" },
    { type: "tag", value: "Angular5" },
    { type: "tag", value: "NextJs" },
    { type: "tag", value: "Django" },
	{ type: "tag", value: "3DJS" },
	{ type: "tag", value: "BubbleIO" },
	{ type: "tag", value: "OpenAI" },
	{ type: "tag", value: "GitHub" },
  ]);

  const [focusValue, setFocusValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(tags.length - 1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditLabel, setIsEditLabel] = useState(false);

  const handleInputChange = (e) => {
    setFocusValue(e.target.value);
  };

  const handleBackspace = (e) => {
    if (e.key === 'Backspace' && e.target.value === "" && tags.length) {
      handleDeleteTag(cursorPosition);
      setEditingIndex(null);
      setCursorPosition(cursorPosition - 1);
    }
  };

  const handleTagClick = (tag) => {
    if (!tags.some((t) => t.value === tag.value)) {
      const updatedTags = [
        ...tags.slice(0, cursorPosition + 1),
        tag,
        ...tags.slice(cursorPosition + 1)
      ];
      setTags(updatedTags);
      setCursorPosition(cursorPosition + 1);
      setAvailableTags(availableTags.filter((t) => t.value !== tag.value));
    }
  };

  const handleDeleteTag = (indexToDelete) => {
    const updatedTags = tags.filter((_, index) => index !== indexToDelete);
    const tagToDelete = tags[indexToDelete];
    setTags(updatedTags);
    if (tags[indexToDelete]['type'] === "tag") {
      setAvailableTags([...availableTags, tagToDelete]);
    }
  };

  const handleLabelClick = (index) => {
    setIsEditLabel(true);
    setCursorPosition(index);
    setEditingIndex(index);
    setFocusValue(tags[index].value);
  };

  const handleSpaceClick = (index) => {
    setFocusValue("");
    setCursorPosition(index);
    setEditingIndex(index);
  };

  const handleBlur = (e, blurIndex) => {
    let updatedTags = [];
    if (e.target.value !== "") {
		const newTag = { type: "input", value: e.target.value };
		if (!isEditLabel)
			updatedTags = [
				...tags.slice(0, blurIndex + 1),
				newTag,
				...tags.slice(blurIndex + 1)
			];
		else
			updatedTags = [
				...tags.slice(0, blurIndex),
				newTag,
				...tags.slice(blurIndex + 1)
			];
    } else {
      	updatedTags = tags.filter((_, index) => !(index === blurIndex && _.type === "input" && _.value === ""));
    }
    setTags(updatedTags);
    setIsEditLabel(false);
    setEditingIndex(null);
  };

  return (
    <div className="p-4">
      <div className="flex">
        {/* Left section for input and tags */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center p-2 border border-2 border-black rounded-md focus-within:border-blue-500 min-h-16">
            {tags.length !== 0 ? tags.map(({ type, value }, index) => (
              <React.Fragment key={index}>
                {type === "tag" ? (
                  <Tag value={value} onDelete={() => handleDeleteTag(index)} />
                ) : (
                  !(isEditLabel && index === editingIndex) && (
                    <span
                      className="p-2 my-2 cursor-pointer rounded-md font-bold text-lg break-all hover:bg-gray-200"
                      onClick={() => handleLabelClick(index)}
                    >
                      {value}
                    </span>
                  )
                )}
                {cursorPosition === index && editingIndex === index ? (
                  <input
                    type="text"
                    value={focusValue}
                    onChange={handleInputChange}
                    onBlur={(e) => handleBlur(e, index)}
                    onKeyDown={handleBackspace}
                    placeholder="typed text here..."
                    className="focus:outline-none focus:ring-0 p-2 mx-2 border-none font-bold text-lg"
                    autoFocus
                  />
                ) : (
                  <input
					className="cursor-pointer focus:outline-none w-3"
                    onClick={() => handleSpaceClick(index)}
					value=""
                    readOnly
                  />
                )}
              </React.Fragment>
            )) : (
				<React.Fragment>
					{cursorPosition === 0 && editingIndex === 0 ? (
						<input
						  type="text"
						  value={focusValue}
						  onChange={handleInputChange}
						  onBlur={(e) => handleBlur(e, 0)}
						  onKeyDown={handleBackspace}
						  placeholder="typed text here..."
						  className="focus:outline-none focus:ring-0 p-2 mx-2 border-none font-bold text-lg"
						  autoFocus
						/>
					) : (
					<input
						className="cursor-pointer focus:outline-none w-full"
						onClick={() => handleSpaceClick(0)}
						value=""
						readOnly
					/>
					)}
				</React.Fragment>
			)}
          </div>
        </div>

        {/* Right section for available tags */}
		<div className="ml-4 flex-shrink-0 w-1/3">
			<div className="bg-gray-100 p-4 rounded-md shadow-lg flex flex-col items-center">
				<h2 className="text-lg font-bold mb-2 text-center">Available Tags</h2>
				<div className="flex flex-wrap justify-center">
				{availableTags.map(({ type, value }, index) => (
					<button
						key={index}
						onClick={() => handleTagClick({ type, value })}
						className="bg-blue-500 text-white px-4 py-1 rounded-full m-1 hover:bg-blue-600"
					>
						{value}
					</button>
				))}
				</div>
			</div>
		</div>
      </div>
    </div>
  );
};

export default DynamicInput;
