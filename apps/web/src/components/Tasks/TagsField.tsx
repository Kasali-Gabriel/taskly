import { predefinedTags } from '@/constants/tags';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

interface TagsFieldProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagsField = ({ tags, setTags }: TagsFieldProps) => {
  const [input, setInput] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownDirection, setDropdownDirection] = useState<'up' | 'down'>(
    'down',
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputFocused) {
      inputRef.current?.focus();
    }
  }, [isInputFocused]);

  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const dropdownItems =
        dropdownRef.current.querySelectorAll('.dropdown-item');
      dropdownItems[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (filteredTags.length === 0) setHighlightedIndex(-1);
  }, [filteredTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredTags([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleDropdownDirection = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        setDropdownDirection(
          rect.bottom > window.innerHeight && rect.top > window.innerHeight / 2
            ? 'up'
            : 'down',
        );
      }
    };
    handleDropdownDirection();
    window.addEventListener('resize', handleDropdownDirection);
    return () => window.removeEventListener('resize', handleDropdownDirection);
  }, [filteredTags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setFilteredTags(
      predefinedTags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        e.key === 'ArrowDown'
          ? (prevIndex + 1) % filteredTags.length
          : (prevIndex - 1 + filteredTags.length) % filteredTags.length,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleTagSelect(filteredTags[highlightedIndex]);
      } else if (input.trim() && tags.length < 5) {
        addTag(input.trim());
      }
    } else if (e.key === ',' && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  const addTag = (newTag: string) => {
    if (
      newTag &&
      !tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())
    ) {
      setTags([...tags, capitalizeWords(newTag)]);
      setInput('');
      setFilteredTags([]);
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleTagSelect = (tag: string) => {
    if (!tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setTags([...tags, capitalizeWords(tag)]);
      setInput('');
      setFilteredTags([]);
    }
  };

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="relative" onClick={() => setIsInputFocused(true)}>
      <label
        className={`pointer-events-none absolute left-2 transform px-2 text-base text-gray-500 transition-all duration-200 ease-in-out sm:text-xl ${
          tags.length > 0 || input || isInputFocused
            ? 'bg-background top-3 -translate-y-full scale-75 sm:top-3.5 xl:top-4'
            : 'top-1/2 -translate-y-1/2'
        }`}
      >
        Tags
      </label>

      <div
        className={`border-input flex flex-wrap items-center space-x-2 space-y-1 rounded-md border px-2 focus-within:border-2 focus-within:border-blue-400 ${
          tags.length >= 1 && 'py-2'
        }`}
      >
        {tags.map((tag) => (
          <div
            key={tag}
            className="mt-1 flex items-center rounded-2xl bg-gray-300 px-3 text-black dark:bg-gray-700 dark:text-white"
          >
            {tag}
            <button
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                removeTag(tag);
              }}
              className="ml-1 text-black hover:text-red-400 dark:text-white dark:hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {tags.length < 5 && (
          <div className="relative w-full min-w-[8rem] flex-1">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className={`my-0 w-full min-w-[4rem] border-none bg-transparent px-1 py-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-10 ${
                tags.length > 1 && !isInputFocused ? 'absolute' : 'flex flex-1'
              }`}
            />

            {filteredTags.length > 0 && input && (
              <div
                ref={dropdownRef}
                className={`bg-popover absolute left-0 ${
                  dropdownDirection === 'down'
                    ? 'top-full mt-3'
                    : 'bottom-full mb-3'
                } z-10 flex max-h-52 w-auto min-w-[8rem] flex-col rounded-md border p-1 py-1.5`}
              >
                <div className="scrollbar scrollbar-thumb-stone-400 scrollbar-thumb-rounded-full dark:scrollbar-thumb-gray-500 scrollbar-w-[5px] overflow-y-auto px-1">
                  {filteredTags.map((tag, index) => (
                    <div
                      key={tag}
                      className={`dropdown-item focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm px-4 py-1.5 text-sm outline-none hover:bg-neutral-300 dark:hover:bg-stone-600 ${
                        highlightedIndex === index
                          ? 'bg-neutral-300 dark:bg-stone-600'
                          : ''
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
